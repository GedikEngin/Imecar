#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <initializer_list>
#include <EEPROM.h>

#define EEPROM_SIZE 512 // defining eeprom data

struct LedStruct
{
    int startAddress; // address to store in eeprom, makes it easier to navigate and build on later
    int ledID;        // 0-5 led ID
    int fooID;        // 0-4 function to be routed to

    int fooMod;     // modifier for blink interval, auto shutdown time, breathe speed
    int hue;        // 0-255 range for hue (normally 0-360 for degrees, FastLed uses 8bit 0-255)
    int saturation; // 0-255 range for saturation (universal)
    int brightness; // 0-255 range for brightness (normally 0-100, FastLed uses 8 bit 0-255)
};

LedStruct expLed1 = {42, 0, 0, 100, 0, 255, 255};
LedStruct expLed2 = {49, 0, 0, 100, 96, 255, 255};
LedStruct expLed3 = {56, 0, 0, 100, 160, 255, 255};

void writeLedStructToEEPROM(const LedStruct &ledData)
{
    int startAddress = ledData.startAddress; // Use the provided startAddress
    EEPROM.write(startAddress, ledData.ledID);
    EEPROM.write(startAddress + 1, ledData.fooID);
    EEPROM.write(startAddress + 2, ledData.fooMod);
    EEPROM.write(startAddress + 3, ledData.hue);
    EEPROM.write(startAddress + 4, ledData.saturation);
    EEPROM.write(startAddress + 5, ledData.brightness);
    EEPROM.commit();
    Serial.println("Write data to EEPROM at address: " + String(startAddress));
}

void readLedStructFromEEPROM(LedStruct &ledData)
{
    int startAddress = ledData.startAddress; // Use the provided startAddress
    Serial.println("Read data from EEPROM at address:" + String(startAddress));
    Serial.println(static_cast<int>(EEPROM.read(startAddress)));
    Serial.println(static_cast<int>(EEPROM.read(startAddress + 1)));
    Serial.println(static_cast<int>(EEPROM.read(startAddress + 2)));
    Serial.println(static_cast<int>(EEPROM.read(startAddress + 3)));
    Serial.println(static_cast<int>(EEPROM.read(startAddress + 4)));
    Serial.println(static_cast<int>(EEPROM.read(startAddress + 5)));
    // static cast converts one data type to another, i.e. converts byte data from eeprom to int
}

void setup()
{
    Serial.begin(115200);
    EEPROM.begin(EEPROM_SIZE);

    delay(2500);
    Serial.println("starting write");

    writeLedStructToEEPROM(expLed1);
    delay(2500);
    writeLedStructToEEPROM(expLed2);
    delay(2500);
    writeLedStructToEEPROM(expLed3);
    delay(2500);

    readLedStructFromEEPROM(expLed1);
    delay(2500);
    readLedStructFromEEPROM(expLed2);
    delay(2500);
    readLedStructFromEEPROM(expLed3);
    delay(2500);
}

void loop()
{
    // Your main loop code...
}
