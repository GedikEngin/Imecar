#pragma region config
/// @file    Blink.ino
/// @brief   Blink the first LED of an LED strip
/// @example Blink.ino

#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <initializer_list>
#include <EEPROM.h>
#include <iostream>
#include <HTTPClient.h>

// led init
#define NUM_LEDS 72  // Symbolic constant for the number of LEDs
#define DATA_PIN 3   // Symbolic constant for the data pin (GPIO03)
CRGB leds[NUM_LEDS]; // Array to store color information for each LED

struct LedStruct
{
    int startAddress; // address to store in eeprom, makes it easier to navigate and build on later, documentation exists
    int ledID;        // 0-5 led ID
    int fooID;        // 0-5 function to be routed to

    int fooMod;     // 0 -255, modifier for blink interval, auto shutdown time, breathe speed
    int hue;        // 0-255 range for hue (normally 0-360 for degrees, FastLed uses 8bit 0-255)
    int saturation; // 0-255 range for saturation (universal)
    int brightness; // 0-255 range for brightness (normally 0-100, FastLed uses 8 bit 0-255)
};

// Replace with your network credentials
const char *ssid = "MW42V_A8CA";
const char *password = "91014264";

const char *PARAM_INPUT = "value";

// Create AsyncWebServer object on port 80      
AsyncWebServer server(80);

#pragma endregion config

#pragma region website

const char index_html[] PROGMEM = R"rawliteral(
)rawliteral";

#pragma endregion website

void priorityEvent(void *parameter)
{
    LedStruct *ledData = (LedStruct *)parameter;

    Serial.print("LED Data - Start Address: ");
    Serial.println(ledData->startAddress);

    Serial.print("LED ID: ");
    Serial.println(ledData->ledID);

    Serial.print("Function ID: ");
    Serial.println(ledData->fooID);

    Serial.print("Function Modifier: ");
    Serial.println(ledData->fooMod);

    Serial.print("Hue: ");
    Serial.println(ledData->hue);

    Serial.print("Saturation: ");
    Serial.println(ledData->saturation);

    Serial.print("Brightness: ");
    Serial.println(ledData->brightness);

    Serial.println("Performing task operations...");

    leds[NUM_LEDS] = CHSV(ledData->hue, ledData->saturation, ledData->brightness);
    FastLED.show();

    vTaskDelete(NULL); // Delete the task when done
}

void ledBlink(void *parameter)
{
    LedStruct *ledData = (LedStruct *)parameter;
    unsigned long previousMillis = 0; // will store the last time the LED was updated

    // loop that runs forever
    while (1)
    {
        unsigned long currentMillis = millis();

        if (currentMillis - previousMillis >= ledData->fooMod * 10)
        {
            // save the last time the LED was toggled
            previousMillis = currentMillis;

            // if the LED is off turn it on and vice versa
            if (leds[ledData->ledID] == CHSV(ledData->hue, ledData->saturation, 0))
            {
                leds[ledData->ledID] = CHSV(ledData->hue, ledData->saturation, ledData->brightness);
            }
            else
            {
                leds[ledData->ledID] = CHSV(ledData->hue, ledData->saturation, 0);
            }

            FastLED.show();
        }
        vTaskDelay(1); // Yield to other tasks
    }

    vTaskDelete(NULL);
    delete ledData; // Free the memory when done
}

void ledBreath(void *parameter)
{
    LedStruct *ledData = (LedStruct *)parameter;
    static uint8_t hue = 0;

    for (int i = 0; i < NUM_LEDS; ++i)
    {
        // Set each LED to a color based on the current hue
        leds[i] = CHSV(hue, 255, 255);
        FastLED.show();
        delay(50);
        hue += 10; // Increment the hue for the next LED
    }

    FastLED.clear();
    delay(250); // Pause between cycles
                // rest of the code...
}

void ledSolid(void *parameter)
{
    LedStruct *ledData = (LedStruct *)parameter;

    // rest of the code...
}

void ledTimeout(void *parameter)
{
    LedStruct *ledData = (LedStruct *)parameter;

    // rest of the code...
}

void handleFormSubmit(AsyncWebServerRequest *request)
{
    // Extract form data from the request
    String ledID = request->arg("ledID");
    String fooID = request->arg("fooID");
    String fooMod = request->arg("fooMod");
    String hue = request->arg("hue");
    String saturation = request->arg("saturation");
    String brightness = request->arg("brightness");

    // Convert the form data to integers
    int ledIDInt = ledID.toInt();
    int fooIDInt = fooID.toInt();
    int fooModInt = fooMod.toInt();
    int hueInt = hue.toInt();
    int saturationInt = saturation.toInt();
    int brightnessInt = brightness.toInt();

    // Create a LedStruct instance with the received data
    LedStruct *ledData = new LedStruct{
        .startAddress = 42 * fooIDInt + ledIDInt * 7,
        .ledID = ledIDInt,
        .fooID = fooIDInt,
        .fooMod = fooModInt,
        .hue = hueInt,
        .saturation = saturationInt,
        .brightness = brightnessInt};

    // Call the appropriate function based on fooID
    if (fooIDInt == 0)
    {
        xTaskCreate(priorityEvent, "PriorityTask", 2048, ledData, 1, NULL);
    }
    else if (fooIDInt == 1)
    {
        // Create a new task for the LED
        xTaskCreate(ledBlink, "BlinkTask", 2048, ledData, 2, NULL);
    }
    else if (fooIDInt == 2)
    {
        ledBreath(ledData);
    }
    else if (fooIDInt == 3)
    {
        ledSolid(ledData);
    }
    else if (fooIDInt == 4)
    {
        ledTimeout(ledData);
    }

    // Send a response to the client
    request->send(200, "text/plain", "Form submitted successfully");
}

void setup()
{
    // Serial port for debugging purposes
    Serial.begin(115200);

    // defining led type
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi..");
    }

    // Print ESP Local IP Address
    Serial.println(WiFi.localIP());

    // Serve the HTML content at the root URL
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send_P(200, "text/html", index_html); });

    // Handle form submission
    server.on("/submit", HTTP_POST, [](AsyncWebServerRequest *request)
              { handleFormSubmit(request); });

    server.on("/toggleLed", HTTP_POST, [](AsyncWebServerRequest *request)
              { handleFormSubmit(request); });

    // Begin server
    server.begin();
}

void loop()
{
}
