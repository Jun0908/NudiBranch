FROM pytorch/pytorch:1.12.1-cuda11.3-cudnn8-devel
WORKDIR /
# Install requirements
# RUN git clone https://github.com/TheLastBen/diffusers
RUN apt update && apt install wget git unzip -y
RUN wget -q https://gist.githubusercontent.com/js-ts/28684a7e6217214ec944a9224584e9af/raw/d7492bc8f36700b75d51e3346259d1a466b99a40/train_dreambooth.py
RUN wget -q https://github.com/TheLastBen/diffusers/raw/main/scripts/convert_diffusers_to_original_stable_diffusion.py
# RUN cp /content/convert_diffusers_to_original_stable_diffusion.py /content/diffusers/scripts/convert_diffusers_to_original_stable_diffusion.py
RUN pip install -qq git+https://github.com/TheLastBen/diffusers
RUN pip install -q accelerate==0.12.0 transformers ftfy bitsandbytes gradio natsort
# Install xformers
RUN pip install -q https://github.com/metrolobo/xformers_wheels/releases/download/1d31a3ac_various_6/xformers-0.0.14.dev0-cp37-cp37m-linux_x86_64.whl
# You need to accept the model license before downloading or using the Stable Diffusion weights. Please, visit the [model card](https://huggingface.co/runwayml/stable-diffusion-v1-5), read the license and tick the checkbox if you agree. You have to be a registered user in 🤗 Hugging Face Hub, and you'll also need to use an access token for the code to work.
# https://huggingface.co/settings/tokens
RUN mkdir -p ~/.huggingface
RUN echo -n "<your-hugging-face-token>" > ~/.huggingface/token
# copy the test dataset from a local file
# COPY jfk /jfk

# Download and extract the test dataset
RUN wget https://github.com/js-ts/test-images/raw/main/jfk.zip
RUN unzip -j jfk.zip -d jfk
RUN mkdir model
RUN wget 'https://github.com/TheLastBen/fast-stable-diffusion/raw/main/Dreambooth/Regularization/Women' -O woman.zip
RUN wget 'https://github.com/TheLastBen/fast-stable-diffusion/raw/main/Dreambooth/Regularization/Men' -O man.zip
RUN wget 'https://github.com/TheLastBen/fast-stable-diffusion/raw/main/Dreambooth/Regularization/Mix' -O mix.zip
RUN unzip -j woman.zip -d woman
RUN unzip -j man.zip -d man
RUN unzip -j mix.zip -d mix

RUN  accelerate launch train_dreambooth.py \
    --image_captions_filename \
   --train_text_encoder \
    --save_starting_step=5\
    --stop_text_encoder_training=31 \
       --class_data_dir=/man \
    --save_n_steps=5 \
  --pretrained_model_name_or_path="CompVis/stable-diffusion-v1-4" \
    --instance_data_dir="/jfk" \
    --output_dir="/model" \
    --instance_prompt="a photo of jfk man" \
   --class_prompt="a photo of man" \
    --instance_prompt="" \
    --seed=96576 \
    --resolution=512 \
    --mixed_precision="fp16" \
    --train_batch_size=1 \
    --gradient_accumulation_steps=1 \
    --use_8bit_adam \
    --learning_rate=2e-6 \
    --lr_scheduler="polynomial" \
    --center_crop \
    --lr_warmup_steps=0 \
    --max_train_steps=30

COPY finetune.sh /finetune.sh

RUN wget -q https://gist.githubusercontent.com/js-ts/624fecc3fff807d4948688cb28993a94/raw/fd69ac084debe26a815485c1f363b8a45566f1ba/clear_mem.py
# Removing your token
RUN rm -rf  ~/.huggingface/token