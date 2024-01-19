#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <iostream>

void setup()
{
    Serial.begin(115200);

    // Set WiFi to station mode and disconnect from an AP if it was previously connected
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();

    Serial.println("Scanning for networks...");
    int networksFound = WiFi.scanNetworks();

    if (networksFound == 0)
    {
        Serial.println("No networks found");
    }
    else
    {
        Serial.println("Networks found:");
        for (int i = 0; i < networksFound; ++i)
        {
            Serial.print(WiFi.SSID(i));
            Serial.print(" (");
            Serial.print(WiFi.RSSI(i));
            Serial.println(")");
        }
    }
}

void loop()
{
    // Nothing to do here
}
