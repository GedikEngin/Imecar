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
    int ledID;
    int fooMod;
    int hue;
    int saturation;
    int brightness;
};

LedStruct ledData[] = {
    {0, 400, 0, 255, 255},
    {1, 800, 51, 255, 255},
    {2, 1200, 102, 255, 255},
    {3, 1600, 153, 255, 255},
    {4, 2000, 204, 255, 255},
    {5, 2400, 255, 255, 255},
};

void blinkLed(const LedStruct &ledData)
{
    unsigned long timerMillis = 0;
    while (1)
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

void blinkTask(void *parameter)
{
    LedStruct *ledInfo = (LedStruct *)parameter;
    blinkLed(*ledInfo);
    vTaskDelete(NULL); // Delete the task (it will never return)
}

void setup()
{
    Serial.begin(115200);
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);

    for (int i = 0; i < NUM_LEDS; ++i)
    {
        xTaskCreate(blinkTask, "BlinkTask", 2048, &ledData[i], 1, NULL);
    }
}

void loop()
{
    // The loop will not be used in this example, as tasks handle LED blinking
}
