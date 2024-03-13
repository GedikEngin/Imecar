#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>

#define NUM_LEDS 50 // Change this according to your LED strip length
#define LED_PIN 17
#define SWITCH_PIN_1 21
#define SWITCH_PIN_2 22

CRGB leds[NUM_LEDS];

int hue = 0;
int saturation = 255; // Full saturation
int value = 255;      // Full brightness

bool setRedFlag = false;
bool blinkFlag = false;
bool blinkState = false;

void setup()
{
    FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS);

    pinMode(SWITCH_PIN_1, INPUT_PULLUP);
    pinMode(SWITCH_PIN_2, INPUT_PULLUP);

    Serial.begin(9600);
}

void loop()
{
    // Read switch states and set flags
    if (digitalRead(SWITCH_PIN_1) == LOW)
    {
        setRedFlag = !setRedFlag;
        delay(200); // Debounce delay
    }

    if (digitalRead(SWITCH_PIN_2) == LOW)
    {
        blinkFlag = !blinkFlag;
        delay(200); // Debounce delay
    }

    // Set LED color based on setRedFlag
    if (setRedFlag)
    {
        fill_solid(leds, NUM_LEDS, CRGB::Red);
    }
    else
    {
        fill_solid(leds, NUM_LEDS, CRGB::Green);
    }

    // Toggle blinking based on blinkFlag
    if (blinkFlag)
    {
        if (!blinkState)
        {
            if (setRedFlag)
            {
                Serial.println("blinkOn Red");
                fill_solid(leds, NUM_LEDS, CRGB::Red);
            }
            else
            {
                Serial.println("blinkOn Green");
                fill_solid(leds, NUM_LEDS, CRGB::Green);
            }
            FastLED.show();
            blinkState = true;
        }
        else
        {
            Serial.println("blinkOff");
            fill_solid(leds, NUM_LEDS, CRGB::Black);
            FastLED.show();
            blinkState = false;
        }
    }
    else
    {
        FastLED.show();
    }

    delay(100); // Add delay for stability
}