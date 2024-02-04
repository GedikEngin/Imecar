#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <HTTPClient.h>

const char *ssid = "ESP32-Access-Point";
const char *password = "123456789";

void setup()
{
    Serial.begin(115200);

    // Connect to Wi-Fi network with SSID and password
    Serial.print("Setting AP (Access Point)...");
    // Remove the password parameter if you want the Access Point to be open
    WiFi.softAP(ssid, password);

    IPAddress IP = WiFi.softAPIP();
    delay(1000);
    Serial.print("AP IP address: ");
    Serial.println(IP);
}

void loop()
{
}
