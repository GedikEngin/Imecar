#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

const char *ssid = "MW42V_A8CA";
const char *password = "91014264";

const int outputBlue = 18;
const int outputRed = 18;
const int outputGreen = 5;

String sliderValueRed = "0";
String sliderValueGreen = "0";
String sliderValueBlue = "0";

const int freq = 5000;
const int ledChannelRed = 0;
const int ledChannelGreen = 1;
const int ledChannelBlue = 2;
const int resolution = 8;

const char *PARAM_INPUT_RED = "red";
const char *PARAM_INPUT_GREEN = "green";
const char *PARAM_INPUT_BLUE = "blue";

AsyncWebServer server(80);

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>ESP Web Server - RGB Control</title>
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
		<h2>ESP Web Server - RGB Control</h2>
		<p>Red: <span id="textSliderValueRed">%SLIDERVALUERED%</span></p>
		<p>
			<input
				type="range"
				onchange="updateSliderPWM('red', this)"
				id="pwmSliderRed"
				min="0"
				max="255"
				value="%SLIDERVALUERED%"
				step="1"
				class="slider"
			/>
		</p>
		<p>Green: <span id="textSliderValueGreen">%SLIDERVALUEGREEN%</span></p>
		<p>
			<input
				type="range"
				onchange="updateSliderPWM('green', this)"
				id="pwmSliderGreen"
				min="0"
				max="255"
				value="%SLIDERVALUEGREEN%"
				step="1"
				class="slider"
			/>
		</p>
		<p>Blue: <span id="textSliderValueBlue">%SLIDERVALUEBLUE%</span></p>
		<p>
			<input
				type="range"
				onchange="updateSliderPWM('blue', this)"
				id="pwmSliderBlue"
				min="0"
				max="255"
				value="%SLIDERVALUEBLUE%"
				step="1"
				class="slider"
			/>
		</p>
		<script>
			function updateSliderPWM(channel, element) {
				var sliderValue = document.getElementById("pwmSlider" + channel).value;
				document.getElementById("textSliderValue" + channel).innerHTML =
					sliderValue;
				console.log(channel + ": " + sliderValue);
				var xhr = new XMLHttpRequest();
				xhr.open("GET", "/slider?" + channel + "=" + sliderValue, true);
				xhr.send();
			}
		</script>
	</body>
</html>


)rawliteral";

String processor(const String &var)
{
	if (var == "SLIDERVALUERED")
	{
		return sliderValueRed;
	}
	else if (var == "SLIDERVALUEGREEN")
	{
		return sliderValueGreen;
	}
	else if (var == "SLIDERVALUEBLUE")
	{
		return sliderValueBlue;
	}
	return String();
}

void setup()
{
	Serial.begin(115200);

	ledcSetup(ledChannelRed, freq, resolution);
	ledcSetup(ledChannelGreen, freq, resolution);
	ledcSetup(ledChannelBlue, freq, resolution);

	ledcAttachPin(outputRed, ledChannelRed);
	ledcAttachPin(outputGreen, ledChannelGreen);
	ledcAttachPin(outputBlue, ledChannelBlue);

	ledcWrite(ledChannelRed, sliderValueRed.toInt());
	ledcWrite(ledChannelGreen, sliderValueGreen.toInt());
	ledcWrite(ledChannelBlue, sliderValueBlue.toInt());

	WiFi.begin(ssid, password);
	while (WiFi.status() != WL_CONNECTED)
	{
		delay(1000);
		Serial.println("Connecting to WiFi..");
	}

	Serial.println(WiFi.localIP());

	server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
			  { request->send_P(200, "text/html", index_html, processor); });

	server.on("/slider", HTTP_GET, [](AsyncWebServerRequest *request)
			  {
    if (request->hasParam(PARAM_INPUT_RED)) {
      sliderValueRed = request->getParam(PARAM_INPUT_RED)->value();
      ledcWrite(ledChannelRed, sliderValueRed.toInt());
    }
    if (request->hasParam(PARAM_INPUT_GREEN)) {
      sliderValueGreen = request->getParam(PARAM_INPUT_GREEN)->value();
      ledcWrite(ledChannelGreen, sliderValueGreen.toInt());
    }
    if (request->hasParam(PARAM_INPUT_BLUE)) {
      sliderValueBlue = request->getParam(PARAM_INPUT_BLUE)->value();
      ledcWrite(ledChannelBlue, sliderValueBlue.toInt());
    }

    request->send(200, "text/plain", "OK"); });

	server.begin();
}

void loop()
{
}
