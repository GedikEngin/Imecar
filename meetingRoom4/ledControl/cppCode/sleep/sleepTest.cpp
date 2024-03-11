#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>
#include <esp_sleep.h>
#include <Arduino.h>

#define SWITCH_PIN_1 2 // GPIO 2, connected to leg 1 of the switch
#define SWITCH_PIN_2 0 // GPIO 0, connected to leg 3 of the switch

bool sleepFlag = false;

// Interrupt Service Routine (ISR) for pin 2 (GPIO 2)
void IRAM_ATTR isr()
{
    sleepFlag = true;
}

void setup()
{
    Serial.begin(9600);
    pinMode(SWITCH_PIN_1, INPUT_PULLUP);
    pinMode(SWITCH_PIN_2, INPUT_PULLUP);
    Serial.println("Setup complete. Device is awake.");

    // Configure pin 0 (GPIO 0) for wakeup
    esp_sleep_enable_ext0_wakeup(GPIO_NUM_0, 0);

    // Configure pin 2 (GPIO 2) for interrupt wakeup
    attachInterrupt(digitalPinToInterrupt(SWITCH_PIN_1), isr, CHANGE);
    attachInterrupt(digitalPinToInterrupt(SWITCH_PIN_2), isr, CHANGE);
}

void loop()
{
    if (sleepFlag)
    {
        Serial.println("Going to sleep...");
        delay(100); // Ensure Serial print is complete
        esp_deep_sleep_start();
    }

    delay(1000); // Delay in the main loop
    Serial.println("Awake");
}
