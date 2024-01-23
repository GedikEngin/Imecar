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
				margin: 0 auto;
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
				grid-gap: 25px;
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

			#body-div .main-body #button-container .controller-button {
				width: 100%;
				margin-top: 16.5%; /* Adjust the vertical space between buttons */
			}

			#body-div .main-body button:hover {
				background-color: rgba(0, 0, 0, 0.2);
			}

			#body-div .main-body #button-container #toggleLed[data-state="on"] {
				background-color: #4caf50;
			}

			#body-div .main-body #button-container #toggleLed[data-state="off"] {
				background-color: red;
			}

			#body-div .main-body #button-container #resetLed {
				background-color: darkorange;
			}
			#body-div .main-body #button-container #writeData {
				background-color: purple;
			}
			#body-div .main-body #button-container #readData {
				background-color: rgb(0, 0, 255);
			}

			#body-div .main-body #button-container .controller-button:hover {
				background-color: rgba(0, 0, 0, 0.2);
			}

			#body-div .main-body #button-container #toggleLed:hover {
				background-color: rgba(0, 0, 0, 0.2);
			}
			#body-div .main-body #button-container #resetLed:hover {
				background-color: rgba(0, 0, 0, 0.2);
			}
			#body-div .main-body #button-container #writeData:hover {
				background-color: rgba(0, 0, 0, 0.2);
			}
			#body-div .main-body #button-container #readData:hover {
				background-color: rgba(0, 0, 0, 0.2);
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
							placeholder="0 to 5"
							min="0"
							max="5"
							required
							class="light"
						/>

						<input type="hidden" name="fooID" value="1" />

						<label for="blink-fooMod" class="light">Time Between Blinks:</label>
						<input
							type="number"
							id="blink-fooMod"
							name="fooMod"
							placeholder="Increments in 10ms"
							min="1"
							max="255"
							required
							class="light"
						/>

						<label for="blink-hue" class="light">Hue 0-255 :</label>
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

						<label for="blink-saturation" class="light"
							>Saturation 0-255 :</label
						>
						<input
							type="number"
							id="blink-saturation"
							name="saturation"
							value="255"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="blink-brightness" class="light"
							>Brightness 0-255 :</label
						>
						<input
							type="number"
							id="blink-brightness"
							name="brightness"
							value="255"
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
							placeholder="0 to 5"
							min="0"
							max="5"
							required
							class="light"
						/>

						<input type="hidden" name="fooID" value="2" />

						<label for="breathing-fooMod" class="light"
							>Time For One Cycle:</label
						>
						<input
							type="number"
							id="breathing-fooMod"
							name="fooMod"
							placeholder="Increments of 10ms"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="breathing-hue" class="light">Hue 0-255 :</label>
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

						<label for="breathing-saturation" class="light"
							>Saturation 0-255 :</label
						>
						<input
							type="number"
							id="breathing-saturation"
							name="saturation"
							value="255"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="breathing-brightness" class="light"
							>Brightness 0-255 :</label
						>
						<input
							type="number"
							id="breathing-brightness"
							name="brightness"
							value="255"
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
							placeholder="0 to 5"
							min="0"
							max="5"
							required
							class="light"
						/>

						<input type="hidden" name="fooID" value="3" />

						<label for="solid-fooMod" class="light"
							>Time Until Auto Shutdown 0-255 :</label
						>
						<input
							type="number"
							id="solid-fooMod"
							name="fooMod"
							placeholder="Increments of 1 minute, 0 for always on"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="solid-hue" class="light">Hue 0-255 :</label>
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

						<label for="solid-saturation" class="light"
							>Saturation 0-255 :</label
						>
						<input
							type="number"
							id="solid-saturation"
							name="saturation"
							value="255"
							min="0"
							max="255"
							required
							class="light"
						/>

						<label for="solid-brightness" class="light"
							>Brightness 0-255 :</label
						>
						<input
							type="number"
							id="solid-brightness"
							name="brightness"
							value="255"
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

				<div id="button-container" class="input-container">
					<form data-fooID="4" class="light">
						<h2 class="light">Button Container</h2>

						<button
							type="button"
							onclick="ledButtons(this)"
							class="controller-button light"
							data-state="On"
							id="toggleLed"
						>
							On
						</button>

						<button
							type="button"
							onclick="ledButtons(this)"
							id="resetLed"
							class="controller-button light"
						>
							Reset
						</button>

						<button
							type="button"
							onclick="ledButtons(this)"
							id="writeData"
							class="controller-button light"
						>
							Write to EEPROM
						</button>

						<button
							type="button"
							onclick="ledButtons(this)"
							id="readData"
							class="controller-button light"
						>
							Read from EEPROM
						</button>
					</form>
				</div>
			</div>
		</div>
		<script>
			console.log("Script loaded!");

			function toggleDarkMode() {
				const bodyDiv = document.getElementById("body-div");
				bodyDiv.classList.toggle("dark");
				const elements = bodyDiv.querySelectorAll(".light");
				elements.forEach((element) => {
					element.classList.toggle("dark");
				});
			}

			function validateInput(value, fieldName, min, max) {
				// Convert the value to a number
				const numericValue = parseFloat(value);

				// checks if the value starts with 0
				if (/^0[0-9]+$/.test(value)) {
					alert(fieldName + " cannot have leading zeros.");
					return false;
				}

				// Check if the value is a valid number
				if (isNaN(numericValue)) {
					alert(fieldName + " must be a valid number.");
					return false;
				}

				// Check if the value is below the min
				if (min !== undefined && numericValue < min) {
					alert(fieldName + " must be greater than or equal to " + min + ".");
					return false;
				}

				// Check if the value is above the max
				if (max !== undefined && numericValue > max) {
					alert(fieldName + " must be less than or equal to " + max + ".");
					return false;
				}

				// Validation passed
				return true;
			}

			function ledButtons(button) {
				if (button.id === "toggleLed") {
					toggleLeds();
				} else if (button.id === "resetLed") {
					resetLed();
				} else if (button.id === "writeData") {
					writeData();
				} else if (button.id === "readData") {
					readData();
				}
			}

			function toggleLeds() {
				var button = document.getElementById("toggleLed");
				var toggleState;

				if (button.getAttribute("data-state") === "off") {
					button.setAttribute("data-state", "on");
					button.innerHTML = "On";
					toggleState = "on";
				} else {
					button.setAttribute("data-state", "off");
					button.innerHTML = "Off";
					toggleState = "off";
				}
			}

			function resetLed() {
				console.log("reset led func");
			}

			function writeData() {
				console.log("write data func");
			}

			function readData() {
				console.log("read data func");
			}

			function submitForm(button) {
				const form = button.closest("form");

				// Validate input before submitting
				const inputs = form.querySelectorAll("input");
				let isValid = true;

				inputs.forEach((input) => {
					const value = input.value;
					const fieldName = input.name;

					// Example: Validate the "fooMod" field with min=1 and max=255
					if (fieldName === "fooMod") {
						isValid = validateInput(value, fieldName, 1, 255);
						if (!isValid) {
							return; // Stop processing if validation fails
						}
					}
					if (
						fieldName === "hue" ||
						fieldName === "saturation" ||
						fieldName === "brightness"
					) {
						isValid = validateInput(value, fieldName);
						if (!isValid) {
							return; // Stop processing if validation fails
						}
					}

					// more validation for other fields if needed
				});

				// If validation passed, proceed with form submission
				if (isValid) {
					const formData = new FormData(form);

					// Set the value of fooID dynamically
					const fooID = form.getAttribute("data-fooID");
					formData.set("fooID", fooID);

					// Log the final data before sending it to the server
					console.log("Final Form Data:", Object.fromEntries(formData));

					fetch("/submit", {
						method: "POST",
						body: formData,
					})
						.then((response) => {
							if (!response.ok) {
								throw new Error("Network response was not ok");
							}
							return response.text();
						})
						.then((data) => {
							console.log(data);
						})
						.catch((error) => {
							console.error(
								"There was a problem with the fetch operation:",
								error
							);
						});
				}
			}
		</script>
	</body>
