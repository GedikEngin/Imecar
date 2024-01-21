#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <initializer_list>
#include <EEPROM.h>

const int EEPROM_START_ADDRESS = 0; // Adjust the starting address based on your needs
const int NUM_ELEMENTS = 6;         // Adjust the number of elements based on your array size

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

void writeLedStructToEEPROM(const LedStruct &data)
{
    int startAddress = EEPROM_START_ADDRESS + data.ledID * 7; // 7 variables per LedStruct
    EEPROM.write(startAddress, data.ledID);
    EEPROM.write(startAddress + 1, data.fooID);
    EEPROM.write(startAddress + 2, data.red);
    EEPROM.write(startAddress + 3, data.green);
    EEPROM.write(startAddress + 4, data.blue);
    EEPROM.write(startAddress + 5, data.brightness);
    EEPROM.write(startAddress + 6, data.fooMod);
    Serial.println("Write data to EEPROM at address:" + startAddress);
}

void readLedStructFromEEPROM(LedStruct &data)
{
    int startAddress = EEPROM_START_ADDRESS + data.ledID * 7; // 7 variables per LedStruct
    data.ledID = EEPROM.read(startAddress);
    data.fooID = EEPROM.read(startAddress + 1);
    data.red = EEPROM.read(startAddress + 2);
    data.green = EEPROM.read(startAddress + 3);
    data.blue = EEPROM.read(startAddress + 4);
    data.brightness = EEPROM.read(startAddress + 5);
    data.fooMod = EEPROM.read(startAddress + 6);
    Serial.println("Read data from EEPROM at address:" + startAddress);
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
}

void loop()
{
    // Your main loop code...
}
