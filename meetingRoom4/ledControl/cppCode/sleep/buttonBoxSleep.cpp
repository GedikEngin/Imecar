#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>

const char *ssid = "ESP32_AP";
const char *password = "password";
const char *serverAddress = "http://192.168.4.1:8080/esp32/setLeds";

const int switchPin = 14;        // GPIO 14
const int sleepSwitchPin = 2;    // GPIO 2
const int wakeUpPin = 0;         // GPIO 0
int switchState = 0;
int lastSwitchState = HIGH;
int sleepSwitchState = 0;
int lastSleepSwitchState = HIGH;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 100;

void sendHttpRequest(int hue, int saturation, int value) {
    // Function to send HTTP request to the server
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

void enterLightSleepMode() {
    // Function to enter light sleep mode
    Serial.println("Entering light sleep mode...");
    delay(250);
    esp_sleep_enable_gpio_wakeup();  // Enable wake-up on GPIO
    esp_sleep_enable_ext0_wakeup((gpio_num_t)wakeUpPin, LOW); // Configure wake-up on GPIO 0
    esp_light_sleep_start();
}

void setup() {
    // Setup function
    Serial.begin(9600);
    pinMode(switchPin, INPUT_PULLUP);
    pinMode(sleepSwitchPin, INPUT_PULLUP);
    pinMode(wakeUpPin, INPUT_PULLUP);

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
    // Main execution loop.
    int reading = digitalRead(switchPin);
    int sleepSwitchReading = digitalRead(sleepSwitchPin);

    if (reading != lastSwitchState) {
        lastDebounceTime = millis();
    }

    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading != switchState) {
            switchState = reading;

            if (switchState == LOW) {
                Serial.println("State 1");
                sendHttpRequest(0, 255, 255); // State 1: Hue 0, Saturation 255, Value 255
            } else {
                Serial.println("State 2");
                sendHttpRequest(90, 255, 255); // State 2: Hue 90, Saturation 255, Value 255
            }
        }
    }

    if (sleepSwitchReading != lastSleepSwitchState) {
        lastDebounceTime = millis();
    }

    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (sleepSwitchReading != sleepSwitchState) {
            sleepSwitchState = sleepSwitchReading;

            if (sleepSwitchState == LOW) {
                Serial.println("Sleep switch toggled");
                delay(250);
                enterLightSleepMode();
            }
        }
    }

    lastSwitchState = reading;
    lastSleepSwitchState = sleepSwitchReading;
}

// Function to be called on wake from light sleep
extern "C" void onWakeUp() {
    // Reconnect to WiFi
    Serial.begin(9600);
    Serial.println("Waking up from light sleep...");
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("Connected");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
}
