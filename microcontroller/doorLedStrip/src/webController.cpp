#pragma region config
/// @file    Blink.ino
/// @brief   Blink the first LED of an LED strip
/// @example Blink.ino

#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <initializer_list>
#include <EEPROM.h>
#include <iostream>

// led init
#define NUM_LEDS 6	 // Symbolic constant for the number of LEDs
#define DATA_PIN 3	 // Symbolic constant for the data pin (GPIO03)
CRGB leds[NUM_LEDS]; // Array to store color information for each LED

struct LedStruct
{
	int startAddress; // address to store in eeprom, makes it easier to navigate and build on later, documentation exists
	int ledID;		  // 0-5 led ID
	int fooID;		  // 0-5 function to be routed to

	int fooMod;		// 0 -255, modifier for blink interval, auto shutdown time, breathe speed
	int hue;		// 0-255 range for hue (normally 0-360 for degrees, FastLed uses 8bit 0-255)
	int saturation; // 0-255 range for saturation (universal)
	int brightness; // 0-255 range for brightness (normally 0-100, FastLed uses 8 bit 0-255)
};

// Replace with your network credentials
const char *ssid = "MW42V_A8CA";
const char *password = "91014264";

const char *PARAM_INPUT = "value";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

#pragma endregion config

#pragma region website
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>RGB LED Controller</title>
		<style>
			/* Common Styles */
			body {
				font-family: Arial, sans-serif;
				margin: 0;
				padding: 0;
			}

			#body-div {
				font-family: Arial, sans-serif;
				margin: 0;
				padding: 0;
			}

			#body-div .top-bar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				max-width: 50%;
				margin: 0 auto; /* Center the top-bar */
			}

			#body-div h1 {
				color: #000;
			}

			#body-div form {
				max-width: 100%;
				margin: 0 auto;
				padding: 20px;
				border-radius: 5px;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
				padding-left: 20px;
				padding-right: 20px;
				padding-bottom: 20px;
			}

			#body-div label {
				display: block;
				margin-bottom: 8px;
			}

			#body-div input {
				width: 100%;
				padding: 8px;
				margin-bottom: 12px;
				border: 1px solid #888;
				border-radius: 4px;
				box-sizing: border-box;
			}

			#body-div button {
				background-color: #4caf50;
				color: white;
				padding: 10px 15px;
				border: none;
				border-radius: 4px;
				cursor: pointer;
			}

			#body-div button:hover {
				background-color: #45a049;
			}

			#body-div .toggle-label {
				margin-left: 10px;
				color: #333;
			}

			/* Light Theme */
			#body-div.light {
				background-color: #fff;
				color: #333;
			}

			#body-div h1.light {
				color: #000;
			}

			#body-div form.light {
				background-color: #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			}

			#body-div label.light {
				color: #333;
			}

			#body-div input.light {
				background-color: #fff;
				color: #333;
			}

			#body-div button.light {
				background-color: #4caf50;
			}

			/* Dark Theme */
			#body-div.dark {
				background-color: #333;
				color: #fff;
			}

			#body-div h1.dark {
				color: #ffcc00;
			}

			#body-div form.dark {
				background-color: #444;
				box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
			}

			#body-div label.dark {
				color: #fff;
			}

			#body-div input.dark {
				background-color: #555;
				color: #fff;
			}

			#body-div button.dark {
				background-color: #4caf50;
			}

			/* 2x2 Grid */
			#body-div .main-body {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				grid-gap: 25px; /* Adjust the gap between the containers as needed */
				max-width: 50%;
				margin: 0 auto;
			}

			#body-div .toggle-container {
				display: flex;
				align-items: center;
				margin-bottom: 20px;
			}

			#body-div .toggle-switch {
				position: relative;
				display: inline-block;
				width: 60px;
				height: 34px;
			}

			#body-div .toggle-switch input {
				opacity: 0;
				width: 0;
				height: 0;
			}

			#body-div .slider {
				position: absolute;
				cursor: pointer;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: #ccc;
				transition: 0.4s;
			}

			#body-div .slider:before {
				position: absolute;
				content: "";
				height: 26px;
				width: 26px;
				left: 4px;
				bottom: 4px;
				background-color: white;
				transition: 0.4s;
			}

			#body-div input:checked + .slider {
				background-color: #2196f3;
			}

			#body-div input:focus + .slider {
				box-shadow: 0 0 1px #2196f3;
			}

			#body-div input:checked + .slider:before {
				transform: translateX(26px);
			}

			#body-div .slider.round {
				border-radius: 34px;
			}

			#body-div .slider.round:before {
				border-radius: 50%;
			}
		</style>
	</head>
	<body>
		<div id="body-div" class="light">
			<div class="top-bar">
				<h1 class="light">RGB LED Controller</h1>
				<div class="toggle-container">
					<label class="toggle-switch">
						<input
							type="checkbox"
							id="dark-mode-toggle"
							onclick="toggleDarkMode()"
						/>
						<span class="slider round"></span>
					</label>
					<span class="toggle-label light">Dark Mode</span>
				</div>
			</div>

			<div class="main-body">
				<div id="blink-container" class="input-container">
					<form data-fooID="1" class="light">
						<h2 class="light">Blink Function</h2>

						<label for="blink-ledID" class="light">LED ID:</label>
						<input
							type="number"
							id="blink-ledID"
							name="ledID"
							value="0"
							min="0"
							max="5"
							required
							class="light"
						/>

						<label for="blink-fooID" class="light">Foo ID:</label>
						<input
							type="number"
							id="blink-fooID"
							name="fooID"
							value="1"
							required
							class="light"
							readonly
						/>

						<label for="blink-fooMod" class="light">Foo Mod:</label>
						<input
							type="number"
							id="blink-fooMod"
							name="fooMod"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="blink-hue" class="light">Hue:</label>
						<input
							type="number"
							id="blink-hue"
							name="hue"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="blink-saturation" class="light">Saturation:</label>
						<input
							type="number"
							id="blink-saturation"
							name="saturation"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="blink-brightness" class="light">Brightness:</label>
						<input
							type="number"
							id="blink-brightness"
							name="brightness"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<button type="button" onclick="submitForm(this)" class="light">
							Submit
						</button>
					</form>
				</div>

				<div id="breathing-container" class="input-container">
					<form data-fooID="2" class="light">
						<h2 class="light">Breathing Effect</h2>

						<label for="breathing-ledID" class="light">LED ID:</label>
						<input
							type="number"
							id="breathing-ledID"
							name="ledID"
							value="0"
							min="0"
							max="5"
							required
							class="light"
						/>

						<label for="breathing-fooID" class="light">Foo ID:</label>
						<input
							type="number"
							id="breathing-fooID"
							name="fooID"
							value="2"
							required
							class="light"
							readonly
						/>

						<label for="breathing-fooMod" class="light">Foo Mod:</label>
						<input
							type="number"
							id="breathing-fooMod"
							name="fooMod"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="breathing-hue" class="light">Hue:</label>
						<input
							type="number"
							id="breathing-hue"
							name="hue"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="breathing-saturation" class="light">Saturation:</label>
						<input
							type="number"
							id="breathing-saturation"
							name="saturation"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="breathing-brightness" class="light">Brightness:</label>
						<input
							type="number"
							id="breathing-brightness"
							name="brightness"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<button type="button" onclick="submitForm(this)" class="light">
							Submit
						</button>
					</form>
				</div>

				<div id="solid-container" class="input-container">
					<form data-fooID="3" class="light">
						<h2 class="light">Solid Color</h2>

						<label for="solid-ledID" class="light">LED ID:</label>
						<input
							type="number"
							id="solid-ledID"
							name="ledID"
							value="0"
							min="0"
							max="5"
							required
							class="light"
						/>

						<label for="solid-fooID" class="light">Foo ID:</label>
						<input
							type="number"
							id="solid-fooID"
							name="fooID"
							value="3"
							required
							class="light"
							readonly
						/>

						<label for="solid-fooMod" class="light">Foo Mod:</label>
						<input
							type="number"
							id="solid-fooMod"
							name="fooMod"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="solid-hue" class="light">Hue:</label>
						<input
							type="number"
							id="solid-hue"
							name="hue"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="solid-saturation" class="light">Saturation:</label>
						<input
							type="number"
							id="solid-saturation"
							name="saturation"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="solid-brightness" class="light">Brightness:</label>
						<input
							type="number"
							id="solid-brightness"
							name="brightness"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<button type="button" onclick="submitForm(this)" class="light">
							Submit
						</button>
					</form>
				</div>

				<div id="timeout-container" class="input-container">
					<form data-fooID="4" class="light">
						<h2 class="light">Time Out Function</h2>

						<label for="timeout-ledID" class="light">LED ID:</label>
						<input
							type="number"
							id="timeout-ledID"
							name="ledID"
							value="0"
							min="0"
							max="5"
							required
							class="light"
						/>

						<label for="timeout-fooID" class="light">Foo ID:</label>
						<input
							type="number"
							id="timeout-fooID"
							name="fooID"
							value="4"
							required
							class="light"
							readonly
						/>

						<label for="timeout-fooMod" class="light">Foo Mod:</label>
						<input
							type="number"
							id="timeout-fooMod"
							name="fooMod"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="timeout-hue" class="light">Hue:</label>
						<input
							type="number"
							id="timeout-hue"
							name="hue"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="timeout-saturation" class="light">Saturation:</label>
						<input
							type="number"
							id="timeout-saturation"
							name="saturation"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="timeout-brightness" class="light">Brightness:</label>
						<input
							type="number"
							id="timeout-brightness"
							name="brightness"
							value="0"
							min="0"
							max="255"
							required
							class="light"
						/>

						<button type="button" onclick="submitForm(this)" class="light">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
		<script>
			function toggleDarkMode() {
				const bodyDiv = document.getElementById("body-div");
				bodyDiv.classList.toggle("dark");
				const elements = bodyDiv.querySelectorAll(".light");
				elements.forEach((element) => {
					element.classList.toggle("dark");
				});
			}

			function validateInput(value, fieldName) {
				// Check if the input contains leading zeros
				if (/^0[0-9]+$/.test(value)) {
					alert(fieldName + " cannot have leading zeros.");
					return false;
				}
				return true;
			}


            function submitForm(button) {
                // Get the parent form element of the clicked button
                const form = button.closest("form");

                // Extract data from the form
                const formData = new FormData(form);

                // Make an AJAX request to the server
                fetch('/submit', {
						method: 'POST',
						body: formData
					})
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            }
        </script>
	</body>
