#include <Arduino.h>
#include <IRremote.h>

#define PIN_RECEIVER 16 // Signal Pin of IR receiver
IRrecv receiver(PIN_RECEIVER);

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println("Hello, ESP32!");
  receiver.enableIRIn(); // Start the receiver
}

void loop()
{

  // Checks received an IR signal
  if (receiver.decode)
  {
    Serial.println((receiver.decodedIRData.command));
    receiver.resume(); // Receive the next value
  }
  delay(10); // this speeds up the simulation
}
