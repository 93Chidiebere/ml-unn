import json

path = r"C:\Users\Chidiebere\Documents\ML UNN\webapp\src\data\courses.json"
with open(path, 'r', encoding='utf-8') as f:
    courses = json.load(f)

for c in courses:
    if c['id'] == 'computer-vision':
        for m in c['modules']:
            if 'introduction-to-computer-vision-and-cnns' in m['id']:
                m['text'] = "Computer Vision enables machines to interpret and understand the visual world. In this module, we explore Convolutional Neural Networks (CNNs), which are specifically designed to process pixel data. A CNN uses 'Convolutional Layers' to apply filters (kernels) that extract features like edges and textures, 'Pooling Layers' to compress the spatial dimensions, and 'Fully Connected Layers' to output a final classification (e.g., detecting if an image contains a Dog or a Cat). The architectural design drastically reduces the parameters needed compared to standard networks, making it the industry standard for visual tasks."
                m['imageUrl'] = "/cnn_intro_illustration.jpg"
                print("Updated CNN Intro")
            elif 'image-segmentation' in m['id']:
                m['text'] = "Image Segmentation goes a step further than standard object detection. Instead of just drawing a bounding box around a car, semantic segmentation assigns a class label to every single pixel in the image. This means the AI understands the exact geometric boundaries of the car, the road, the pedestrians, and the sky. This is crucial for applications like autonomous driving and medical imaging, where precise boundaries (like the edge of a tumor or the curvature of a lane) must be calculated exactly."
                m['imageUrl'] = "/image_segmentation.jpg"
                print("Updated Image Segmentation")

with open(path, 'w', encoding='utf-8') as f:
    json.dump(courses, f, indent=2)

print("Saved courses.json")
