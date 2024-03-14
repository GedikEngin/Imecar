#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>

const char *ssid = "ESP32_AP";
const char *password = "password";
const char *serverAddressSetLeds = "http://192.168.4.1:8080/esp32/setLeds";

const int switchPin = 9;
int switchState = 0;
int lastSwitchState = HIGH;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 100;

void sendHttpSetLed(int hue, int saturation, int value)
{
  String url = String(serverAddressSetLeds) + "?hue=" + String(hue) + "&saturation=" + String(saturation) + "&value=" + String(value);
  HTTPClient http;

  Serial.print("Sending HTTP request to: ");
  Serial.println(url);

  http.begin(url);
  int httpCode = http.GET();

  if (httpCode > 0)
  {
    String payload = http.getString();
    Serial.println("HTTP Response: " + payload);
  }
  else
  {
    Serial.println("HTTP Request failed");
  }

  http.end();
}

void setup()
{
  Serial.begin(9600);
  pinMode(switchPin, INPUT_PULLUP);

  // Connect to WiFi
  Serial.printf("Connecting to %s ", ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop()
{
  int reading = digitalRead(switchPin);

  if (reading != lastSwitchState)
  {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay)
  {
    if (reading != switchState)
    {
      switchState = reading;

      if (switchState == LOW)
      {
        Serial.println("Red");
        sendHttpSetLed(0, 255, 255); // State 1: Hue 0, Saturation 255, Value 255
      }
      else
      {
        Serial.println("Green");
        sendHttpSetLed(90, 255, 255); // State 2: Hue 90, Saturation 255, Value 255
      }
    }
  }

  lastSwitchState = reading;
}