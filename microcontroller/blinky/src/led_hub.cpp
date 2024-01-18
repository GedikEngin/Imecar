#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>

// Replace with your network credentials
const char *ssid = "MW42V_A8CA";
const char *password = "91014264";

String sliderValueRed = "0";
String sliderValueGreen = "0";
String sliderValueBlue = "0";

// setting PWM properties
const int freq = 5000;
const int redChannel = 0;
const int greenChannel = 1;
const int blueChannel = 2;
const int resolution = 8;

#define redOutput 19
#define greenOutput 18
#define blueOutput 5

const char *PARAM_INPUT = "value";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>ESP Web Server</title>
		<style>
			html {
				font-family: Arial;
				display: inline-block;
				text-align: center;
			}
			h2 {
				font-size: 2.3rem;
			}
			p {
				font-size: 1.9rem;
			}
			body {
				max-width: 400px;
				margin: 0px auto;
				padding-bottom: 25px;
			}
			.slider {
				-webkit-appearance: none;
				margin: 14px;
				width: 360px;
				height: 25px;
				background: #ffd65c;
				outline: none;
				-webkit-transition: 0.2s;
				transition: opacity 0.2s;
			}
			.slider::-webkit-slider-thumb {
				-webkit-appearance: none;
				appearance: none;
				width: 35px;
				height: 35px;
				background: #003249;
				cursor: pointer;
			}
			.slider::-moz-range-thumb {
				width: 35px;
				height: 35px;
				background: #003249;
				cursor: pointer;
			}

			button {
				font-size: 1.5rem;
				margin-top: 15px;
				padding: 10px;
				background-color: #4caf50;
				color: white;
				border: none;
				border-radius: 5px;
				cursor: pointer;
			}

			#toggleOnOff[data-state="off"] {
				/* Add any styling for the "Off" state */
				color: white;
				padding: 10px 20px;
				border: none;
				cursor: pointer;
				background-color: red;
			}

			#toggleOnOff[data-state="on"] {
				/* Add any styling for the "On" state */
				color: white;
				padding: 10px 20px;
				border: none;
				cursor: pointer;
				background-color: green;
			}

			#turnRed {
				background-color: red;
				color: white;
				padding: 10px 20px;
				border: none;
				cursor: pointer;
			}

			#turnYellow {
				background-color: yellow;
				color: white;
				padding: 10px 20px;
				border: none;
				cursor: pointer;
			}
			#turnGreen {
				background-color: green;
				color: white;
				padding: 10px 20px;
				border: none;
				cursor: pointer;
			}

			.controlButton {
				text-shadow: 1px 1px 2px black;
			}

			.controlButton.clicked {
				background-color: gray !important;
			}
		</style>
	</head>
	<body>
		<h2>ESP Web Server</h2>
		<p>Red (GPIO 19): <span id="textSliderValueRed">%SLIDERVALUERED%</span></p>
		<p>
			<input
				type="range"
				onchange="updateSliderPWM(this, 'textSliderValueRed', 'red')"
				id="pwmSliderRed"
				min="0"
				max="255"
				value="%SLIDERVALUERED%"
				step="1"
				class="slider"
			/>
		</p>

		<p>
			Green (GPIO 18): <span id="textSliderValueGreen">%SLIDERVALUEGREEN%</span>
		</p>
		<p>
			<input
				type="range"
				onchange="updateSliderPWM(this, 'textSliderValueGreen', 'green')"
				id="pwmSliderGreen"
				min="0"
				max="255"
				value="%SLIDERVALUEGREEN%"
				step="1"
				class="slider"
			/>
		</p>

		<p>
			Blue (GPIO 5): <span id="textSliderValueBlue">%SLIDERVALUEBLUE%</span>
		</p>
		<p>
			<input
				type="range"
				onchange="updateSliderPWM(this, 'textSliderValueBlue', 'blue')"
				id="pwmSliderBlue"
				min="0"
				max="255"
				value="%SLIDERVALUEBLUE%"
				step="1"
				class="slider"
			/>
		</p>

		<button
			id="toggleOnOff"
			class="controlButton"
			data-state="off"
			onclick="toggleOnOff()"
		>
			Off
		</button>
		<button
			id="turnRed"
			class="controlButton"
			onclick='interactWithLED(this, "red")'
		>
			Red
		</button>
		<button
			id="turnYellow"
			class="controlButton"
			onclick='interactWithLED(this, "yellow")'
		>
			Yellow
		</button>
		<button
			id="turnGreen"
			class="controlButton"
			onclick='interactWithLED(this, "green")'
		>
			Green
		</button>

		<script>
			function updateSliderPWM(element, targetElementId, color) {
				var sliderValue = element.value;
				document.getElementById(targetElementId).innerHTML = sliderValue;
				console.log(sliderValue);
				var xhr = new XMLHttpRequest();
				xhr.open("GET", "/slider?" + color + "=" + sliderValue, true);
				xhr.send();
			}

			function toggleOnOff() {
				var button = document.getElementById("toggleOnOff");
				var toggleState;
				var xhr = new XMLHttpRequest();

				if (button.getAttribute("data-state") === "off") {
					button.setAttribute("data-state", "on");
					button.innerHTML = "On";
					toggleState = "on";
				} else {
					button.setAttribute("data-state", "off");
					button.innerHTML = "Off";
					toggleState = "off";
				}

				xhr.open("GET", "/toggleOnOff?state=" + toggleState, true);
				xhr.send();
				console.log(toggleState);
			}

			function interactWithLED(button, colorLED) {
				var xhr = new XMLHttpRequest();
				console.log(colorLED);
				xhr.open("GET", "/colorLED?colorLED=" + colorLED, true);
				xhr.send();

				// Apply acknowledgment effect to the button
				button.classList.add("controlButton-clicked");

				// Optionally, you can reset the button state after a delay
				setTimeout(function () {
					button.classList.remove("controlButton-clicked");
				}, 1000); // Adjust the delay as needed
			}
		</script>
	</body>
