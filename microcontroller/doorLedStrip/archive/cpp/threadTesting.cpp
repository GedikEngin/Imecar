#include <Arduino.h>
#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <initializer_list>
#include <EEPROM.h>
#include <iostream>

TaskHandle_t taskHandles[6];

void taskFunction(void *pvParameters)
{
    const char *taskName = (const char *)pvParameters;

    for (;;)
    {
        Serial.printf("%s is running\n", taskName);
        vTaskDelay(pdMS_TO_TICKS(1000)); // Delay for 1000 milliseconds
    }
}

void setup()
{
    Serial.begin(115200);

    const char *taskNames[] = {"Task1", "Task2", "Task3", "Task4", "Task5", "Task6"};

    for (int i = 0; i < 6; ++i)
    {
        xTaskCreatePinnedToCore(
            taskFunction,         // Task function
            taskNames[i],         // Task name
            10000,                // Stack size
            (void *)taskNames[i], // Task parameter
            1,                    // Priority
            &taskHandles[i],      // Task handle
            i % 2);               // Core (alternating between core 0 and core 1)
    }
}

void loop()
{
    // The main loop can be empty or used for other purposes
}