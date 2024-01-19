#include <EEPROM.h>
#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <iostream>

// Define the size of the EEPROM data
#define EEPROM_SIZE 512

void writeDataToEEPROM()
{
    // Write data to EEPROM:

    // wont work as you cannot write a stirng into a byte space memory

    // show led command @ address 0
    // String ledDisplay = "FastLED.show();";
    // EEPROM.write(0, ledDisplay);

    // // setting ledNum to red green blue variables @ address 1
    // String ledConfig = "leds[ledNum] = CRGB(ledRed, ledGreen, ledBlue);";
    // EEPROM.write(1, ledConfig);

    // led red val @ address 2
    int ledRed = 255;
    EEPROM.write(2, ledRed);

    // led green val @ address 3
    int ledGreen = 255;
    EEPROM.write(3, ledGreen);

    // led blue val @ address 4
    int ledBlue = 255;
    EEPROM.write(4, ledBlue);

    // led num val @ address 5
    int ledNum = 0;
    EEPROM.write(5, ledNum);

    // Commit the data to flash
    EEPROM.commit();
    Serial.println("Data written to EEPROM.");
}

void readDataFromEEPROM()
{
    // Read data from EEPROM at address 0
    int readValue = EEPROM.read(0);

    Serial.print("Read data from EEPROM: ");
    Serial.println(readValue);
}

void setup()
{
    Serial.begin(115200);

    // Initialize EEPROM with the specified size
    EEPROM.begin(EEPROM_SIZE);

    // Write data to EEPROM
    // writeDataToEEPROM();

    // Read data from EEPROM
    readDataFromEEPROM();
}

void loop()
{
    // Your main code here
}