</html>


)rawliteral";

#pragma endregion website

void ledBlink(const LedStruct &ledData)
{
	Serial.print("LED Data: ");

	// Get a pointer to the start of the struct
	const int *ptr = &ledData.startAddress;

	// Get the number of members in the struct
	const size_t numMembers = sizeof(LedStruct) / sizeof(int);

	// Print each member
	for (size_t i = 0; i < numMembers; ++i)
	{
		Serial.print(*ptr++);
		if (i < numMembers - 1)
		{
			Serial.print(", ");
		}
	}

	Serial.println();
}

void ledBreath(const LedStruct &ledData)
{
	Serial.print("LED Data: ");

	// Get a pointer to the start of the struct
	const int *ptr = &ledData.startAddress;

	// Get the number of members in the struct
	const size_t numMembers = sizeof(LedStruct) / sizeof(int);

	// Print each member
	for (size_t i = 0; i < numMembers; ++i)
	{
		Serial.print(*ptr++);
		if (i < numMembers - 1)
		{
			Serial.print(", ");
		}
	}

	Serial.println();
}

void ledSolid(const LedStruct &ledData)
{
	Serial.print("LED Data: ");

	// Get a pointer to the start of the struct
	const int *ptr = &ledData.startAddress;

	// Get the number of members in the struct
	const size_t numMembers = sizeof(LedStruct) / sizeof(int);

	// Print each member
	for (size_t i = 0; i < numMembers; ++i)
	{
		Serial.print(*ptr++);
		if (i < numMembers - 1)
		{
			Serial.print(", ");
		}
	}

	Serial.println();
}

