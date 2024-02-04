#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>

const char *ssid = "ESP32-Access-Point";
const char *password = "123456789";

#define DATA_PIN 3  // Set the pin connected to the LED
#define NUM_LEDS 72 // Number of LEDs in your strip

CRGB leds[NUM_LEDS];

const char *PARAM_RED = "red";
const char *PARAM_GREEN = "green";
const char *PARAM_BLUE = "blue";

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
  <button onclick="setColor(255, 0, 0)">Set Red</button>
  <button onclick="setColor(0, 0, 255)">Set Blue</button>
  <button onclick="setColor(0, 255, 0)">Set Green</button>

  <script>
    function setColor(red, green, blue) {
      fetch(`/setcolor?red=${red}&green=${green}&blue=${blue}`)
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

  // Route to set the LED color
  server.on("/setcolor", HTTP_GET, [](AsyncWebServerRequest *request)
            {
                  String redValue = "0";
                  String greenValue = "0";
                  String blueValue = "0";

                  if (request->hasParam(PARAM_RED))
                      redValue = request->getParam(PARAM_RED)->value();
                  if (request->hasParam(PARAM_GREEN))
                      greenValue = request->getParam(PARAM_GREEN)->value();
                  if (request->hasParam(PARAM_BLUE))
                      blueValue = request->getParam(PARAM_BLUE)->value();

                  int red = redValue.toInt();
                  int green = greenValue.toInt();
                  int blue = blueValue.toInt();

                  // Set the color for all LEDs
                  for (int i = 0; i < NUM_LEDS; i++)
                  {
                      leds[i] = CRGB(red, green, blue);
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
