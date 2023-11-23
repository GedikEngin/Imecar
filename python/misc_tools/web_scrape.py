import requests
from bs4 import BeautifulSoup
# pip install requests beautifulsoup4

def scrape_website(url):
    # Send a request to the URL
    response = requests.get(url)
    if response.status_code != 200:
        return None, "Failed to retrieve the website"

    # Parse the page content
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract the main body text and code examples
    main_body = soup.find_all(['p', 'pre'])  # Assuming paragraphs and preformatted text for code
    extracted_text = '\n'.join(element.get_text() for element in main_body)

    return extracted_text, None

def save_to_file(content, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(content)

# Example usage
url = "https://dev.to/welel/solid-principles-with-examples-in-python-mk"
content, error = scrape_website(url)

if content:
    file_name = "scraped_content.txt"
    save_to_file(content, file_name)
    print(f"Content saved to {file_name}")
else:
    print(error)