#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <initializer_list>
#include <EEPROM.h>

const int EEPROM_START_ADDRESS = 0; // Adjust the starting address based on your needs
const int NUM_ELEMENTS = 6;         // Adjust the number of elements based on your array size

// Number of LEDs in a strip
#define NUM_LEDS 6
#define DATA_PIN 3 // GPIO03
CRGB leds[NUM_LEDS];

struct LedStruct
{
    int ledID;
    int fooID;
    int red;
    int green;
    int blue;
    int brightness;
    int fooMod; // modifier for blink interval, auto shutdown time, breathe speed
};

LedStruct ledData1 = {0, 1, 255, 0, 0, 100, 5}; // LED 0, Foo 1
LedStruct ledData2 = {1, 2, 0, 255, 0, 50, 10}; // LED 1, Foo 2
LedStruct ledData3 = {2, 3, 0, 0, 255, 75, 7};  // LED 2, Foo 3

void blinkEffect(const LedStruct &ledData)
{
    // Preparing leds
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);
    leds[ledData.ledID] = CRGB(0, 0, 0);

    // Led assignments

    // Repeating loop
    unsigned long timerMillis = 0;
    while (millis() - timerMillis < int(ledData.fooMod))
    {
        leds[ledData.ledID] = CRGB(0, 0, 0);
        delay(ledData.fooMod);
        leds[ledData.ledID] = CRGB(ledData.red, ledData.green, ledData.blue);
        FastLED.show();
        timerMillis = millis();
    }
}

void printEEPROMContent()
{
    Serial.println("EEPROM Content:");

    for (int i = 0; i < EEPROM.length(); ++i)
    {
        Serial.print("index" + i + EEPROM.read(i));
        Serial.print(" ");
    }

    Serial.println();
}

void setup()
{
    Serial.begin(115200);
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);

    // Your other setup code...

    // // Write the array to EEPROM
    // writeLedStructToEEPROM(ledData1);
    // writeLedStructToEEPROM(ledData2);
    // writeLedStructToEEPROM(ledData3);

    // // Read the array back from EEPROM
    // readLedStructFromEEPROM(ledData1);
    // printEEPROMContent(); // Print EEPROM content
    // blinkEffect(ledData1);
    // delay(5000);
    // readLedStructFromEEPROM(ledData2);
    // printEEPROMContent(); // Print EEPROM content
    // blinkEffect(ledData2);
    // delay(5000);
    // readLedStructFromEEPROM(ledData3);
    // printEEPROMContent(); // Print EEPROM content
    // blinkEffect(ledData3);

    // Print the read array to Serial Monitor
}

void loop()
{
    // Your main loop code...
}

// look at using hsvs to manage less params