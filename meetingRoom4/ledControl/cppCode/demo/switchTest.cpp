#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>

#define Switch1 21 // 22

void setup()
{
    Serial.begin(115200);
    pinMode(Switch1, INPUT_PULLUP);
}

void loop()
{
    if (digitalRead(Switch1) == HIGH)
    {
        Serial.println("high");
    }
    if (digitalRead(Switch1) == LOW)
    {
        Serial.println("low");
    }
}