</html>

)rawliteral";

// Replaces placeholder with button section in your web page
String processor(const String &var)
{
	// Serial.println(var);
	if (var == "SLIDERVALUERED")
	{
		return "red " + sliderValueRed;
	}
	else if (var == "SLIDERVALUEGREEN")
	{
		return "green " + sliderValueGreen;
	}
	else if (var == "SLIDERVALUEBLUE")
	{
		return "blue " + sliderValueBlue;
	}
	return String();
}

void setup()
{
	// Serial port for debugging purposes
	Serial.begin(115200);

	// color
	// configuring led for color
	pinMode(redOutput, OUTPUT);
	pinMode(greenOutput, OUTPUT);
	pinMode(blueOutput, OUTPUT);

	// color selection
	analogWrite(redOutput, sliderValueRed.toInt());
	analogWrite(greenOutput, sliderValueGreen.toInt());
	analogWrite(blueOutput, sliderValueBlue.toInt());

	// Connect to Wi-Fi
	WiFi.begin(ssid, password);
	while (WiFi.status() != WL_CONNECTED)
	{
		delay(1000);
		Serial.println("Connecting to WiFi..");
	}

	// Print ESP Local IP Address
	Serial.println(WiFi.localIP());

	// controls and fetches sliders
	// Route for root / web page
	server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
			  { request->send_P(200, "text/html", index_html, processor); });

	// Send a GET request to <ESP_IP>/slider?value=<inputMessage>
	server.on("/slider", HTTP_GET, [](AsyncWebServerRequest *request)
			  {
    if (request->hasParam("red")) {
        sliderValueRed = request->getParam("red")->value();
		Serial.println("Red Value: " + sliderValueRed);
        analogWrite(redOutput, sliderValueRed.toInt());
    }
    if (request->hasParam("green")) {
        sliderValueGreen = request->getParam("green")->value();
		Serial.println("Green Value: " + sliderValueGreen);
        analogWrite(greenOutput, sliderValueGreen.toInt());
    }
    if (request->hasParam("blue")) {
        sliderValueBlue = request->getParam("blue")->value();
		Serial.println("Blue Value: " + sliderValueBlue);
        analogWrite(blueOutput, sliderValueBlue.toInt());
    }
    request->send(200, "text/plain", "OK"); });

	// toggles on off
	// New endpoint to execute a command
	server.on("/toggleOnOff", HTTP_GET, [](AsyncWebServerRequest *request)
			  {
    // Retrieve the 'state' query parameter from the request
    if (request->hasParam("state"));
	String toggleState = "off"; // Default value if not present
    {
        toggleState = request->getParam("state")->value();
    }

    // Execute your C++ command based on the toggleState
    Serial.println("Executing C++ command with state: " + toggleState);

    // Add your command execution logic here
    if (toggleState == "on")
    {
        // Execute command when state is 'on'
		Serial.println("led is on");
		analogWrite(redOutput, HIGH);
		analogWrite(greenOutput, HIGH);
		analogWrite(blueOutput, HIGH);

    }
    else if (toggleState == "off")
    {
        Serial.println("led is off");
		analogWrite(redOutput, LOW);
		analogWrite(greenOutput, LOW);
		analogWrite(blueOutput, LOW);
    }

    // Send a response to the client
    request->send(200, "text/plain", "Command Executed"); });

	// -----------------------------------------------------------
	// -----------------------------------------------------------
	// -----------------------------------------------------------
	// set colors
	// New endpoint to execute a command

	server.on("/colorLED", HTTP_GET, [](AsyncWebServerRequest *request)
			  {
    // Retrieve the 'color' query parameter from the request
    String colorLED = "default"; // Default value if not present
    if (request->hasParam("colorLED"))
    {
        colorLED = request->getParam("colorLED")->value();
    }

    // Execute your C++ command based on the colorLED parameter
    Serial.println("Executing C++ command with colorLED: " + colorLED);

    // Add your command execution logic here
    // For example, you can use if statements to check the color value
    if (colorLED == "red")
    {
        // Handle the 'red' case
		Serial.println("colorLED is red");
		analogWrite(redOutput, 255);
		analogWrite(greenOutput, 0);
		analogWrite(blueOutput, 0);
    }
    else if (colorLED == "yellow")
    {
        // Handle the 'yellow' case
		Serial.println("colorLED is yellow");
		analogWrite(redOutput, 255);
		analogWrite(greenOutput, 255);
		analogWrite(blueOutput, 0);
    }
    else if (colorLED == "green")
    {
        // Handle the 'green' case
		Serial.println("colorLED is green");
		analogWrite(redOutput, 0);
		analogWrite(greenOutput, 255);
		analogWrite(blueOutput, 0);
    }
    else
    {
        // Handle other cases or use the default value
    }

    // Send a response to the client
    request->send(200, "text/plain", "Command Executed"); });

	// Start server
	server.begin();
}

void loop()
{
}