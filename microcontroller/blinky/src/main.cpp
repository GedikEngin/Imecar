#include <Arduino.h>

// pins
#define PIN_RED 21   // GPIO21
#define PIN_GREEN 19 // GPIO19
#define PIN_BLUE 18  // GPIO18

void setup()
{
  pinMode(PIN_RED, OUTPUT);
  pinMode(PIN_GREEN, OUTPUT);
  pinMode(PIN_BLUE, OUTPUT);
}

void loop()
{
  digitalWrite(PIN_RED, HIGH); // turn the LED on
  delay(500);                  // wait for 500 milliseconds
  digitalWrite(PIN_RED, LOW);  // turn the LED off
  delay(500);                  // wait for 500 milliseconds

  digitalWrite(PIN_BLUE, HIGH); // turn the LED on
  delay(500);                   // wait for 500 milliseconds
  digitalWrite(PIN_BLUE, LOW);  // turn the LED off
  delay(500);                   // wait for 500 milliseconds

  digitalWrite(PIN_GREEN, HIGH); // turn the LED on
  delay(500);                    // wait for 500 milliseconds
  digitalWrite(PIN_GREEN, LOW);  // turn the LED off
  delay(500);                    // wait for 500 milliseconds
}
// color code #00C9CC (R = 0, G = 201, B = 204)
// analogWrite(PIN_RED, 0);
// analogWrite(PIN_GREEN, 201);
// analogWrite(PIN_BLUE, 204);

// delay(1000); // keep the color 1 second

// // color code #F7788A (R = 247, G = 120, B = 138)
// analogWrite(PIN_RED, 247);
// analogWrite(PIN_GREEN, 120);
// analogWrite(PIN_BLUE, 138);

// delay(1000); // keep the color 1 second

// // color code #34A853 (R = 52, G = 168, B = 83)
// analogWrite(PIN_RED, 52);
// analogWrite(PIN_GREEN, 168);
// analogWrite(PIN_BLUE, 83);

// delay(1000); // keep the color 1 second
//