void ledTimeout(const LedStruct &ledData)
{
	Serial.print("LED Data: ");

	// Get a pointer to the start of the struct
	const int *ptr = &ledData.startAddress;

	// Get the number of members in the struct
	const size_t numMembers = sizeof(LedStruct) / sizeof(int);

	// Print each member
	for (size_t i = 0; i < numMembers; ++i)
	{
		Serial.print(*ptr++);
		if (i < numMembers - 1)
		{
			Serial.print(", ");
		}
	}

	Serial.println();
}

void handleFormSubmit(AsyncWebServerRequest *request)
{
	// Extract form data from the request
	String ledID = request->arg("ledID");
	String fooID = request->arg("fooID");
	String fooMod = request->arg("fooMod");
	String hue = request->arg("hue");
	String saturation = request->arg("saturation");
	String brightness = request->arg("brightness");

	// Convert the form data to integers
	int ledIDInt = ledID.toInt();
	int fooIDInt = fooID.toInt();
	int fooModInt = fooMod.toInt();
	int hueInt = hue.toInt();
	int saturationInt = saturation.toInt();
	int brightnessInt = brightness.toInt();

	// Create a LedStruct instance with the received data
	LedStruct ledData = {
		.startAddress = 42 * fooIDInt + ledIDInt * 7,
		.ledID = ledIDInt,
		.fooID = fooIDInt,
		.fooMod = fooModInt,
		.hue = hueInt,
		.saturation = saturationInt,
		.brightness = brightnessInt};

	// Call the appropriate function based on fooID
	if (fooIDInt == 1)
	{
		ledBlink(ledData);
	}
	else if (fooIDInt == 2)
	{
		ledBreath(ledData);
	}
	else if (fooIDInt == 3)
	{
		ledSolid(ledData);
	}
	else if (fooIDInt == 4)
	{
		ledTimeout(ledData);
	}

	// Send a response to the client
	request->send(200, "text/plain", "Form submitted successfully");
}

void setup()
{
	// Serial port for debugging purposes
	Serial.begin(115200);

	// Connect to Wi-Fi
	WiFi.begin(ssid, password);
	while (WiFi.status() != WL_CONNECTED)
	{
		delay(1000);
		Serial.println("Connecting to WiFi..");
	}

	// Print ESP Local IP Address
	Serial.println(WiFi.localIP());

	// Serve the HTML content at the root URL
	server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
			  { request->send_P(200, "text/html", index_html); });

	// Handle form submission
	server.on("/submit", HTTP_POST, [](AsyncWebServerRequest *request)
			  { handleFormSubmit(request); });

	// Begin server
	server.begin();

	// Add a short delay after server.begin()
	delay(1000);
}

void loop()
{
}