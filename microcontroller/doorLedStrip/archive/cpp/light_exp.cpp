/// @file    Blink.ino
/// @brief   Blink the first LED of an LED strip
/// @example Blink.ino

#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <iostream>

// number of leds in a strip
#define NUM_LEDS 6

#define DATA_PIN 3
#define CLOCK_PIN 13

// Define the array of leds
CRGB leds[NUM_LEDS];

void setup()
{
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS); // RGB ordering
}

// basic test
void loop()
{
    while (true)
    {
        FastLED.clear();
        leds[0] = CRGB(255, 0, 0);
        delay(100);
        FastLED.show();

        FastLED.clear();
        leds[1] = CRGB(0, 255, 0);
        delay(100);
        FastLED.show();

        FastLED.clear();
        leds[2] = CRGB(0, 0, 255);
        delay(100);
        FastLED.show();

        FastLED.clear();
        leds[3] = CRGB(255, 255, 0);
        delay(100);
        FastLED.show();

        FastLED.clear();
        leds[4] = CRGB(0, 255, 225);
        delay(100);
        FastLED.show();

        FastLED.clear();
        leds[5] = CRGB(255, 0, 255);
        delay(100);
        FastLED.show();
    }
}