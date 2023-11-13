from PIL import Image
from io import BytesIO
import os

def image_to_blob(image_path):
    with open(image_path, 'rb') as image_file:
        return BytesIO(image_file.read())

def blob_to_image(blob_data, output_path):
    Image.open(BytesIO(blob_data)).save(output_path)

def read_blob_from_file(blob_file_path):
    with open(blob_file_path, 'rb') as blob_file:
        return BytesIO(blob_file.read())

def main():
    print("Choose an option:")
    print("1. Convert Image to Blob")
    print("2. Convert Blob to Image")

    choice = input("Enter the option number: ")

    if choice == "1":
        image_path = input("Enter the relative path to the image: ")
        if os.path.exists(image_path):
            blob = image_to_blob(image_path)
            print("Image converted to Blob.")
            output_file_path = f"{os.path.splitext(os.path.basename(image_path))[0]}.txt"
            with open(output_file_path, 'wb') as output_file:
                output_file.write(blob.getvalue())
                print(f"Blob saved to '{output_file_path}'.")
        else:
            print("Error: The specified image file does not exist.")

    elif choice == "2":
        blob_file_path = input("Enter the relative path to the .txt file containing the blob: ")
        if os.path.exists(blob_file_path):
            blob_data = read_blob_from_file(blob_file_path)
            output_image_name = os.path.splitext(os.path.basename(blob_file_path))[0]
            output_path = f"{output_image_name}.png"
            blob_to_image(blob_data.getvalue(), output_path)
            print(f"Blob converted to Image. Image saved as '{output_path}'.")
        else:
            print("Error: The specified blob file does not exist.")

    else:
        print("Invalid choice. Please enter either '1' or '2'.")

if __name__ == "__main__":
    main()