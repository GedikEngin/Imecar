#pragma region config
/// @file    Blink.ino
/// @brief   Blink the first LED of an LED strip
/// @example Blink.ino

#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <initializer_list>
#include <EEPROM.h>
#include <iostream>

// led init
#define NUM_LEDS 6   // Symbolic constant for the number of LEDs
#define DATA_PIN 3   // Symbolic constant for the data pin (GPIO03)
CRGB leds[NUM_LEDS]; // Array to store color information for each LED

struct LedStruct
{
    int startAddress; // address to store in eeprom, makes it easier to navigate and build on later, documentation exists
    int ledID;        // 0-5 led ID
    int fooID;        // 0-4 function to be routed to

    int fooMod;     // modifier for blink interval, auto shutdown time, breathe speed
    int hue;        // 0-255 range for hue (normally 0-360 for degrees, FastLed uses 8bit 0-255)
    int saturation; // 0-255 range for saturation (universal)
    int brightness; // 0-255 range for brightness (normally 0-100, FastLed uses 8 bit 0-255)
};

LedStruct expBlink0 = {42, 0, 1, 400, 0, 255, 255};
LedStruct expBlink1 = {49, 1, 1, 800, 51, 255, 255};
LedStruct expBlink2 = {56, 2, 1, 1200, 102, 255, 255};
LedStruct expBlink3 = {63, 3, 1, 1600, 153, 255, 255};
LedStruct expBlink4 = {70, 4, 1, 2000, 204, 255, 255};
LedStruct expBlink5 = {77, 5, 1, 2400, 255, 255, 255};

// IMPORTANT
// WHEN READING AND WRITING FROM ROM YOU RETRIEVE DATA AS A BYTE
// YOU NEED TO CONVERT IT INTO AN INTEGER
// AND SET MAX VALUES AS BYTE CAN ONLY REPRESENT 0-255 INTEGERS INCLUSIVE
#pragma endregion config

void blinkLed(const LedStruct &ledData)
{
    unsigned long previousMillis = 0; // will store the last time the LED was updated

    // loop that runs forever
    while (1)
    {
        unsigned long currentMillis = millis();

        if (currentMillis - previousMillis >= ledData.fooMod)
        {
            // save the last time the LED was toggled
            previousMillis = currentMillis;

            // if the LED is off turn it on and vice versa
            if (leds[ledData.ledID] == CHSV(ledData.hue, ledData.saturation, 0))
            {
                leds[ledData.ledID] = CHSV(ledData.hue, ledData.saturation, ledData.brightness);
            }
            else
            {
                leds[ledData.ledID] = CHSV(ledData.hue, ledData.saturation, 0);
            }

            FastLED.show();
        }
    }
}

void setup()
{
    Serial.begin(115200);
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);
    blinkLed(expBlink0);
    blinkLed(expBlink1);
}

void loop()
{
}
