#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>

const char *ssid = "MW42V_A8CA";
const char *password = "91014264";

AsyncWebServer server(80);

void setup()
{
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");

    server.on(
        "/send", HTTP_POST, [](AsyncWebServerRequest *request) {}, NULL, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total)
        {
        if (!index) {
            Serial.println("Receiving POST data...");
        }
        Serial.printf("Post[%u]: %.*s\n", index, len, (const char*)data);

        // Parse JSON object
        DynamicJsonDocument doc(1024);
        DeserializationError error = deserializeJson(doc, (const char*)data);
        if (error) {
            Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.f_str());
            request->send(400, "text/plain", "Invalid JSON");
            return;
        }
        const char* message = doc["message"];

        Serial.println("Received message: " + String(message));
        request->send(200, "text/plain", "Message received"); });

    server.begin();
}

void loop()
{
    // Nothing to do here
}