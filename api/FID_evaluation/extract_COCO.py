import json
import os
import shutil

# Specify the path to the captions JSON file
captions_file = 'D:/COCO Dataset/annotations_trainval2017/annotations/captions_train2017.json'
# Specify the path to the image folder
images_folder = 'D:/COCO Dataset/train2017/train2017'
output_folder = 'real_images'                   # Destination folder for saving images
output_captions_file = 'selected_captions.json'

# Create the destination folder if it does not exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Load the JSON file
with open(captions_file, 'r') as f:
    captions_data = json.load(f)

# Create a mapping of image IDs to captions
image_id_to_captions = {}
for annotation in captions_data['annotations']:
    image_id = annotation['image_id']
    caption = annotation['caption']
    if image_id not in image_id_to_captions:
        image_id_to_captions[image_id] = []
    image_id_to_captions[image_id].append(caption)

# Extract image IDs from file names in the image folder, and limit to 200 images for saving
captions_for_selected_images = {}
image_files = [f for f in os.listdir(images_folder) if f.endswith('.jpg')][:200]  # Limit to first 200 images

for image_file in image_files:
    # Extract image_id from the file name (e.g., 000000000001.jpg -> 1)
    image_id = int(os.path.splitext(image_file)[0])

    # Get the corresponding caption and save only the first caption
    if image_id in image_id_to_captions:
        captions_for_selected_images[image_file] = image_id_to_captions[image_id][0]

        # Copy the image to the specified folder
        src_path = os.path.join(images_folder, image_file)
        dest_path = os.path.join(output_folder, image_file)
        shutil.copy(src_path, dest_path)

# Save the extracted captions to a JSON file
with open(output_captions_file, 'w') as f:
    json.dump(captions_for_selected_images, f, indent=4)

print("Copied 200 images to the 'real_images' folder and saved the corresponding captions to 'selected_captions.json'.")
