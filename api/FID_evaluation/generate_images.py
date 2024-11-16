from diffusers import StableDiffusionPipeline
import torch
from PIL import Image

# Load the model
model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(model_id)
pipe = pipe.to("cuda")  # Use GPU if available

# Specify text prompts for generating images
prompts = [
    "Closeup of bins of food that include broccoli and bread.",
    "A giraffe eating food from the top of the tree.",
    "A flower vase is sitting on a porch stand.",
    "A zebra grazing on lush green grass in a field.",
    "Woman in swim suit holding parasol on sunny day.",
    "This wire metal rack holds several pairs of shoes and sandals",
    "A couple of men riding horses on top of a green field.",
    "They are brave for riding in the jungle on those elephants.",
    "A black and silver clock tower at an intersection near a tree",
    "A train coming to a stop on the tracks outside.",
    "A couple of giraffe snuggling each other in a forest.",
    "A motorcycle parked in a parking space next to another motorcycle.",
    "A picture of a dog laying on the ground.",
    "A young man riding a skateboard into the air.",
    "A lighted owl candle sits next to a clock.",
    "A big airplane flying in the big blue sky",
    "An oven with a stove on top of it in a kitchen.",
    "A white plate with a brownie and white frosting.",
    "There is a street lined with packed buildings",
    "A skate park next to a body of water and green park.",
    "Woman cutting pizza with fork and knife sitting next to young girl",
    "A man and woman cut into a big cake",
    "A piece of cake and coffee are on an outdoor table.",
    "A loft bed with a dresser underneath it.",
    "Two giraffes in a room with people looking at them.",
    "The kitchen has odd looking colors in it.",
    "Plate with a piece of bread, dark chocolate spread, bananas and a carton of Silk.",
    "Birds perch on a bunch of twigs in the winter.",
    "Three giraffes stuck behind the confines of a zoo fence.",
    "People gathered outside in a big field on a cloudy day",
    "A stop sign directs pedestrians as a train travels by.",
    "Three zebras standing in a grassy field walking",
    "A small kitchen with low a ceiling",
    "A female in military uniform cutting a businessman's neck tie",
    "A group of baseball players is crowded at the mound.",
    "A small pizza that is on a white plate",
    "This table is filled with a variety of different dishes.",
    "Six snowboards are propped in the snow on a rail.",
    "A toy dinosaur standing on a sink next to a running faucet.",
    "A man standing holding a game controller and two people sitting",
    "A small airplane that is on a runway",
    "A street sign on a pole on a street.",
    "There is a small bus with several people standing next to it.",
    "A female traveler leaning on a luggage cart.",
    "A couple of elephants standing next to each other.",
    "A bottle of wine next to a glass of wine.",
    "A man standing in front of a microwave next to pots and pans.",
    "The dog is playing with his toy in the grass",
    "The people are sampling wine at a wine tasting.",
    "A stuffed bear that is laying down in the grass.",
    "A large group of elephants crossing a dirt path.",
    "Beautiful women wearing bikinis frolicking on a sandy beach.",
    "A close up of a plastic container with hot dogs",
    "A man tossing an orange frisbee on top of a lush green field.",
    "A man holding a glass of wine on its side.",
    "Three men in military suits are sitting on a bench.",
    "Food in a bowl with carrots and drinks around it",
    "Two people standing in a kitchen looking around.",
    "The passenger train has stopped at a station.",
    "A group of men playing a game of baseball on top of a baseball field.",
    "A traffic light over a street surrounded by tall buildings.",
    "The snowboarder has jumped high into the air from a snow ramp.",
    "A young boy playing soccer on a grassy field",
    "A little girl holding wet broccoli in her hand.",
    "Landscape of a snowy mountain with a skiers trail in the snow",
    "A living room filled with furniture and windows covered in curtains.",
    "A smartphone with an image of a person on its screen.",
    "A man with a bushy beard and green tie.",
    "A white dog holding a purple frisbee in its mouth.",
    "A man talking on his phone in public.",
    "A cheesy pizza sitting on top of a table.",
    "A dog sitting on the inside of a white boat."
]

# Generate and save images
output_dir = "generated_images/"
for i, prompt in enumerate(prompts):
    image = pipe(prompt, height=640, width=640).images[0]  # Set image size to 640x640
    image.save(f"{output_dir}/image_{i}.jpg")
