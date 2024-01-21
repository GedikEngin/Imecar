#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FastLED.h>
#include <initializer_list>
#include <EEPROM.h>
#include <iostream>

TaskHandle_t task1Handle = NULL;
TaskHandle_t task2Handle = NULL;

void task1(void *pvParameters)
{
    while (1)
    {
        Serial.printf("Task 1 is running on core %d\n", xPortGetCoreID());
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}

void task2(void *pvParameters)
{
    while (1)
    {
        Serial.printf("Task 2 is running on core %d\n", xPortGetCoreID());
        vTaskDelay(1500 / portTICK_PERIOD_MS);
    }
}

void setup()
{
    Serial.begin(115200);
    delay(2500);
    Serial.printf("Number of cores: %d\n", xPortGetCoreID() + 1);

    xTaskCreatePinnedToCore(task1, "Task1", 2048, NULL, 1, &task1Handle, 0);
    xTaskCreatePinnedToCore(task2, "Task2", 2048, NULL, 1, &task2Handle, 1);
}

void loop()
{
    // Your main loop code (if any)
    vTaskDelay(10000 / portTICK_PERIOD_MS);
}
