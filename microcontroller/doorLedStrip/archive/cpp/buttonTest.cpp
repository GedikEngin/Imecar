#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <iostream>
#include <HTTPClient.h>

// pins

#define PIN_RED 19   // GPIO05
#define PIN_GREEN 18 // GPIO18
#define PIN_BLUE 5   // GPIO19

#define PIN_SIGNAL_RED 23   // GPIO23
#define PIN_SIGNAL_GREEN 22 // GPIO22
#define PIN_SIGNAL_BLUE 21  // GPIO21

int buttonStateRED = 0;
int buttonStateGREEN = 0;
int buttonStateBLUE = 0;

void setup()
{
    Serial.begin(115200);
    pinMode(PIN_RED, OUTPUT);
    pinMode(PIN_GREEN, OUTPUT);
    pinMode(PIN_BLUE, OUTPUT);
    pinMode(PIN_SIGNAL_RED, INPUT_PULLUP);
    pinMode(PIN_SIGNAL_GREEN, INPUT_PULLUP);
    pinMode(PIN_SIGNAL_BLUE, INPUT_PULLUP);
    // analogWrite(PIN_RED, 0);
    // analogWrite(PIN_GREEN, 255);
    // analogWrite(PIN_BLUE, 255);
}

void loop()
{

    buttonStateRED = digitalRead(PIN_SIGNAL_RED);
    buttonStateGREEN = digitalRead(PIN_SIGNAL_GREEN);
    buttonStateBLUE = digitalRead(PIN_SIGNAL_BLUE);

    if (buttonStateRED == LOW)
    {
        // Switch off the led
        digitalWrite(PIN_RED, HIGH);
    }
    else
    {
        // Switch on the led
        digitalWrite(PIN_RED, LOW);
    }

    if (buttonStateGREEN == LOW)
    {
        // Switch off the led
        digitalWrite(PIN_GREEN, HIGH);
    }
    else
    {
        // Switch on the led
        digitalWrite(PIN_GREEN, LOW);
    }

    if (buttonStateBLUE == LOW)
    {
        // Switch off the led
        digitalWrite(PIN_BLUE, HIGH);
    }
    else
    {
        // Switch on the led
        digitalWrite(PIN_BLUE, LOW);
    }
}
