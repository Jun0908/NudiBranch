from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import librosa
import binascii
import json
import soundfile as sf
from dotenv import load_dotenv
import os
import numpy as np


app = Flask(__name__)
CORS(app)  # CORSを有効化

@app.route('/spectrogram', methods=['POST'])
def process_spectrogram():
    # CIDをリクエストのJSONから取得
    cid = request.json['cid']
    
    # IPFSからWAVファイルをダウンロード
    response = requests.get('https://' + cid + '.ipfs.nftstorage.link')

    # ダウンロードしたファイルを一時保存
    temp_file_path = 'temp_file.wav'
    with open(temp_file_path, 'wb') as file:
        file.write(response.content)

    # WAVファイルを読み込む
    y, sr = librosa.load(temp_file_path, sr=None)

    # スペクトログラムを計算
    D = librosa.stft(y)

    # dtype と shape を取得
    dtype = str(D.dtype)
    shape = D.shape

    # 配列をバイト列に変換し、ヘキサデシマルの文字列に変換
    bytes_data = D.tobytes()
    hex_str = binascii.hexlify(bytes_data).decode('utf-8')

    # メタデータをJSONファイルに保存
    metadata = {'dtype': dtype, 'shape': shape}
    metadata_filename = 'spectrogram_metadata.json'
    with open(metadata_filename, 'w') as file:
        json.dump(metadata, file)

    # スペクトログラムのヘキサデシマルデータを別のJSONファイルに保存
    hex_data = {'hex_str': hex_str}
    hex_data_filename = 'spectrogram_hex_data.json'
    with open(hex_data_filename, 'w') as file:
        json.dump(hex_data, file)

    # NFTストレージにアップロード
    nft_storage_url = 'https://api.nft.storage/upload'
    api_key = os.getenv('NFT_STORAGE_API_KEY')

    with open(hex_data_filename, 'rb') as file:
        headers = {'Authorization': f'Bearer {api_key}'}
        upload_response = requests.post(nft_storage_url, headers=headers, files={'file': file})
        upload_response_data = upload_response.json()
    
    if upload_response.status_code == 200:
        uploaded_cid = upload_response_data['value']['cid']
        return jsonify({"message": "Spectrogram processed successfully", "cid": uploaded_cid})
    else:
        return jsonify({"error": "Failed to upload to NFT Storage"}), 500

@app.route('/reconstruct', methods=['GET'])
def reconstruct_spectrogram():
    # ヘキサデシマルの文字列とメタデータを読み込む
    with open('spectrogram_hex.txt', 'r') as file:
        hex_str = file.read()

    with open('spectrogram_metadata.json', 'r') as file:
        metadata = json.load(file)
        dtype = metadata['dtype']
        shape = tuple(metadata['shape'])

    # ヘキサ文字列をバイナリデータに変換し、NumPy配列に変換
    bytes_data = binascii.unhexlify(hex_str)
    D_reconstructed = np.frombuffer(bytes_data, dtype=dtype).reshape(shape)

    # 復元されたスペクトログラムをファイルに保存
    np.save('reconstructed_spectrogram.npy', D_reconstructed)

    # スペクトログラムを読み込み、音楽データを再構築
    D = np.load('reconstructed_spectrogram.npy')
    y_reconstructed = librosa.istft(D)

    # 再構築した音楽データをWAVファイルとして保存
    reconstructed_file = 'reconstructed_music_file.wav'
    sf.write(reconstructed_file, y_reconstructed, sr)

    return send_file(reconstructed_file, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)