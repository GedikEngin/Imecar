#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>

const char* ssid = "ESP32_AP";
const char* password = "password";
const char* serverAddress = "http://192.168.4.1:8080/esp32/setLeds";

const int switchPin = 14;
const int ledPin = 2;
int switchState = HIGH;
int lastSwitchState = HIGH;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 100;
unsigned long switchPressTime = 0;
const unsigned long holdDuration = 3000; // 3 seconds in milliseconds

void sendHttpRequest(int hue, int saturation, int value) {
  String url = String(serverAddress) + "?hue=" + String(hue) + "&saturation=" + String(saturation) + "&value=" + String(value);
  HTTPClient http;

  Serial.print("Sending HTTP request to: ");
  Serial.println(url);

  http.begin(url);
  int httpCode = http.GET();
  
  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println("HTTP Response: " + payload);
  } else {
    Serial.println("HTTP Request failed");
  }

  http.end();
}

void blink() {
  Serial.println("Blink function called");
}

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

      if (switchState == LOW) { // Switch pressed
        switchPressTime = millis();
      } else { // Switch released
        if (millis() - switchPressTime >= holdDuration) { // Switch held for holdDuration
          blink();
        } else { // Short press, toggle LED state
          digitalWrite(ledPin, !digitalRead(ledPin));
          if (digitalRead(ledPin)) {
            sendHttpRequest(0, 255, 255); // State 1: Hue 0, Saturation 255, Value 255
            Serial.println("State 1");
          } else {
            sendHttpRequest(90, 255, 255); // State 2: Hue 90, Saturation 255, Value 255
            Serial.println("State 2");
          }
        }
      }
    }
  }

  lastSwitchState = reading;
}
