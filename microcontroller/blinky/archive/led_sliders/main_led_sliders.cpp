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
		<script>
			function updateSliderPWM(element, targetElementId, color) {
				var sliderValue = element.value;
				document.getElementById(targetElementId).innerHTML = sliderValue;
				console.log(sliderValue);
				var xhr = new XMLHttpRequest();
				xhr.open("GET", "/slider?" + color + "=" + sliderValue, true);
				xhr.send();
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