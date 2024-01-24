/// @file    Blink.ino
/// @brief   Blink the first LED of an LED strip
/// @example Blink.ino

#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <initializer_list>
#include <EEPROM.h>
#include <iostream>

#define NUM_LEDS 72  // Number of LEDs
#define DATA_PIN 3   // Data pin for LEDs
CRGB leds[NUM_LEDS]; // Array for LED colors

// Replace with your network credentials
const char *ssid = "MW42V_A8CA";
const char *password = "91014264";

// Create an instance of the server
AsyncWebServer server(80);

void setup()
{
    Serial.begin(115200);
    // Initialize LEDs
    FastLED.addLeds<WS2812, DATA_PIN, GRB>(leds, NUM_LEDS);
    FastLED.setBrightness(50);

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");

    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Methods", "GET, POST");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Headers", "Content-Type");

    // Define routes
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(200, "text/plain", "Hello from ESP32!"); });

    server.on("/triggerESP", HTTP_GET, [](AsyncWebServerRequest *request)
              {
        Serial.println("TriggerESP32 route accessed");

        // Perform the action you want here. For example, toggle an LED, etc.

        request->send(200, "text/plain", "ESP32 has responded to trigger"); });

    server.begin();

    // Start the server
    server.begin();
    Serial.println("Server started");
}

void loop()
{
    // Nothing needed here for now
}
