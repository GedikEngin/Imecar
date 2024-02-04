#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>

const char *ssid = "ESP32-Access-Point";
const char *password = "123456789";

#define DATA_PIN 3  // Set the pin connected to the LED
#define NUM_LEDS 72 // Number of LEDs in your strip

CRGB leds[NUM_LEDS];

const char *PARAM_HUE = "hue";
const char *PARAM_SATURATION = "saturation";
const char *PARAM_VALUE = "value";

const char *htmlContent = R"html(
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LED Controller</title>
</head>
<body>
  <h1>LED Controller</h1>
  <form id="colorForm">
    <label for="hue">Hue (0-255):</label>
    <input type="number" id="hue" name="hue" min="0" max="255" required>
    <br>
    <label for="saturation">Saturation (0-255):</label>
    <input type="number" id="saturation" name="saturation" min="0" max="255" required>
    <br>
    <label for="value">Value (0-255):</label>
    <input type="number" id="value" name="value" min="0" max="255" required>
    <br>
    <input type="submit" value="Set Color">
  </form>

  <script>
    document.getElementById('colorForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const hue = document.getElementById('hue').value;
      const saturation = document.getElementById('saturation').value;
      const value = document.getElementById('value').value;
      setColor(hue, saturation, value);
    });

    function setColor(hue, saturation, value) {
      fetch(`/setcolor?hue=${hue}&saturation=${saturation}&value=${value}`)
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
  </script>
</body>
</html>
)html";

// Create an instance of the server
AsyncWebServer server(80);

void setup()
{
  // Initialize serial port
  Serial.begin(115200);
  Serial.println("Serial initialized...");

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Setup FastLED
  FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);

  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(200, "text/html", htmlContent); });

  // Route to set the LED color using HSV
  server.on("/setcolor", HTTP_GET, [](AsyncWebServerRequest *request)
            {
                  String hueValue = "0";
                  String saturationValue = "0";
                  String valueValue = "0";

                  if (request->hasParam(PARAM_HUE))
                      hueValue = request->getParam(PARAM_HUE)->value();
                  if (request->hasParam(PARAM_SATURATION))
                      saturationValue = request->getParam(PARAM_SATURATION)->value();
                  if (request->hasParam(PARAM_VALUE))
                      valueValue = request->getParam(PARAM_VALUE)->value();

                  int hue = hueValue.toInt();
                  int saturation = saturationValue.toInt();
                  int value = valueValue.toInt();

                  // Set the color for all LEDs
                  for (int i = 0; i < NUM_LEDS; i++)
                  {
                      leds[i] = CHSV(hue, saturation, value);
                  }

                  FastLED.show();

                  Serial.println("LED color set...");
                  request->send(200, "text/plain", "LED color set"); });

  // Do not print "Connecting to WiFi..." if already connected
  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("Already connected to WiFi");
  }

  // Start server
  server.begin();
}

void loop() {}
