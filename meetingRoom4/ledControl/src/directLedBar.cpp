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

    // // Set all LEDs to red
    // fill_solid(leds, NUM_LEDS, CRGB::Red);


    // white 1
    for (int i = 0; i < 4; i++)
    {
        leds[i] = CHSV(0, 0, 255);
    }

    // green
    for (int i = 5; i < 18; i++)
    {
        leds[i] = CHSV(94, 255, 255);
    }

    // white 2
    for (int i = 19; i < 22; i++)
    {
        leds[i] = CHSV(0, 0, 255);
    }

    // red
    for (int i = 23; i < 37; i++)
    {
        leds[i] = CHSV(0, 255, 255);
    }

    FastLED.show();
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
