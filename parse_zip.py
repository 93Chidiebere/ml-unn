import zipfile
import json
import os
import re

zip_path = r"C:\Users\Chidiebere\Documents\ML UNN\Artificial-Intelligence-Courses-main.zip"
output_json_path = r"C:\Users\Chidiebere\Documents\ML UNN\webapp\src\data\courses.json"

os.makedirs(os.path.dirname(output_json_path), exist_ok=True)

courses_dict = {}

with zipfile.ZipFile(zip_path, 'r') as z:
    file_list = z.namelist()
    
    # We are looking for files like:
    # Artificial-Intelligence-Courses-main/LaTeX/Computer_Vision/01_Introduction_to_Computer_Vision_and_CNNs.tex
    for f in file_list:
        if f.startswith('Artificial-Intelligence-Courses-main/LaTeX/') and f.endswith('.tex'):
            parts = f.split('/')
            if len(parts) == 4:
                course_name_raw = parts[2]
                file_name_raw = parts[3]
                
                course_id = course_name_raw.lower().replace('_', '-')
                course_title = course_name_raw.replace('_', ' ')
                
                if course_id not in courses_dict:
                    courses_dict[course_id] = {
                        "id": course_id,
                        "title": course_title,
                        "description": f"Learn about {course_title} from KAUST Academy.",
                        "modules": []
                    }
                
                # Parse filename: e.g. "01_Introduction_to_Computer_Vision_and_CNNs.tex"
                name_without_ext = file_name_raw.replace('.tex', '')
                
                # Remove leading numbers and underscores
                clean_name = re.sub(r'^\d+_', '', name_without_ext).replace('_', ' ')
                module_id = name_without_ext.lower().replace('_', '-')
                
                courses_dict[course_id]["modules"].append({
                    "id": module_id,
                    "title": clean_name,
                    "text": f"This module covers {clean_name}. The 3D graphics below will help you visualize the concepts discussed.",
                    "visualType": "neural-node" if 'Deep' in clean_name or 'CNN' in clean_name else 'feedforward-net'
                })

# Convert dict to list and sort modules by ID (which usually preserves the 01_, 02_ order)
courses_data = list(courses_dict.values())
for course in courses_data:
    course['modules'].sort(key=lambda x: x['id'])

with open(output_json_path, 'w') as f:
    json.dump(courses_data, f, indent=2)

print("Created courses.json successfully.")
