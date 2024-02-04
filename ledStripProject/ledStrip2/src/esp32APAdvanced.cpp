#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>

const char *ssid = "ESP32-Access-Point";
const char *password = "123456789";

const int buttonPin = 19; // GPIO pin where the button is connected

void handleButtonPress();

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

    // Setup button pin
    pinMode(buttonPin, INPUT_PULLUP);
}

void loop()
{
    // Check for button press
    if (digitalRead(buttonPin) == LOW)
    {
        // Button is pressed
        handleButtonPress();
        delay(1000); // Debounce delay
    }
}

void handleButtonPress()
{
    Serial.println("Button pressed, sending request to change LED color...");

    // Send a request to ESP2 to change the LED color to blue
    HTTPClient http;
    http.begin("http://192.168.4.2/setcolor?hue=170&saturation=255&value=255"); // Blue color in HSV
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0)
    {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
    }
    else
    {
        Serial.print("Error on HTTP request. Code: ");
        Serial.println(httpResponseCode);
    }

    http.end();
}
