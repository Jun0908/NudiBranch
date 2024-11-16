# FID Evaluation

This project uses Fréchet Inception Distance (FID) to evaluate the quality of generated images from models. FID is a metric commonly used to assess the similarity between generated images and real images, providing a quantitative measure of how realistic and high-quality the generated images are.

## Table of Contents

- [FID Evaluation](#fid-evaluation)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Requirements](#requirements)
    - [Python Packages](#python-packages)
  - [Data](#data)
  - [Installation](#installation)
  - [Usage](#usage)


## Features

- **Text-based Image Generation**: Convert text prompts into images.
- **CUDA Support**: Utilizes NVIDIA GPU for faster image generation.
- **FID Evaluation**: Supports Fréchet Inception Distance (FID) scoring to evaluate the quality of generated images.
- **Customizable Image Size**: Easily adjust output image size (default: 640x640 pixels).

## Requirements

- **Python** 3.9+
- **NVIDIA GPU** with **CUDA** support
- **CUDA Toolkit** (tested with CUDA 11.6)

### Python Packages

- `torch` (CUDA-enabled version)
- `torchvision`
- `torchaudio`
- `diffusers`
- `pillow`
- `pytorch_fid`
- `transformers`
  
## Data

This project utilizes the [COCO Dataset](https://www.kaggle.com/datasets/sabahesaraki/2017-2017) for training and evaluation. The COCO Dataset is a large-scale dataset commonly used for various computer vision tasks. It contains real images along with annotations that provide descriptive captions, which serve as prompts for the model to generate corresponding images.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Text2Image.git
   cd Text2Image
   ```

2. Set up a virtual environment (recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu116
   pip install -r requirements.txt
   ```

4. Make sure CUDA_HOME is set to your desired CUDA version (e.g., C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.6).
   
## Usage

1. **Generate Images from Text Prompts**:

   To generate images based on prompts defined in the script:

   ```python
   from diffusers import StableDiffusionPipeline
   import torch

   model_id = "CompVis/stable-diffusion-v1-4"
   pipe = StableDiffusionPipeline.from_pretrained(model_id)
   pipe = pipe.to("cuda")

   prompts = [
       ##########################################
   ]

   output_dir = "generated_images/"
   for i, prompt in enumerate(prompts):
       image = pipe(prompt, height=640, width=640).images[0]
       image.save(f"{output_dir}/image_{i}.jpg")
2. Evaluate FID Score:

To calculate the FID score for a set of generated images:

   ```bash
   python -m pytorch_fid real_images generated_images
   ```