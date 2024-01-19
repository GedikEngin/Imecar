#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

// Replace with your network credentials
const char *ssid = "MW42V_A8CA";
const char *password = "91014264";

const int output = 19;

String sliderValue = "0";

// setting PWM properties
const int freq = 5000;
const int ledChannel = 0;
const int resolution = 8;

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
		<p>Red 21:
            </br>
            <span id="textSliderValueRed">%SLIDERVALUERED%</span></p>
		<p>
			<input
				type="range"
				onchange="updateSliderPWM(this, 'textSliderValueRed')"
				id="pwmSliderRed"
				min="0"
				max="255"
				value="%SLIDERVALUERED%"
				step="1"
				class="slider"
			/>
		</p>
		<p>Green 19:
            </br>
            <span id="textSliderValueGreen">%SLIDERVALUEGREEN%</span></p>
		<p>
			<input
				type="range"
				onchange="updateSliderPWM(this, 'textSliderValueGreen')"
				id="pwmSliderGreen"
				min="0"
				max="255"
				value="%SLIDERVALUEGREEN%"
				step="1"
				class="slider"
			/>
		</p>
		<p>Blue 18: 
            </br>
            <span id="textSliderValueBlue">%SLIDERVALUEBLUE%</span></p>
		<p>
			<input
				type="range"
				onchange="updateSliderPWM(this, 'textSliderValueBlue')"
				id="pwmSliderBlue"
				min="0"
				max="255"
				value="%SLIDERVALUEBLUE%"
				step="1"
				class="slider"
			/>
		</p>

		<script>
			var sliderRed = 0;
			var sliderGreen = 0;
			var sliderBlue = 0;

			function updateSliderPWM(element, outputId, sliderVariable) {
				var sliderValue = element.value;
				document.getElementById(outputId).innerHTML = sliderValue;
				console.log(sliderValue);

				// Update the corresponding slider variable
				switch (sliderVariable) {
					case 'sliderRed':
						sliderRed = sliderValue;
						break;
					case 'sliderGreen':
						sliderGreen = sliderValue;
						break;
					case 'sliderBlue':
						sliderBlue = sliderValue;
						break;
					default:
						break;
				}
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "/slider?red=" + sliderRed + "&green=" + sliderGreen + "&blue=" + sliderBlue, true);
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
	if (var == "SLIDERVALUE")
	{
		return sliderValue;
	}
	return String();
}

void setup()
{
	// Serial port for debugging purposes
	Serial.begin(115200);

	// configure LED PWM functionalitites
	ledcSetup(ledChannel, freq, resolution);

	// attach the channel to the GPIO to be controlled
	ledcAttachPin(output, ledChannel);

	ledcWrite(ledChannel, sliderValue.toInt());

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
    String inputMessage;
    // GET input1 value on <ESP_IP>/slider?value=<inputMessage>
    if (request->hasParam(PARAM_INPUT)) {
      inputMessage = request->getParam(PARAM_INPUT)->value();
      sliderValue = inputMessage;
      ledcWrite(ledChannel, sliderValue.toInt());
    }
    else {
      inputMessage = "No message sent";
    }
    Serial.println(inputMessage);
    request->send(200, "text/plain", "OK"); });

	// Start server
	server.begin();
}

void loop()
{
}