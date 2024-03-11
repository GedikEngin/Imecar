#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>

const char *ssid = "ESP32_AP";
const char *password = "password";
const char *microEspIP = "192.168.4.1:8080"; // ip of the linked led / the ip of the esp the button box is in the same room with

void setup()
{
    Serial.begin(9600);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }

    HTTPClient http;
    http.begin("http://192.168.4.3:8080/led/setLedsButtonBox"); // Replace <Your-Server-IP> with your actual server IP address
    http.addHeader("Content-Type", "application/json");

    // Example payload, replace with your actual payload
    String payload = "{\"hue\": 255, \"saturation\": 100, \"value\": 100, \"microEspIP\": \"" + String(microEspIP) + "\"}";

    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0)
    {
        String response = http.getString();
        Serial.println(httpResponseCode);
        Serial.println(response);
    }
    else
    {
        Serial.print("Error on sending POST: ");
        Serial.println(httpResponseCode);
    }

    http.end();
}

void loop()
{
    // Your loop code here
}
