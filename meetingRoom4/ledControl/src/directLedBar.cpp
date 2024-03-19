#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>

#define LED_PIN 26
#define NUM_LEDS 37
#define LED_TYPE WS2812B
#define COLOR_ORDER RGB

const char *ssid = "ESP32_AP";
const char *password = "password";

CRGB leds[NUM_LEDS];
AsyncWebServer server(80);

void prepLeds()
{
    FastLED.clear();
    FastLED.show();
    // white 1
    for (int i = 0; i < 4; i++)
    {
        leds[i] = CRGB::White;
    }
    // white 2
    for (int i = 19; i < 22; i++)
    {
        leds[i] = CRGB::White;
    }
}

void setup()
{
    Serial.begin(9600);
    delay(1000);

    // Initialize LED strip
    FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS);
    FastLED.setBrightness(100);

    // Start access point
    WiFi.softAP(ssid, password);
    IPAddress IP = WiFi.softAPIP();
    Serial.print("Access Point IP address: ");
    Serial.println(IP);

    // Configure API endpoint
    server.on("/esp32/setLeds", HTTP_GET, [](AsyncWebServerRequest *request)
              {
                  String command = request->arg("command");

                  if (command.equals("greenLed"))
                  {
                      // Set LEDs to green
                    prepLeds();
                      for (int i = 5; i < 18; i++)
                      {
                          leds[i] = CRGB::Green;
                      }
                      FastLED.show();
                      request->send(200, "text/plain", "LEDs set to green");
                  }
                  else if (command.equals("redLed"))
                  {
                      // Set LEDs to red
                    prepLeds();
                      for (int i = 23; i < 37; i++)
                      {
                          leds[i] = CRGB::Red;
                      }
                      FastLED.show();
                      request->send(200, "text/plain", "LEDs set to red");
                  }
                  else if (command.equals("clearLed"))
                  {
                      // Clear LEDs
                      FastLED.clear();
                      FastLED.show();
                      request->send(200, "text/plain", "LEDs cleared");
                  }
                  else
                  {
                      // Invalid command
                      request->send(400, "text/plain", "Invalid command");
                  } });
    server.begin();
}

void loop()
{
    // Other loop logic can go here
}

// ideal ratio for leds:
// starting white: 0 to 4
// green is 5 to 18
// white 2 is 19 to 22
// red is 24 to 37
