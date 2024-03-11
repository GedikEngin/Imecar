#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>

#define DATA_PIN 3
#define NUM_LEDS 50
#define LED_TYPE WS2812

CRGB leds[NUM_LEDS];

void setup()
{

  Serial.begin(115200);
  FastLED.addLeds<LED_TYPE, DATA_PIN, RGB>(leds, NUM_LEDS);

  // starts cycling back in black
  for (int i = 0; i < 10; ++i)
  {

    // Set all LEDs to red
    fill_solid(leds, NUM_LEDS, CRGB::Red);
    FastLED.show();
    delay(1000); // 1 second delay

    // Set all LEDs to blue
    fill_solid(leds, NUM_LEDS, CRGB::Blue);
    FastLED.show();
    delay(1000); // 1 second delay
  }

  FastLED.clear();
  FastLED.show();
}

void loop()
{
}