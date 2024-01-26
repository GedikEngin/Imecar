#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <FastLED.h>
#include <HTTPClient.h>

#define NUM_LEDS 72
#define DATA_PIN 3
CRGB leds[NUM_LEDS];

const char *ssid = "MW42V_A8CA";
const char *password = "91014264";

AsyncWebServer server(80);

struct LedStruct
{
    int ledID;
    String fooDropdown;
    int fooMod;
    int hue;
    int saturation;
    int brightness;
};

void setupLED()
{
    FastLED.addLeds<WS2812, DATA_PIN, GRB>(leds, NUM_LEDS);
}

void controlLED(LedStruct ledData)
{
    // Handle LED control based on the received data
    // You can modify this function according to your requirements
    // For now, let's just print the received data to Serial
    Serial.print("Received LED Data - ID: ");
    Serial.print(ledData.ledID);
    Serial.print(", Dropdown: ");
    Serial.print(ledData.fooDropdown);
    Serial.print(", Mod: ");
    Serial.print(ledData.fooMod);
    Serial.print(", Hue: ");
    Serial.print(ledData.hue);
    Serial.print(", Saturation: ");
    Serial.print(ledData.saturation);
    Serial.print(", Brightness: ");
    Serial.println(ledData.brightness);

    // Your LED control logic here
    // Example: Set LED color based on received data
    leds[ledData.ledID] = CHSV(ledData.hue, ledData.saturation, ledData.brightness);
    FastLED.show();
}

void handleJsonRequest(AsyncWebServerRequest *request)
{
    String json;
    if (request->hasParam("plain", true))
    {
        json = request->getParam("plain", true)->value();
        Serial.println("Received JSON: " + json);

        DynamicJsonDocument doc(1024);
        deserializeJson(doc, json);

        LedStruct ledData = {
            .ledID = doc["ledID"],
            .fooDropdown = doc["fooDropdown"].as<String>(),
            .fooMod = doc["fooMod"],
            .hue = doc["hue"],
            .saturation = doc["saturation"],
            .brightness = doc["brightness"]};

        controlLED(ledData);

        request->send(200, "text/plain", "LED control command received");
    }
    else
    {
        request->send(400, "text/plain", "Bad Request");
    }
}

void setup()
{
    Serial.begin(115200);
    setupLED();

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.print("Connected to WiFi. IP Address: ");
    Serial.println(WiFi.localIP());

    server.on("/send", HTTP_POST, handleJsonRequest);

    server.begin();
}

void loop()
{
    // Your loop code, if needed
}
