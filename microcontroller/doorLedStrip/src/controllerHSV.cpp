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

LedStruct expLed1 = {42, 0, 0, 1000, 0, 255, 255};
LedStruct expLed2 = {49, 0, 0, 100, 96, 255, 255};
LedStruct expLed3 = {56, 0, 0, 100, 160, 255, 255};

// IMPORTANT
// WHEN READING AND WRITING FROM ROM YOU RETRIEVE DATA AS A BYTE
// YOU NEED TO CONVERT IT INTO AN INTEGER
// AND SET MAX VALUES AS BYTE CAN ONLY REPRESENT 0-255 INTEGERS INCLUSIVE

void blinkLed(const LedStruct &ledData)
{
    leds[ledData.ledID] = CHSV(0, 0, 0);

    // Led assignments

    // Repeating loop
    unsigned long timerMillis = 0;
    while (millis() - timerMillis < int(ledData.fooMod))
    {
        leds[ledData.ledID] = CHSV(ledData.hue, ledData.saturation, 0);
        FastLED.show();
        delay(ledData.fooMod);
        leds[ledData.ledID] = CHSV(ledData.hue, ledData.saturation, ledData.brightness);
        FastLED.show();
        delay(ledData.fooMod);
        timerMillis = millis();
    }
}

void setup()
{
    Serial.begin(115200);
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);
    blinkLed(expLed1);
}

void loop()
{
}