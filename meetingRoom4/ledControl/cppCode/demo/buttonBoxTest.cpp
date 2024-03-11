#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>

const char* ssid = "ESP32_AP";
const char* password = "password";

const int switchPin = 14;
const int ledPin = 2;
int switchState = 0;
int lastSwitchState = HIGH;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50;

void setup() {
  Serial.begin(9600);
  pinMode(switchPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);

  // Connect to WiFi
  Serial.printf("Connecting to %s ", ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  int reading = digitalRead(switchPin);

  if (reading != lastSwitchState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != switchState) {
      switchState = reading;

      if (switchState == LOW) {
        Serial.println("State 1");
        digitalWrite(ledPin, HIGH);
      } else {
        Serial.println("State 2");
        digitalWrite(ledPin, LOW);
      }
    }
  }

  lastSwitchState = reading;
}
