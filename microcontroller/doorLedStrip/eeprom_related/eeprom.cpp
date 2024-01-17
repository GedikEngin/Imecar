#include <EEPROM.h>
#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>

// Define the size of the EEPROM data
#define EEPROM_SIZE 512

void writeDataToEEPROM()
{
    // Write data to EEPROM at address 0
    int valueToWrite = 42;
    EEPROM.write(0, valueToWrite);

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
