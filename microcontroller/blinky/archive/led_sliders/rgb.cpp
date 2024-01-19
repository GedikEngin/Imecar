#include <Arduino.h>

// pins
#define PIN_RED 19   // GPIO19
#define PIN_GREEN 18 // GPIO18
#define PIN_BLUE 5   // GPIO05

void setup()
{
    pinMode(PIN_RED, OUTPUT);
    pinMode(PIN_GREEN, OUTPUT);
    pinMode(PIN_BLUE, OUTPUT);
}

void loop()
{ // color code #00C9CC (R = 0, G = 201, B = 204)
    analogWrite(PIN_RED, 0);
    analogWrite(PIN_GREEN, 201);
    analogWrite(PIN_BLUE, 204);

    delay(1000); // keep the color 1 second

    // color code #F7788A (R = 247, G = 120, B = 138)
    analogWrite(PIN_RED, 247);
    analogWrite(PIN_GREEN, 120);
    analogWrite(PIN_BLUE, 138);

    delay(1000); // keep the color 1 second

    // color code #34A853 (R = 52, G = 168, B = 83)
    analogWrite(PIN_RED, 52);
    analogWrite(PIN_GREEN, 168);
    analogWrite(PIN_BLUE, 83);

    delay(1000); // keep the color 1 second
}
