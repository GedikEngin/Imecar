from PIL import Image
from io import BytesIO
import os
import base64

def image_to_blob(image_path):
    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()
    return BytesIO(image_data)

def blob_to_image(blob_data, output_path):
    image = Image.open(BytesIO(blob_data))
    image.save(output_path)

def encode_blob_data(blob_data):
    return base64.b64encode(blob_data).decode('utf-8')

def decode_blob_data(encoded_blob_data):
    return base64.b64decode(encoded_blob_data.encode('utf-8'))

def read_blob_from_file(blob_file_path):
    with open(blob_file_path, 'rb') as blob_file:
        return blob_file.read()

def main():
    print("Choose an option:")
    print("1. Convert Image to Blob")
    print("2. Convert Blob to Image")

    choice = input("Enter the option number: ")

    if choice == "1":
        # Ask the user for a relative path to the image
        image_path = input("Enter the relative path to the image: ")

        # Construct the full path based on the current working directory
        image_path = os.path.abspath(os.path.join(os.getcwd(), image_path))

        if not os.path.exists(image_path):
            print("Error: The specified image file does not exist.")
            return

        blob = image_to_blob(image_path)
        print("Image converted to Blob.")

        # Create a .txt file with the encoded blob data in the same directory as the image
        image_name = os.path.splitext(os.path.basename(image_path))[0]
        output_file_path = os.path.join(os.path.dirname(image_path), f"{image_name}.txt")

        with open(output_file_path, 'w') as output_file:
            output_file.write(encode_blob_data(blob.getvalue()))
            print(f"Encoded Blob saved to '{output_file_path}'.")

    elif choice == "2":
        # Ask the user for a relative path to the .txt file containing the encoded blob
        blob_file_path = input("Enter the relative path to the .txt file containing the encoded blob: ")

        # Construct the full path based on the current working directory
        blob_file_path = os.path.abspath(os.path.join(os.getcwd(), blob_file_path))

        if not os.path.exists(blob_file_path):
            print("Error: The specified blob file does not exist.")
            return

        encoded_blob_data = read_blob_from_file(blob_file_path)
        decoded_blob_data = decode_blob_data(encoded_blob_data)

        # Automatically generate the output image file name based on the text file name
        output_image_name = os.path.splitext(os.path.basename(blob_file_path))[0]
        output_path = os.path.join(os.path.dirname(blob_file_path), f"{output_image_name}.png")

        blob_to_image(decoded_blob_data, output_path)
        print(f"Decoded Blob converted to Image. Image saved as '{output_path}'.")

    else:
        print("Invalid choice. Please enter either '1' or '2'.")

if __name__ == "__main__":
    main()
