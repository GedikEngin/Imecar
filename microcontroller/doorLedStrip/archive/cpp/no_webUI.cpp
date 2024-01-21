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

// eeprom address 0 = led0 blink

// eeprom address 6 = led 0 cycle param

// Replace with your network credentials
const char *ssid = "MW42V_A8CA";
const char *password = "91014264";

// Number of LEDs in a strip
#define NUM_LEDS 6
#define DATA_PIN 3 // GPIO03

// RGB variables
int redValue = 0;
int greenValue = 0;
int blueValue = 0;

// number of leds
CRGB leds[NUM_LEDS];

// timer vars
unsigned long wifiConnectStartTime;
unsigned long ledColorStartTime;

const unsigned long wifiCheckInterval = 5000;
const unsigned long ledCheckInterval = 5000;

unsigned long lastWifiCheckTime = 0;
unsigned long lastLedCheckTime = 0;

struct LedData
{
    int ledID;
    int fooID;
    int red;
    int green;
    int blue;
    int brightness;
    int fooMod; // modifier for blink interval, auto shutdown time, breathe speed
};

#pragma endregion config

#pragma region eepromConfig

#pragma endregion eepromConfig

void setupWiFi()
{
    // Connecting to WiFi
    if (WiFi.status() != WL_CONNECTED)
    {
        WiFi.begin(ssid, password);
        Serial.println("Connecting to WiFi..");
        wifiConnectStartTime = millis();
    }
}

// void setupLEDConnection()
// // need to test with api, maybe default blink after 10s
// // if there is no command from front end telling it to blink, have a flag that is ledWebConnect = False
// // when it receives any html or post request, start 15second timer in a while loop
// // while timer < 15000m : normal code
// // and after that call the led error function??
// {
//     // LED color control
//     FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);
//     FastLED.clear();
//     leds[0] = CRGB(redValue, greenValue, blueValue);
//     FastLED.show();
//     ledColorStartTime = millis();
// }

void blinkEffect(std::initializer_list<int> ledData = {})
{
    // Preparing leds
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);
    FastLED.clear();

    // Led assignments

    // Repeating loop
    unsigned long timerMillis = 0;
    while (millis() - timerMillis < int(ledData.begin() + 4))
    {
        FastLED.clear();
        leds[*ledData.begin()] = CRGB(*ledData.begin() + 1,
                                      *(ledData.begin() + 2),
                                      *(ledData.begin() + 3));
        FastLED.show();
        timerMillis = 0;
    }
}

void setupLED()
{
    FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);
    FastLED.clear();
    FastLED.show();
}

void ledTest()
{
}

void writeLedDataToEEPROM(int startAddress, const LedData &data)
{
    EEPROM.put(startAddress, data);
}

void readLedDataFromEEPROM(int startAddress, LedData &data)
{
    EEPROM.get(startAddress, data);
}

void setup()
{
    // Connecting to WiFi and LED color control will run concurrently
    Serial.begin(115200);

    // Run tasks at the beginning
    setupWiFi();
    setupLED();
    // setupLEDConnection();
    // Print ESP Local IP Address when WiFi is connected
    Serial.println(WiFi.localIP());

    // checking

    if (WiFi.status() != WL_CONNECTED && millis() - wifiConnectStartTime >= 7500)
    {
        Serial.println("Failed to connect to WiFi. Check your credentials.");
    }
    else
    {
        Serial.println("wifi works");
    }
}

void loop()
{
    // Wifi check
    if (millis() - lastWifiCheckTime >= wifiCheckInterval)
    {
        lastWifiCheckTime = millis();
        if (WiFi.status() != WL_CONNECTED)
        {
            Serial.println("No WiFi connection.");
            blinkEffect({5, 0, 0, 255, 50});
        }
    }

    // Check LED color control every 5 seconds
    // if (millis() - lastLedCheckTime >= ledCheckInterval)
    // {
    //     lastLedCheckTime = millis();
    //     if (NUM_LEDS > 0 && millis() - ledColorStartTime >= 30)
    //     {
    //         Serial.println("LED color control complete.");
    //         leds[0] = CRGB(redValue, greenValue, blueValue);
    //     }
    // }
}
