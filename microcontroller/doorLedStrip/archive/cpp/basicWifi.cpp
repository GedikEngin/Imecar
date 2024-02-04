#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <HTTPClient.h>

// Replace with your network credentials
const char *ssid = "EnginAW";
const char *password = "5439148075";

void initWiFi()
{
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi ..");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print('.');
        delay(1000);
    }
    Serial.println(WiFi.localIP());
}

void setup()
{
    Serial.begin(115200);
    initWiFi();
    Serial.print("RRSI: ");
    Serial.println(WiFi.RSSI());
}

void loop()
{
    // put your main code here, to run repeatedly:
}