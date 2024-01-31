/// @file    Blink.ino
/// @brief   Blink the first LED of an LED strip
/// @example Blink.ino

#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <iostream>
#include <HTTPClient.h>

// number of leds in a strip
#define NUM_LEDS 72

#define DATA_PIN 3 // GPIO03

// Define the array of leds
CRGB leds[NUM_LEDS];

void setup()
{
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS); // RGB ordering
}

// void loop()
// {
//     // Set the hue value (0-255) for the gradient
//     static uint8_t hue = 0;

//     for (int i = 0; i < NUM_LEDS; ++i)
//     {
//         // Set each LED to a color based on the current hue
//         leds[i] = CHSV(hue, 255, 255);
//         FastLED.show();
//         delay(50);
//         hue += 10; // Increment the hue for the next LED
//     }w

//     FastLED.clear();
//     delay(250); // Pause between cycles
// }

void loop()
{
    // Set the hue value (0-255) for the gradient
    static uint8_t hue = 0;

    for (int i = 0; i < NUM_LEDS; ++i)
    {
        // Set each LED to a color based on the current hue
        leds[i] = CHSV(hue, 255, 255);
        FastLED.show();
        delay(30);
        hue += 10; // Increment the hue for the next LED
    }

    delay(100);
    FastLED.show();

    for (int i = NUM_LEDS - 1; i >= 0; --i)
    {
        leds[i] = CRGB::Black;
        FastLED.show();
        delay(30);
    }
}