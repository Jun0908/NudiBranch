
from tempfile import NamedTemporaryFile
import torch
import gradio as gr
from audiocraft.models import MusicGen
from audiocraft.data.audio import audio_write
import argparse
import shutil
import requests

MODEL = None

img_to_text = gr.load(name="spaces/fffiloni/CLIP-Interrogator-2")

def load_model(version):
    print("Loading model", version)
    return MusicGen.get_pretrained(version)

def get_extension_from_headers(headers):
    content_type = headers.get('content-type')
    if not content_type:
        return '.bin'  # Default to a binary data extension
    if 'image/jpeg' in content_type:
        return '.jpg'
    elif 'image/png' in content_type:
        return '.png'
    elif 'image/gif' in content_type:
        return '.gif'
    elif 'image/webp' in content_type:
        return '.webp'
    elif 'image/svg+xml' in content_type:
        return '.svg'
    # Add more image formats here if needed.
    else:
        return '.bin'  # Default to a binary data extension if not recognized

def get_image_from_ipfs(ipfs_link):
    response = requests.get(ipfs_link, stream=True)
    if response.status_code == 200:
        # Determine the file extension
        file_extension = get_extension_from_headers(response.headers)
        with NamedTemporaryFile("wb", suffix=file_extension, delete=False) as f:
            shutil.copyfileobj(response.raw, f)
            return f.name
    else:
        raise Exception("Failed to retrieve image from IPFS")

def upload_to_nft_storage(file_path, api_key):
    with open(file_path, 'rb') as file:
        headers = {"Authorization": f"Bearer {api_key}"}
        response = requests.post(
            "https://api.nft.storage/upload",
            headers=headers,
            files={"file": file}
        )
        response.raise_for_status()
        return response.json()["value"]["cid"]
    
def main(uploaded_image, melody, duration):
    text = img_to_text(uploaded_image, 'best', 4, fn_index=1)[0]
    global MODEL
    topk = int(250)
    if MODEL is None or MODEL.name != "melody":
        MODEL = load_model("melody")

    if duration > MODEL.lm.cfg.dataset.segment_duration:
        raise gr.Error("MusicGen currently supports durations of up to 30 seconds!")
    MODEL.set_generation_params(
        use_sampling=True,
        top_k=250,
        top_p=0,
        temperature=1.0,
        cfg_coef=3.0,
        duration=duration,
    )

    if melody:
        sr, melody = melody[0], torch.from_numpy(melody[1]).to(MODEL.device).float().t().unsqueeze(0)
        print(melody.shape)
        if melody.dim() == 2:
            melody = melody[None]
        melody = melody[..., :int(sr * MODEL.lm.cfg.dataset.segment_duration)]
        output = MODEL.generate_with_chroma(
            descriptions=[text],
            melody_wavs=melody,
            melody_sample_rate=sr,
            progress=False
        )
    else:
        output = MODEL.generate(descriptions=[text], progress=False)

    output = output.detach().cpu().float()[0]
    
    assert output.dtype.is_floating_point, "output must be a floating point tensor"

    with NamedTemporaryFile("wb", suffix=".wav", delete=False) as file:
        audio_write(file.name, output, MODEL.sample_rate, strategy="loudness", add_suffix=False)
        temp_file_name = file.name

    final_file_name = "assets/generated_audio.wav"
    shutil.move(temp_file_name, final_file_name)

    # NFT Storageにアップロード
    api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEI1ZGQ2MUNEMjVmZDgxM0MyNEQ1YUNFNThjZDYwNzQ4OGFiQzE1N2UiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NjI5NjQxODU1MiwibmFtZSI6InRlc3QifQ.CEtfoZZhcLJiKF6GW3SYw4gI3bAJveVDp5U8odEcf4M"  # NFT StorageのAPIキー
    cid = upload_to_nft_storage(final_file_name, api_key)

    return cid

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--ipfs_link", type=str, required=True, help="IPFS link to the image file")
    parser.add_argument("--duration", type=float, default=2, help="Duration of the music piece in seconds (default: 2)")
    args = parser.parse_args()
    
    # IPFSから画像を取得
    image_path = get_image_from_ipfs(args.ipfs_link)
    
    # 画像を使って音楽を生成
    result_file = main(image_path, None, args.duration)
    print({result_file})