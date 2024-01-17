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
    // FastLED.addLeds<NEOPIXEL, DATA_PIN, RGB>(leds, NUM_LEDS); // RGB ordering
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS); // RGB ordering
}

// void loop()
// {
//     int main()
//     {
//         // Assuming 'led' is the number of iterations you want
//         int led = 5; // You can replace 5 with your desired value

//         for (int i = 0; i < led; ++i)
//         {
//             // Your loop body here
//             std::cout << "Iteration " << i + 1 << std::endl;
//         }

//         return 0;
//     }
// }

// basic test
void loop()
{
    // Turn the LED on, then pause
    // refers to the led at point
    leds[1] = CRGB(255, 0, 0);
    delay(3000);
    FastLED.show();
    leds[0] = CRGB(0, 255, 0);
    delay(3000);
    FastLED.show();
    leds[2] = CRGB(0, 0, 255);
    delay(3000);
    FastLED.show();

    // Now turn the LED off, then pause
    // leds[0] = CRGB::Black;
    // FastLED.show();
    // delay(500);
}