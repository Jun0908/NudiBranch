from PIL import Image, ImageOps
import os

# Target size for images
target_size = (640, 640)

# Function to resize and pad the image
def resize_and_pad_image(image, target_size):
    # Resize while maintaining aspect ratio, with the longer side matching the target size
    image.thumbnail(target_size, Image.Resampling.LANCZOS)  # Using LANCZOS instead of ANTIALIAS
    
    # Add padding to the center to match the target size
    delta_w = target_size[0] - image.size[0]
    delta_h = target_size[1] - image.size[1]
    padding = (delta_w // 2, delta_h // 2, delta_w - (delta_w // 2), delta_h - (delta_h // 2))
    return ImageOps.expand(image, padding, (0, 0, 0))  # Adding black padding

# Resize and save images in the folder
def resize_images_in_folder(input_folder, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    for filename in os.listdir(input_folder):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            input_image_path = os.path.join(input_folder, filename)
            output_image_path = os.path.join(output_folder, filename)
            image = Image.open(input_image_path)
            resized_image = resize_and_pad_image(image, target_size)
            resized_image.save(output_image_path)  # Save resized image to the output folder

# Specify the folder path to resize
resize_images_in_folder('real_images', 'resized_real_images')


