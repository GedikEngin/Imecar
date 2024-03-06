#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <FastLED.h>

#define LED_PIN 3        // Pin connected to the LED strip
#define NUM_LEDS 50      // Number of LEDs in the strip
#define LED_TYPE WS2812B // LED type
#define COLOR_ORDER RGB  // LED color order

const char *ssid = "ESP32_AP";     // Name of the WiFi network
const char *password = "password"; // Password for the WiFi network
WebServer server(80);              // Create a WebServer object listening on port 80
CRGB leds[NUM_LEDS];               // Define the LED array

unsigned long wifiPreviousMillis = 0;
const long wifiInterval = 1000; // Blink interval in milliseconds
int connectionBlinkCount = 0;   // Counter for green blinking
bool wifiConnected = false;
bool connectionSignal = false; // Flag to indicate if a connection has been established

void setup()
{
    Serial.begin(115200); // Initialize serial communication
    delay(1000);          // Give time for serial monitor to initialize

    // Set up WiFi access point
    WiFi.softAP(ssid, password);

    // Print IP address of the access point
    Serial.print("Access Point IP address: ");
    Serial.println(WiFi.softAPIP());

    // Initialize FastLED library
    FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS);
    fill_solid(leds, NUM_LEDS, CRGB::Black);
    FastLED.show();

    // Route to handle HTTP POST requests for /esp32/setLeds
    server.on("/esp32/setLeds", HTTP_POST, []()
              {
        // Handle the request
        String hueStr = server.arg("hue");
        String satStr = server.arg("saturation");
        String valStr = server.arg("value");

        int hue = hueStr.toInt();
        int sat = satStr.toInt();
        int val = valStr.toInt();

        CRGB color = CHSV(hue, sat, val); // Convert HSV to RGB color
        fill_solid(leds, NUM_LEDS, color);
        FastLED.show();

        server.send(200, "application/json", "{\"message\": \"LEDs set to specified color\"}"); });

    // Start the server
    server.begin();
}

void loop()
{
    // Handle client requests
    server.handleClient();

    // Check WiFi connection status
    if (WiFi.softAPgetStationNum() > 0)
    {
        wifiConnected = true;
        unsigned long currentMillis = millis();
        if (!connectionSignal)
        {
            if (currentMillis - wifiPreviousMillis < wifiInterval && connectionBlinkCount < 3)
            {
                if (currentMillis - wifiPreviousMillis < wifiInterval / 2)
                {
                    fill_solid(leds, NUM_LEDS, CRGB::Green);
                }
                else
                {
                    fill_solid(leds, NUM_LEDS, CRGB::Black);
                }
                FastLED.show();
            }
            else
            {
                wifiPreviousMillis = currentMillis;
                connectionBlinkCount++;
                if (connectionBlinkCount >= 3)
                {
                    connectionSignal = true; // Connection established
                }
            }
        }
    }
    else
    {
        wifiConnected = false;
        // Blink LEDs blue if WiFi is not connected
        unsigned long wifiCurrentMillis = millis();
        if (wifiCurrentMillis - wifiPreviousMillis >= wifiInterval)
        {
            wifiPreviousMillis = wifiCurrentMillis;
            if (leds[0] == CRGB::Blue)
            {
                fill_solid(leds, NUM_LEDS, CRGB::Black);
            }
            else
            {
                fill_solid(leds, NUM_LEDS, CRGB::Blue);
            }
            FastLED.show();
            connectionSignal = false; // Reset the connection signal
            connectionBlinkCount = 0; // Reset green blink count
        }
    }

    // Check for serial input
    if (Serial.available() > 0)
    {                                            // Check if there's data available to read
        String received = Serial.readString();   // Read the received data
        Serial.println("Received: " + received); // Print the received data to serial monitor
        if (received.indexOf("hello") != -1)
        {                                        // Check if the received data contains "hello"
            Serial.println("Hello to you too!"); // If "hello" is found, print "Hello to you too!" to serial monitor
            Serial.print("SoftAP IP Address: ");
            Serial.println(WiFi.softAPIP()); // Print the SoftAP IP address
        }
    }
    delay(100); // Delay to avoid reading too fast
}
