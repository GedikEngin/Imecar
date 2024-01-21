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

#define NUM_LEDS 6
#define DATA_PIN 3

CRGB leds[NUM_LEDS];

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

LedStruct ledData[] = {expBlink0, expBlink1, expBlink2, expBlink3, expBlink4, expBlink5};

void blinkLed(void *parameter)
{
    LedStruct *ledData = (LedStruct *)parameter;
    unsigned long previousMillis = 0; // will store the last time the LED was updated

    // loop that runs forever
    while (1)
    {
        unsigned long currentMillis = millis();

        if (currentMillis - previousMillis >= ledData->fooMod)
        {
            // save the last time the LED was toggled
            previousMillis = currentMillis;

            // if the LED is off turn it on and vice versa
            if (leds[ledData->ledID] == CHSV(ledData->hue, ledData->saturation, 0))
            {
                leds[ledData->ledID] = CHSV(ledData->hue, ledData->saturation, ledData->brightness);
            }
            else
            {
                leds[ledData->ledID] = CHSV(ledData->hue, ledData->saturation, 0);
            }

            FastLED.show();
        }
        vTaskDelay(1); // Yield to other tasks
    }
}

void setup()
{
    Serial.begin(115200);
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);

    for (int i = 0; i < NUM_LEDS; ++i)
    {
        xTaskCreate(blinkLed, "BlinkTask", 2048, &ledData[i], 1, NULL);
    }
}

void loop()
{
    // The loop will not be used in this example, as tasks handle LED blinking
}
