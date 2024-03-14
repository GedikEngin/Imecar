#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>
#include <iostream>

// WiFi/Connections

// const char *ssid = "ESP32_AP";
// const char *password = "password";
const char *ssid = "MW42V_A8CA";
const char *password = "91014264"; // own

const char *microEspIP = "192.168.4.1:8080";

// const char *serverIP = "192.168.4.3:8080";
const char *serverIP = "192.168.1.154:8080"; // own

// Pins
const int switchPin = 22;
const int animationPin = 21;

// Switch and blink states
int animationState = 0;
int switchState = 0;

int lastAnimationState = HIGH;
int lastSwitchState = HIGH;

// Function to connect to WiFi
void connectToWiFi()
{
    Serial.println("Connecting to WiFi...");

    WiFi.begin(ssid, password);

    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 10)
    {
        delay(1000);
        Serial.print(".");
        attempts++;
    }

    if (WiFi.status() == WL_CONNECTED)
    {
        Serial.println("");
        Serial.println("WiFi connected!");
        Serial.print("IP Address: ");
        Serial.println(WiFi.localIP());
    }
    else
    {
        Serial.println("");
        Serial.println("Failed to connect to WiFi. Please check your credentials or router.");
    }
}

// Function to send payload to server
void setLedsButtonBoxSwitch(String command)
{
    Serial.println("Sending the following instructions to server: " + command);

    HTTPClient http;
    http.begin("http://" + String(serverIP) + "/led/setLedsButtonBox");
    http.addHeader("Content-Type", "application/json");

    String payload = "";

    if (command == "redSwitch")
    {
        payload = "{\"hue\": 0, \"saturation\": 255, \"value\": 255, \"microEspIP\": \"" + String(microEspIP) + "\"}";
    }
    else if (command == "greenSwitch")
    {
        payload = "{\"hue\": 94, \"saturation\": 255, \"value\": 255, \"microEspIP\": \"" + String(microEspIP) + "\"}";
    };

    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0)
    {
        String response = http.getString();
        Serial.println("Response code: " + String(httpResponseCode));
        Serial.println("Response: " + response);
    }
    else
    {
        Serial.print("Error on sending POST: ");
        Serial.println(httpResponseCode);
    }

    http.end();
}

void startAnimationButtonBox()
{
    Serial.println("sending start animation command");
    HTTPClient http;
    http.begin("http://" + String(serverIP) + "/led/startAnimationButtonBox?microEspIP=" + microEspIP);
    int httpResponseCode = http.GET();
    if (httpResponseCode > 0)
    {
        Serial.println("Triggered server action successfully");
    }
    else
    {
        Serial.print("Error triggering server action: ");
        Serial.println(httpResponseCode);
    }
    http.end();
}

void setup()
{
    Serial.begin(9600);
    delay(1000); // Delay to allow serial monitor to initialize

    // Initialize switch pin
    pinMode(switchPin, INPUT_PULLUP);
    pinMode(animationPin, INPUT_PULLUP);

    // Connect to WiFi
    connectToWiFi();
}

void loop()
{
    // Read the state of the switch
    switchState = digitalRead(switchPin);
    animationState = digitalRead(animationPin);

    // Check if the state of the switch has changed
    if (switchState != lastSwitchState)
    {
        if (switchState == HIGH)
        {
            // Switch is ON, send payload for LED ON
            setLedsButtonBoxSwitch("redSwitch");
        }
        else
        {
            // Switch is OFF, send payload for LED OFF
            setLedsButtonBoxSwitch("greenSwitch");
        }
        lastSwitchState = switchState;
    }

    // Check if the state of the blink has changed
    if (animationState != lastAnimationState)
    {
        if (animationState == HIGH)
        {
            Serial.println("animation trigger is on");
            startAnimationButtonBox();
        }
        else
        {
            Serial.println("animation trigger is off");
        }
        lastAnimationState = animationState;
    }

    delay(200); // Adjust delay as needed for debounce or responsiveness
}
