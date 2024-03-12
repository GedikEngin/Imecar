#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>

// WiFi credentials
const char *ssid = "ESP32_AP";     // Replace with your WiFi SSID
const char *password = "password"; // Replace with your WiFi password

// IP of the linked LED / the IP of the ESP the button box is in the same room with
const char *microEspIP = "192.168.4.1:8080";
const char *serverIP = "192.168.4.3:8080";

// GPIO pin where the toggle switch and blink is connected
const int switchPin = 22;
const int blinkPin = 21;

// Switch and blink states
bool switchState = false;
bool lastSwitchState = false;

bool blinkState = false;
bool lastBlinkState = false;

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
    }
    else if (command == "blinkOn")
    {
    }
    else if (command == "blinkOff")
    {
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

void setLedsButtonBoxBlink(String command, bool lastSwitchState)
{
    Serial.println("Sending the following instructions to server: " + command);

    HTTPClient http;
    String url = "http://" + String(serverIP) + "/led/toggleBlinkButtonBox";
    Serial.println("URL: " + url);
    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    String payload = "{\"command\": \"" + command + "\", \"lastSwitchState\": \"" + (lastSwitchState ? "red" : "green") + "\", \"microEspIP\": \"" + String(microEspIP) + "\"}";

    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0)
    {
        String response = http.getString();
        Serial.println("Response code: " + String(httpResponseCode));
        Serial.println("Response: " + response);
    }
    else
    {
        Serial.print("Error on sending POST request: ");
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

    // Connect to WiFi
    connectToWiFi();
}

void loop()
{
    // Read the state of the switch
    switchState = digitalRead(switchPin);
    blinkState = digitalRead(blinkPin);

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
    if (blinkState != lastBlinkState)
    {
        if (blinkState == HIGH)
        {
            // Switch is ON, send payload for LED ON
            Serial.println("startBlink");
            setLedsButtonBoxBlink("startBlink", lastSwitchState);
        }
        else
        {
            // Switch is OFF, send payload for LED OFF
            Serial.println("stopBlink");
            setLedsButtonBoxBlink("stopBlink", lastSwitchState);
        }
        lastBlinkState = blinkState;
    }

    delay(200); // Adjust delay as needed for debounce or responsiveness
}
