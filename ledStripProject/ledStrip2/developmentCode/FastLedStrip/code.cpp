#include <FastLED.h>

// How many leds in your strip?
#define NUM_LEDS 50
#define DATA_PIN 23
#define LED_TYPE WS2812

#define PIN_SIGNAL_BLUE 5
#define PIN_SIGNAL_RED 19
#define PIN_SIGNAL_GREEN 18

int buttonStateRED = 0;
int buttonStateGREEN = 0;
int buttonStateBLUE = 0;

// Define the array of leds
CRGB leds[NUM_LEDS];

void setup()
{
    Serial.begin(115200);
    FastLED.addLeds<LED_TYPE, DATA_PIN, RGB>(leds, NUM_LEDS);

    pinMode(PIN_SIGNAL_RED, INPUT_PULLUP);
    pinMode(PIN_SIGNAL_GREEN, INPUT_PULLUP);
    pinMode(PIN_SIGNAL_BLUE, INPUT_PULLUP);
}

void loop()
{

    buttonStateRED = digitalRead(PIN_SIGNAL_RED);
    buttonStateGREEN = digitalRead(PIN_SIGNAL_GREEN);
    buttonStateBLUE = digitalRead(PIN_SIGNAL_BLUE);

    if (buttonStateRED == LOW)
    {
        FastLED.clear();
        FastLED.show();
        delay(50);
        fill_solid(leds, NUM_LEDS, CHSV(0, 255, 255));
        FastLED.show();
    }

    if (buttonStateGREEN == LOW)
    {
        FastLED.clear();
        FastLED.show();
        delay(50);
        fill_solid(leds, NUM_LEDS, CHSV(96, 255, 255));
        FastLED.show();
    }

    if (buttonStateBLUE == LOW)
    {
        FastLED.clear();
        FastLED.show();
        delay(50);
        fill_solid(leds, NUM_LEDS, CHSV(160, 255, 255));
        FastLED.show();
    }
}