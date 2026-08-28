import json

path = r"C:\Users\Chidiebere\Documents\ML UNN\webapp\src\data\courses.json"
with open(path, 'r', encoding='utf-8') as f:
    courses = json.load(f)

for c in courses:
    if c['id'] == 'computer-vision':
        for m in c['modules']:
            if 'practical-deep-learning' in m['id']:
                m['text'] = "Practical Deep Learning goes beyond theory and looks at how models are actually trained and deployed on massive GPU clusters. It involves setting up data pipelines, batching large datasets, configuring computational graphs, and optimizing the backpropagation process. This module covers the hardware and infrastructure required to train state-of-the-art models efficiently."
                m['imageUrl'] = "/practical_deep_learning.jpg"
                print("Updated Practical DL")
            elif 'cnn-architectures' in m['id']:
                m['text'] = "Since the creation of the first CNNs, the architecture has evolved dramatically. This module compares foundational networks like VGG-16, which uses sequential max-pooling layers, to modern architectures like ResNet-50. ResNet introduces 'Skip Connections' (Residual Blocks) that allow gradients to flow backwards through deep layers without vanishing, enabling us to train networks with hundreds of layers."
                m['imageUrl'] = "/cnn_architectures.jpg"
                print("Updated CNN Architectures")
            elif 'object-detection' in m['id']:
                m['text'] = "Object Detection extends image classification by not only identifying what is in an image, but exactly where it is. Using algorithms like YOLO (You Only Look Once) or Faster R-CNN, the AI draws bounding boxes around multiple objects simultaneously and assigns confidence scores. This is the foundational technology behind autonomous vehicles navigating complex street scenes."
                m['imageUrl'] = "/object_detection.jpg"
                print("Updated Object Detection")
            elif 'vision-transformers' in m['id']:
                m['text'] = "Vision Transformers (ViT) represent a paradigm shift away from CNNs. Instead of convolutions, a ViT splits an image into a grid of patches. Each patch is flattened into a sequence of tokens and fed into a Multi-Head Self-Attention mechanism—the exact same architecture used in Large Language Models. This allows the model to understand global relationships between distant parts of an image instantly."
                m['imageUrl'] = "/transformers_vision.jpg"
                print("Updated Vision Transformers")

with open(path, 'w', encoding='utf-8') as f:
    json.dump(courses, f, indent=2)

print("Saved courses.json")
