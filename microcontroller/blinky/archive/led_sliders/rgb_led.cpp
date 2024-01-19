#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

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

#define redOutput 19   // GPIO19
#define greenOutput 18 // GPIO18
#define blueOutput 5   // GPIO05

const char *PARAM_INPUT = "value";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>--- ESP EXP---</title>
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
		</style>
	</head>
	<body>
		<h2>ESP Web Server</h2>

		<p>Red (GPIO 21): <span id="textSliderValueRed">%SLIDERVALUERED%</span></p>
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
			Green (GPIO 19): <span id="textSliderValueGreen">%SLIDERVALUEGREEN%</span>
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
			Blue (GPIO 18): <span id="textSliderValueBlue">%SLIDERVALUEBLUE%</span>
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

		<button onclick="toggleRGB()">Toggle RGB</button>

		<script>
			// creates a function that takes in parameters element, the element id and then the slider color
			// element is the item that triggered the DOM event, which is the OnChange for the sliders
			// same with color, it is specified manually when being passed through when OnChange is called
			function updateSliderPWM(element, targetElementId, color) {
				// sets sliderValue to be the element.value, so the DOM being passed's RGB value (0-255)
				var sliderValue = element.value;

				// finds the html element within the document/dom that has the targetElementID (being passed through when function is called)
				// and updates the inner content of the html elements
				document.getElementById(targetElementId).innerHTML = sliderValue;

				// creates a new variable to use for html request, used to interact with servers and make http requests
				var xhr = new XMLHttpRequest();

				// initializes a new get request with a target slider to query for the color and assigns it to the colorSliderValue
				// i.e. gets color blue (passed from updateSliderPWM) and slider value is 43, blue=43
				xhr.open("GET", "/slider?" + color + "=" + sliderValue, true);

				// sends the html request (the get request for the sliders in this case)
				xhr.send();
			}

			// creates flags that are used by loops for conditions when running events/functions
			var isRGBEnabled = true;

			// variable created to be used with setInterval function when creating time-based
			// constraints/functions, the identifier for the interval
			var autoCycleInterval;
			var redCycleInterval;
			var greenCycleInterval;
			var blueCycleInterval;

			var intervalDuration = 100;

			// Function to clear color intervals
			function clearColorInterval() {
				clearInterval(redCycleInterval);
				clearInterval(greenCycleInterval);
				clearInterval(blueCycleInterval);
			}

			function autoRGB() {
				redColorCycle();
				greenColorCycle();
				blueColorCycle();
			}

			// function for the rgb toggle
			function toggleRGB() {
				// checks for the rgb flag
				isRGBEnabled = !isRGBEnabled;
				console.log("rgb status: " + isRGBEnabled);

				// if flag is true, call the autoCycleRGBSliders function
				if (isRGBEnabled) {
					// autoCycleRGBSliders();
					autoRGB();

					// else clear the interval to stop the cycle running function from being called by an interval
				} else {
					// clearInterval(autoCycleInterval);
					clearColorInterval(); // Call the function to clear color intervals
				}
			}

			function redColorCycle() {
				redCycleInterval = setInterval(function redController(redSlider) {
					console.log("red signal");
					var redSlider = document.getElementById("pwmSliderRed");
					if (Math.random() > 0.5) {
						setInterval(function incrementSlider() {
							redSlider.value++;
							updateSliderPWM(redSlider, "textSliderValueRed", "red");
						}, intervalDuration);

						// or decremented by 1
					} else {
						setInterval(function decrementSlider() {
							redSlider.value--;
							updateSliderPWM(redSlider, "textSliderValueRed", "red");
						}, intervalDuration);
					}
				}, 1000);
			}

			function greenColorCycle() {
				greenCycleInterval = setInterval(function greenController(greenSlider) {
					console.log("green signal");
					var greenSlider = document.getElementById("pwmSliderGreen");
					if (Math.random() > 0.5) {
						setInterval(function incrementSlider() {
							greenSlider.value++;
							updateSliderPWM(greenSlider, "textSliderValueGreen", "green");
						}, intervalDuration);

						// or decremented by 1
					} else {
						setInterval(function decrementSlider() {
							greenSlider.value--;
							updateSliderPWM(greenSlider, "textSliderValueGreen", "green");
						}, intervalDuration);
					}
				}, 1000);
			}

			function blueColorCycle() {
				blueCycleInterval = setInterval(function blueController(blueSlider) {
					console.log("blue signal");
					var blueSlider = document.getElementById("pwmSliderBlue");
					if (Math.random() > 0.5) {
						setInterval(function incrementSlider() {
							blueSlider.value++;
							updateSliderPWM(blueSlider, "textSliderValueBlue", "blue");
						}, intervalDuration);

						// or decremented by 1
					} else {
						setInterval(function decrementSlider() {
							blueSlider.value--;
							updateSliderPWM(blueSlider, "textSliderValueBlue", "blue");
						}, intervalDuration);
					}
				}, 1000);
			}

			// Initial call to start the auto cycle with RGB initially off
			toggleRGB();
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

	// focuses purely on brightness
	// // configure LED PWM functionalitites
	// ledcSetup(redChannel, freq, resolution);
	// ledcSetup(greenChannel, freq, resolution);
	// ledcSetup(blueChannel, freq, resolution);

	// // attach the channel to the GPIO to be controlled
	// ledcAttachPin(redOutput, redChannel);
	// ledcAttachPin(greenOutput, greenChannel);
	// ledcAttachPin(blueOutput, blueChannel);

	// // brightness value
	// ledcWrite(redChannel, sliderValueRed.toInt());
	// ledcWrite(greenChannel, sliderValueGreen.toInt());
	// ledcWrite(blueChannel, sliderValueBlue.toInt());

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
		Serial.println("green Value: " + sliderValueRed);
        analogWrite(greenOutput, sliderValueGreen.toInt());
    }
    if (request->hasParam("blue")) {
        sliderValueBlue = request->getParam("blue")->value();
		Serial.println("blue Value: " + sliderValueRed);
        analogWrite(blueOutput, sliderValueBlue.toInt());
    }
    request->send(200, "text/plain", "OK"); });

	// Start server
	server.begin();
}

void loop()
{
}