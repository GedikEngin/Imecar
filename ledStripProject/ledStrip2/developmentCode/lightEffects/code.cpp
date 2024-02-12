#include <FastLED.h>

#define NUM_LEDS 50     // Number of LEDs in the strip
#define DATA_PIN 23     // Pin connected to the data line of the LED strip
#define LED_TYPE WS2812 // Type of LED strip

#define PIN_SIGNAL_RED 19 // Pin for the red signal button

CRGB leds[NUM_LEDS]; // Define an array to hold LED colors

bool animationRunning = false;         // Flag to indicate if animation is running
uint8_t hue = 0;                       // Hue value for the animation
unsigned long lastAnimationUpdate = 0; // Last time animation was updated

void setup()
{
    FastLED.addLeds<LED_TYPE, DATA_PIN, GRB>(leds, NUM_LEDS); // Initialize FastLED library

    // Set button pin as input with internal pull-up resistor
    pinMode(PIN_SIGNAL_RED, INPUT_PULLUP);
}

void loop()
{
    // Check if the button is pressed
    if (digitalRead(PIN_SIGNAL_RED) == LOW)
    {
        // Toggle animation state
        animationRunning = !animationRunning;

        // If animation is running, start the animation
        if (animationRunning)
        {
            startAnimation();
        }
        else
        {
            // If animation is stopped, turn off LEDs
            FastLED.clear();
            FastLED.show();
        }

        // Wait for button release
        while (digitalRead(PIN_SIGNAL_RED) == LOW)
        {
            delay(10); // debounce delay
        }
    }

    // If animation is running, continue the animation
    if (animationRunning)
    {
        updateAnimation();
    }
}

void startAnimation()
{
    hue = 0;
    lastAnimationUpdate = millis();
}

void updateAnimation()
{
    unsigned long currentMillis = millis();
    if (currentMillis - lastAnimationUpdate >= 30)
    {
        // Set each LED to a color based on the current hue
        for (int i = 0; i < NUM_LEDS; ++i)
        {
            leds[i] = CHSV(hue, 255, 255);
        }
        FastLED.show();

        // Increment the hue value
        hue += 10;

        // Delay for animation smoothness
        lastAnimationUpdate = currentMillis;
    }

    // Fading out the LEDs
    if (hue >= 255)
    {
        for (int i = 0; i < NUM_LEDS; ++i)
        {
            leds[i].fadeToBlackBy(1); // Fade out each LED
        }
        FastLED.show();
    }
}

// pure eye damage on wokwi
// #include <FastLED.h>

// #define NUM_LEDS 50             // Number of LEDs in the strip
// #define DATA_PIN 23             // Pin connected to the data line of the LED strip
// #define LED_TYPE WS2812         // Type of LED strip

// #define PIN_SIGNAL_RED 19       // Pin for the red signal button

// CRGB leds[NUM_LEDS];           // Define an array to hold LED colors

// bool animationRunning = false; // Flag to indicate if animation is running
// uint8_t hue = 0;                // Hue value for the animation
// unsigned long lastAnimationUpdate = 0; // Last time animation was updated

// void setup() {
//     FastLED.addLeds<LED_TYPE, DATA_PIN, GRB>(leds, NUM_LEDS); // Initialize FastLED library

//     // Set button pin as input with internal pull-up resistor
//     pinMode(PIN_SIGNAL_RED, INPUT_PULLUP);
// }

// void loop() {
//     // Check if the button is pressed
//     if (digitalRead(PIN_SIGNAL_RED) == LOW) {
//         // Toggle animation state
//         animationRunning = !animationRunning;

//         // If animation is running, start the animation
//         if (animationRunning) {
//             startAnimation();
//         } else {
//             // If animation is stopped, turn off LEDs
//             FastLED.clear();
//             FastLED.show();
//         }

//         // Wait for button release
//         while (digitalRead(PIN_SIGNAL_RED) == LOW) {
//             delay(10); // debounce delay
//         }
//     }

//     // If animation is running, continue the animation
//     if (animationRunning) {
//         updateAnimation();
//     }
// }

// void startAnimation() {
//     hue = 0;
//     lastAnimationUpdate = millis();
// }

// void updateAnimation() {
//     unsigned long currentMillis = millis();
//     if (currentMillis - lastAnimationUpdate >= 50) { // Increase the delay to slow down the animation
//         // Set each LED to a color based on the current hue
//         for (int i = 0; i < NUM_LEDS; ++i) {
//             leds[i] = CHSV(hue, 255, 255);
//             hue += 2; // Adjust the increment value to control the speed of color change
//         }
//         FastLED.show();

//         // Delay for animation smoothness
//         lastAnimationUpdate = currentMillis;
//     }

//     // Fading out the LEDs
//     if (hue >= 255) {
//         bool ledsOff = true;
//         for (int i = 0; i < NUM_LEDS; ++i) {
//             if (leds[i].r > 0 || leds[i].g > 0 || leds[i].b > 0) {
//                 leds[i].fadeToBlackBy(1); // Fade out each LED
//                 ledsOff = false;
//             }
//         }
//         FastLED.show();

//         // If all LEDs are off, stop the animation
//         if (ledsOff) {
//             animationRunning = false;
//         }
//     }
// }