</html>

)rawliteral";

#pragma endregion website

void ledBlink(void *parameter)
{
	LedStruct *ledData = (LedStruct *)parameter;
	unsigned long previousMillis = 0; // will store the last time the LED was updated

	// loop that runs forever
	while (1)
	{
		unsigned long currentMillis = millis();

		if (currentMillis - previousMillis >= ledData->fooMod * 10)
		{
			// save the last time the LED was toggled
			previousMillis = currentMillis;

			// if the LED is off turn it on and vice versa
			if (leds[ledData->ledID] == CHSV(ledData->hue, ledData->saturation, 0))
			{
				leds[ledData->ledID] = CHSV(ledData->hue, ledData->saturation, ledData->brightness);
			}
			else
			{
				leds[ledData->ledID] = CHSV(ledData->hue, ledData->saturation, 0);
			}

			FastLED.show();
		}
		vTaskDelay(1); // Yield to other tasks
	}

	delete ledData; // Free the memory when done
}

void ledBreath(void *parameter)
{
	LedStruct *ledData = (LedStruct *)parameter;
	static uint8_t hue = 0;

	for (int i = 0; i < NUM_LEDS; ++i)
	{
		// Set each LED to a color based on the current hue
		leds[i] = CHSV(hue, 255, 255);
		FastLED.show();
		delay(50);
		hue += 10; // Increment the hue for the next LED
	}

	FastLED.clear();
	delay(250); // Pause between cycles
				// rest of the code...
}

void ledSolid(void *parameter)
{
	LedStruct *ledData = (LedStruct *)parameter;

	// rest of the code...
}

void ledTimeout(void *parameter)
{
	LedStruct *ledData = (LedStruct *)parameter;

	// rest of the code...
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
	LedStruct *ledData = new LedStruct{
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
		// Create a new task for the LED
		xTaskCreate(ledBlink, "BlinkTask", 2048, ledData, 2, NULL);
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

	// defining led type
	FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);

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
}

void loop()
{
}
