struct LedStruct
{
    int ledID;      // 0-5 led ID
    int fooID;      // 0-4 function to be routed to
    int hue;        // 0-255 range for hue
    int saturation; // 0-255 range for saturation
    int brightness; // 0-255 range for brightness
    int fooMod;     // modifier for blink interval, auto shutdown time, breathe speed
};
