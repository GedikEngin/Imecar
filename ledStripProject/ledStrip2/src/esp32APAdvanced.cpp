#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>

const char *ssid = "ESP32-Access-Point";
const char *password = "123456789";

const int buttonPin = 19; // GPIO pin where the button is connected
const int switchPin = 23; // GPIO pin where the switch is connected

bool switchState = false;
bool buttonPressed = false;

void handleButtonPress();

AsyncWebServer server(80);

void setup()
{
    Serial.begin(115200);

    // Connect to Wi-Fi network with SSID and password
    Serial.print("Setting AP (Access Point)...");
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
    // Check for button press
    if (digitalRead(buttonPin) == LOW)
    {
        // Button is pressed
        handleButtonPress();
        delay(1000); // Debounce delay
    }

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

    // Reset the buttonPressed flag after a delay
    if (buttonPressed)
    {
        delay(100); // Adjust the delay based on your needs
        buttonPressed = false;
    }

    // Reset the buttonPressed flag after a delay
    if (buttonPressed)
    {
        delay(100); // Adjust the delay based on your needs
        buttonPressed = false;
    }
}

void handleButtonPress()
{
    if (switchState && !buttonPressed)
    {
        Serial.println("Button pressed, sending request to change LED color...");

        // Send a request to ESP2 to change the LED color to blue
        HTTPClient http;
        http.begin("http://192.168.4.2/setcolor?hue=170&saturation=255&value=255"); // Blue color in HSV
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

        // Set the buttonPressed flag to true
        buttonPressed = true;
    }
}
