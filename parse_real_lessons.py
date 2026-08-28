import os
import json
import re

source_dir = r"C:\Users\Chidiebere\Documents\ML UNN\source\Artificial-Intelligence-Courses-main\LaTeX"
output_json_path = r"C:\Users\Chidiebere\Documents\ML UNN\webapp\src\data\courses.json"

courses_dict = {}

def clean_latex(text):
    # Very basic latex cleaner
    text = re.sub(r'\\[a-zA-Z]+\{.*?\}', '', text)
    text = re.sub(r'\\[a-zA-Z]+', '', text)
    text = re.sub(r'[\$\{\}]', '', text)
    text = re.sub(r'^\s*[-*]\s*', '', text, flags=re.MULTILINE)
    text = text.replace('\n', ' ').strip()
    return re.sub(r'\s+', ' ', text)

def extract_lesson_text(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Extract frames
    frames = re.findall(r'\\begin\{frame\}(.*?)\\end\{frame\}', content, re.DOTALL)
    
    lesson_text = ""
    for frame in frames:
        # Ignore title frames or table of contents
        if 'frametitle' in frame and not 'Table of Contents' in frame:
            # Extract frametitle
            title_match = re.search(r'\\frametitle\{(.*?)\}', frame)
            # Remove environment blocks like itemize, block, figure
            text_only = re.sub(r'\\begin\{.*?\}.*?\\end\{.*?\}', '', frame, flags=re.DOTALL)
            cleaned = clean_latex(text_only)
            if len(cleaned) > 20:
                lesson_text += cleaned + " "
            if len(lesson_text) > 400:
                break
                
    if not lesson_text:
        lesson_text = "This module explores core concepts derived directly from the KAUST Academy training materials. Engage with the 3D model below to visualize these complex terminologies."
        
    return lesson_text[:500] + ("..." if len(lesson_text) > 500 else "")

def determine_visual_type(filename):
    fname = filename.lower()
    if 'tree' in fname or 'forest' in fname:
        return 'decision-tree'
    elif 'regression' in fname or 'svm' in fname or 'vector' in fname or 'data' in fname:
        return 'scatter-plot'
    elif 'nlp' in fname or 'language' in fname or 'transformer' in fname or 'text' in fname:
        return 'nlp-scene'
    else:
        return 'neural-network'

for course_name in os.listdir(source_dir):
    course_path = os.path.join(source_dir, course_name)
    if os.path.isdir(course_path):
        course_id = course_name.lower().replace('_', '-')
        course_title = course_name.replace('_', ' ')
        
        modules = []
        for file in os.listdir(course_path):
            if file.endswith('.tex'):
                file_path = os.path.join(course_path, file)
                
                # Parse filename
                name_without_ext = file.replace('.tex', '')
                clean_name = re.sub(r'^\d+_', '', name_without_ext).replace('_', ' ')
                module_id = name_without_ext.lower().replace('_', '-')
                
                lesson_text = extract_lesson_text(file_path)
                visual_type = determine_visual_type(name_without_ext)
                
                modules.append({
                    "id": module_id,
                    "title": clean_name,
                    "text": lesson_text,
                    "visualType": visual_type
                })
        
        if modules:
            modules.sort(key=lambda x: x['id'])
            courses_dict[course_id] = {
                "id": course_id,
                "title": course_title,
                "description": f"Learn about {course_title} based on KAUST Academy materials.",
                "modules": modules
            }

courses_data = list(courses_dict.values())
with open(output_json_path, 'w', encoding='utf-8') as f:
    json.dump(courses_data, f, indent=2)

print("Parsed real lessons into courses.json!")
