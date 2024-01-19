/// @file    Blink.ino
/// @brief   Blink the first LED of an LED strip
/// @example Blink.ino

#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>

// Replace with your network credentials
const char *ssid = "MW42V_A8CA";
const char *password = "91014264";

// number of leds in a strip
#define NUM_LEDS 6
#define DATA_PIN 3 // GPIO03

// rgb variables
int redValue = 0;
int greenValue = 0;
int blueValue = 255;

CRGB leds[NUM_LEDS];

void setup()
{
    // connecting to wifi
    Serial.begin(115200);

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi..");
    }

    // Print ESP Local IP Address
    Serial.println(WiFi.localIP());

    // color control
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);
    Serial.println("define params");

    FastLED.clear();
    Serial.println("cleared");

    leds[0] = CRGB(redValue, greenValue, blueValue);
    Serial.println("passed in rgb vars");

    delay(30);
    Serial.println("30ms delay");

    FastLED.show();
    Serial.println("show leds");
}

void loop()
{
}