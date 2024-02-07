#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>

const char *ssid = "ESP32-Access-Point";
const char *password = "123456789";

const int buttonPin = 21; // GPIO pin where the button is connected
const int switchPin = 26; // GPIO pin where the switch is connected

bool switchState = false;
bool buttonActive = false; // Flag to indicate if the button is active

bool ledGreen = false; // Flag to track LED color

AsyncWebServer server(80);

void handleButtonPress();

void setup()
{
    Serial.begin(115200);

    // Connect to Wi-Fi network with SSID and password
    Serial.print("Setting AP (Access Point)...");
    // Remove the password parameter if you want the Access Point to be open
    WiFi.softAP(ssid, password);

    IPAddress IP = WiFi.softAPIP();
    delay(1000);
    Serial.print("AP IP address: ");
    Serial.println(IP);

    // Setup button pin
    pinMode(buttonPin, INPUT_PULLUP);

    // Setup switch pin
    pinMode(switchPin, INPUT_PULLUP);

    // Route for root / web page
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(200, "text/plain", "Hello, switch and button!"); });

    // Start server
    server.begin();
}

void loop()
{
    // Check switch state
    bool newSwitchState = digitalRead(switchPin) == HIGH;

    // If switch state changes
    if (newSwitchState != switchState)
    {
        switchState = newSwitchState;

        Serial.print("Switch state changed: ");
        Serial.println(switchState);

        // Turn off LEDs and stop sending requests if the switch is off
        if (!switchState)
        {
            HTTPClient http;
            http.begin("http://192.168.4.2/setcolor?hue=0&saturation=0&value=0"); // Turn off LEDs
            int httpResponseCode = http.GET();
            http.end();

            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);
        }
    }

    // Check for button press only if the switch is in the "on" position
    if (switchState)
    {
        // Check for button press
        if (digitalRead(buttonPin) == LOW)
        {
            // Button is pressed
            handleButtonPress();
            delay(1000); // Debounce delay
        }
    }

    // Check if button is still pressed to deactivate the flag
    if (digitalRead(buttonPin) == HIGH && buttonActive)
    {
        buttonActive = false;
    }
}

void handleButtonPress()
{
    buttonActive = true; // Set the flag when the button is pressed
    Serial.println("Button pressed, sending request to change LED color...");

    // Determine LED color based on current state
    int hue, saturation, value;
    if (ledGreen)
    {
        hue = 0; // Red
        saturation = 255;
        value = 255;
        ledGreen = false;
    }
    else
    {
        hue = 85; // Green
        saturation = 255;
        value = 255;
        ledGreen = true;
    }

    // Send a request to ESP2 to change the LED color
    HTTPClient http;
    String url = "http://192.168.4.2/setcolor?hue=" + String(hue) + "&saturation=" + String(saturation) + "&value=" + String(value);
    http.begin(url);
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0)
    {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
    }
    else
    {
        Serial.print("Error on HTTP request. Code: ");
        Serial.println(httpResponseCode);
    }

    http.end();
}
