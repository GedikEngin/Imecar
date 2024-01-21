```cpp
void functionRouter(const LedStruct &ledData)
{
    if (ledData.fooID == 0)
    {
        Serial.println("error function");
    }

    else if (ledData.fooID == 1)
    {
        Serial.println("blink function");
        blinkLed(ledData);
    }

    else if (ledData.fooID == 2)
    {
        Serial.println("time out function");
    }

    else if (ledData.fooID == 3)
    {
        Serial.println("breathing function");
    }

    else if (ledData.fooID == 4)
    {
        Serial.println("solid color function");
    }

    else if (ledData.fooID == 5)
    {
        Serial.println("buttons function");
    }

    else
    {
        Serial.println("function id invalid");
    }
}
```
