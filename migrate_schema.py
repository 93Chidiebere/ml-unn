import json

path = r"C:\Users\Chidiebere\Documents\ML UNN\webapp\src\data\courses.json"
with open(path, 'r', encoding='utf-8') as f:
    courses = json.load(f)

for c in courses:
    for m in c['modules']:
        # If it doesn't have contentBlocks yet, migrate it
        if 'contentBlocks' not in m:
            m['contentBlocks'] = [
                {
                    "type": "text",
                    "content": m.get('text', '')
                }
            ]
            if 'imageUrl' in m and m['imageUrl']:
                m['contentBlocks'].append({
                    "type": "image",
                    "content": m['imageUrl']
                })

        # Specifically build the rich article for module 1
        if 'introduction-to-computer-vision-and-cnns' in m['id']:
            m['contentBlocks'] = [
                {
                    "type": "text",
                    "content": "Computer Vision enables machines to interpret and understand the visual world. But how do we build vision models? Historically, we worked with tabular data using standard Fully Connected Neural Networks. To apply this to images, we tried treating every single pixel as a feature."
                },
                {
                    "type": "image",
                    "content": "/flattening_pixels.jpg"
                },
                {
                    "type": "text",
                    "content": "However, flattening a 2D image into a 1D pixel array destroys crucial spatial relationships. The network struggles to relearn that pixels next to each other form a continuous edge. To solve this, Convolutional Neural Networks (CNNs) were invented. They process images in their original 2D grid format."
                },
                {
                    "type": "image",
                    "content": "/cnn_intro_illustration.jpg"
                },
                {
                    "type": "text",
                    "content": "The core of a CNN is the Convolutional Layer. It uses small mathematical matrices called 'Kernels' or 'Filters' (e.g., a 3x3 grid) that slide over the input image. As they slide, they perform element-wise multiplication to extract specific features like edges, textures, and patterns, creating a 'Feature Map'."
                },
                {
                    "type": "image",
                    "content": "/kernels_and_filters.jpg"
                },
                {
                    "type": "text",
                    "content": "After extracting features, the network needs to reduce the spatial resolution to save computational power and extract the most dominant features. This is done using 'Pooling Layers' (like Max Pooling). It slides a window over the feature map and only keeps the maximum value, effectively downsampling the image while retaining the critical information."
                },
                {
                    "type": "image",
                    "content": "/pooling_layer.jpg"
                }
            ]

with open(path, 'w', encoding='utf-8') as f:
    json.dump(courses, f, indent=2)

print("Migrated courses.json to contentBlocks schema")
