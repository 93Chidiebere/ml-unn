import zipfile

zip_path = r"C:\Users\Chidiebere\Documents\ML UNN\Artificial-Intelligence-Courses-main.zip"

with zipfile.ZipFile(zip_path, 'r') as z:
    file_list = z.namelist()
    
    # Let's print the first 50 paths to understand the structure
    for f in file_list[:50]:
        print(f)
