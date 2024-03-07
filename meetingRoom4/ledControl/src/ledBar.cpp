#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>

#define LED_PIN 3
#define NUM_LEDS 50
#define LED_TYPE WS2812B
#define COLOR_ORDER RGB

const char *ssid = "ESP32_AP";
const char *password = "password";
AsyncWebServer server(8080);
CRGB leds[NUM_LEDS];

void setup()
{
    Serial.begin(115200);
    delay(1000);

    WiFi.softAP(ssid, password);
    Serial.print("Access Point IP address: ");
    Serial.println(WiFi.softAPIP());

    FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS);

    // Define the route for handling the LED settings
    server.on("/esp32/setLeds", HTTP_GET, [](AsyncWebServerRequest *request)
              {
                  String path = request->url(); // Get the whole URI
                  Serial.println("Received URL: " + path);

                  // Parse URL parameters
                  int hue = 0;
                  int saturation = 0;
                  int value = 0;
                  if (request->hasParam("hue") && request->hasParam("saturation") && request->hasParam("value")) {
                      hue = request->getParam("hue")->value().toInt();
                      saturation = request->getParam("saturation")->value().toInt();
                      value = request->getParam("value")->value().toInt();
                  }

                  Serial.println("Parsed values:");
                  Serial.println("hue: " + String(hue));
                  Serial.println("saturation: " + String(saturation));
                  Serial.println("value: " + String(value));

                  // Set LEDs using CHSV color assignment
                  for (int i = 0; i < NUM_LEDS; i++) {
                      leds[i] = CHSV(hue, saturation, value);
                  }
                  FastLED.show();

                  request->send(200, "application/json", "{\"message\": \"LEDs set to specified color\"}"); });

    server.begin();
}

void loop() {}