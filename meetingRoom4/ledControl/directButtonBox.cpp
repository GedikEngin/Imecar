#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <HTTPClient.h>

const char *ssid = "ESP32_AP";
const char *password = "password";
const char *ledBarIP = "192.168.4.1";
const int buttonPin = 16;

int commandCount = 0; // Variable to keep track of button presses

void sendRequestToLEDBar(String endpoint)
{
    HTTPClient http;
    String url = "http://" + String(ledBarIP) + endpoint;
    http.begin(url);
    int httpCode = http.GET();
    if (httpCode > 0)
    {
        Serial.printf("HTTP request sent to LED bar, response code: %d\n", httpCode);
    }
    else
    {
        Serial.println("HTTP request failed");
    }
    http.end();
}

void setup()
{
    Serial.begin(9600);
    pinMode(buttonPin, INPUT_PULLUP);
    Serial.println("Connecting to WiFi...");
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi");
}

void loop()
{
    // Check if the button is pressed
    if (digitalRead(buttonPin) == LOW)
    {
        // Increment command count and ensure it stays within 3 (0, 1, 2)
        commandCount = (commandCount + 1) % 3;

        // Determine command based on command count
        String command;
        if (commandCount == 0)
        {
            command = "greenLed";
        }
        else if (commandCount == 1)
        {
            command = "redLed";
        }
        else if (commandCount == 2)
        {
            command = "clearLed";
        }

        // Send HTTP request to trigger LED bar
        Serial.print("Button pressed, sending request to LED bar for command: ");
        Serial.println(command);
        sendRequestToLEDBar("/esp32/setLeds?command=" + command);

        // Delay to debounce the button
        delay(100);
    }
}
