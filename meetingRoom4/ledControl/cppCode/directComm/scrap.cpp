void setColors()
{
    switch (frameIndex)
    {
    case 0:
        // Set all LEDs to black
        fill_solid(leds, 24, CRGB(0, 0, 0));

        // Set LEDs 24 and 25 to white
        leds[24] = CRGB(255, 255, 255);
        leds[25] = CRGB(255, 255, 255);

        break;
    case 1:
        leds[23].setRGB(255, 255, 255);
        leds[26].setRGB(255, 255, 255);
        break;
    case 2:
        leds[22].setRGB(255, 255, 255);
        leds[27].setRGB(255, 255, 255);
        break;
    case 3:
        leds[21].setRGB(255, 255, 255);
        leds[24].setRGB(191, 191, 191);
        leds[25].setRGB(191, 191, 191);
        leds[28].setRGB(255, 255, 255);
        break;
    case 4:
        leds[20].setRGB(255, 255, 255);
        leds[23].setRGB(191, 191, 191);
        leds[24].setRGB(128, 128, 128);
        leds[25].setRGB(128, 128, 128);
        leds[26].setRGB(191, 191, 191);
        leds[29].setRGB(255, 255, 255);
        break;
    case 5:
        leds[19].setRGB(255, 255, 255);
        leds[22].setRGB(191, 191, 191);
        leds[23].setRGB(128, 128, 128);
        leds[24].setRGB(64, 64, 64);
        leds[25].setRGB(64, 64, 64);
        leds[26].setRGB(128, 128, 128);
        leds[27].setRGB(191, 191, 191);
        leds[30].setRGB(255, 255, 255);
        break;
    case 6:
        leds[18].setRGB(255, 255, 255);
        leds[21].setRGB(191, 191, 191);
        leds[22].setRGB(128, 128, 128);
        leds[23].setRGB(64, 64, 64);
        leds[24].setRGB(0, 0, 0);
        leds[25].setRGB(0, 0, 0);
        leds[26].setRGB(64, 64, 64);
        leds[27].setRGB(128, 128, 128);
        leds[28].setRGB(191, 191, 191);
        leds[31].setRGB(255, 255, 255);
        break;
    case 7:
        leds[17].setRGB(255, 255, 255);
        leds[20].setRGB(191, 191, 191);
        leds[21].setRGB(128, 128, 128);
        leds[22].setRGB(64, 64, 64);
        leds[23].setRGB(0, 0, 0);
        leds[26].setRGB(0, 0, 0);
        leds[27].setRGB(64, 64, 64);
        leds[28].setRGB(128, 128, 128);
        leds[29].setRGB(191, 191, 191);
        leds[32].setRGB(255, 255, 255);
        break;
    case 8:
        leds[16].setRGB(255, 255, 255);
        leds[19].setRGB(191, 191, 191);
        leds[20].setRGB(128, 128, 128);
        leds[21].setRGB(64, 64, 64);
        leds[22].setRGB(0, 0, 0);
        leds[27].setRGB(0, 0, 0);
        leds[28].setRGB(64, 64, 64);
        leds[29].setRGB(128, 128, 128);
        leds[30].setRGB(191, 191, 191);
        leds[33].setRGB(255, 255, 255);
        break;
    case 9:
        leds[15].setRGB(255, 255, 255);
        leds[18].setRGB(191, 191, 191);
        leds[19].setRGB(128, 128, 128);
        leds[20].setRGB(64, 64, 64);
        leds[21].setRGB(0, 0, 0);
        leds[28].setRGB(0, 0, 0);
        leds[29].setRGB(64, 64, 64);
        leds[30].setRGB(128, 128, 128);
        leds[31].setRGB(191, 191, 191);
        leds[34].setRGB(255, 255, 255);
        break;
    case 10:
        leds[14].setRGB(255, 255, 255);
        leds[17].setRGB(191, 191, 191);
        leds[18].setRGB(128, 128, 128);
        leds[19].setRGB(64, 64, 64);
        leds[20].setRGB(0, 0, 0);
        leds[29].setRGB(0, 0, 0);
        leds[30].setRGB(64, 64, 64);
        leds[31].setRGB(128, 128, 128);
        leds[32].setRGB(191, 191, 191);
        leds[35].setRGB(255, 255, 255);
        break;
    case 11:
        leds[13].setRGB(255, 255, 255);
        leds[16].setRGB(191, 191, 191);
        leds[17].setRGB(128, 128, 128);
        leds[18].setRGB(64, 64, 64);
        leds[19].setRGB(0, 0, 0);
        leds[30].setRGB(0, 0, 0);
        leds[31].setRGB(64, 64, 64);
        leds[32].setRGB(128, 128, 128);
        leds[33].setRGB(191, 191, 191);
        leds[36].setRGB(255, 255, 255);
        break;
    case 12:
        leds[12].setRGB(255, 255, 255);
        leds[15].setRGB(191, 191, 191);
        leds[16].setRGB(128, 128, 128);
        leds[17].setRGB(64, 64, 64);
        leds[18].setRGB(0, 0, 0);
        leds[31].setRGB(0, 0, 0);
        leds[32].setRGB(64, 64, 64);
        leds[33].setRGB(128, 128, 128);
        leds[34].setRGB(191, 191, 191);
        leds[37].setRGB(255, 255, 255);
        break;
    case 13:
        leds[11].setRGB(255, 255, 255);
        leds[14].setRGB(191, 191, 191);
        leds[15].setRGB(128, 128, 128);
        leds[16].setRGB(64, 64, 64);
        leds[17].setRGB(0, 0, 0);
        leds[32].setRGB(0, 0, 0);
        leds[33].setRGB(64, 64, 64);
        leds[34].setRGB(128, 128, 128);
        leds[35].setRGB(191, 191, 191);
        leds[38].setRGB(255, 255, 255);
        break;
    case 14:
        leds[10].setRGB(255, 255, 255);
        leds[13].setRGB(191, 191, 191);
        leds[14].setRGB(128, 128, 128);
        leds[15].setRGB(64, 64, 64);
        leds[16].setRGB(0, 0, 0);
        leds[33].setRGB(0, 0, 0);
        leds[34].setRGB(64, 64, 64);
        leds[35].setRGB(128, 128, 128);
        leds[36].setRGB(191, 191, 191);
        leds[39].setRGB(255, 255, 255);
        break;
    case 15:
        leds[9].setRGB(255, 255, 255);
        leds[12].setRGB(191, 191, 191);
        leds[13].setRGB(128, 128, 128);
        leds[14].setRGB(64, 64, 64);
        leds[15].setRGB(0, 0, 0);
        leds[34].setRGB(0, 0, 0);
        leds[35].setRGB(64, 64, 64);
        leds[36].setRGB(128, 128, 128);
        leds[37].setRGB(191, 191, 191);
        leds[40].setRGB(255, 255, 255);
        break;
    case 16:
        leds[8].setRGB(255, 255, 255);
        leds[11].setRGB(191, 191, 191);
        leds[12].setRGB(128, 128, 128);
        leds[13].setRGB(64, 64, 64);
        leds[14].setRGB(0, 0, 0);
        leds[35].setRGB(0, 0, 0);
        leds[36].setRGB(64, 64, 64);
        leds[37].setRGB(128, 128, 128);
        leds[38].setRGB(191, 191, 191);
        leds[41].setRGB(255, 255, 255);
        break;
    case 17:
        leds[7].setRGB(255, 255, 255);
        leds[10].setRGB(191, 191, 191);
        leds[11].setRGB(128, 128, 128);
        leds[12].setRGB(64, 64, 64);
        leds[13].setRGB(0, 0, 0);
        leds[36].setRGB(0, 0, 0);
        leds[37].setRGB(64, 64, 64);
        leds[38].setRGB(128, 128, 128);
        leds[39].setRGB(191, 191, 191);
        leds[42].setRGB(255, 255, 255);
        break;
    case 18:
        leds[6].setRGB(255, 255, 255);
        leds[9].setRGB(191, 191, 191);
        leds[10].setRGB(128, 128, 128);
        leds[11].setRGB(64, 64, 64);
        leds[12].setRGB(0, 0, 0);
        leds[37].setRGB(0, 0, 0);
        leds[38].setRGB(64, 64, 64);
        leds[39].setRGB(128, 128, 128);
        leds[40].setRGB(191, 191, 191);
        leds[43].setRGB(255, 255, 255);
        break;
    case 19:
        leds[5].setRGB(255, 255, 255);
        leds[8].setRGB(191, 191, 191);
        leds[9].setRGB(128, 128, 128);
        leds[10].setRGB(64, 64, 64);
        leds[11].setRGB(0, 0, 0);
        leds[38].setRGB(0, 0, 0);
        leds[39].setRGB(64, 64, 64);
        leds[40].setRGB(128, 128, 128);
        leds[41].setRGB(191, 191, 191);
        leds[44].setRGB(255, 255, 255);
        break;
    case 20:
        leds[4].setRGB(255, 255, 255);
        leds[7].setRGB(191, 191, 191);
        leds[8].setRGB(128, 128, 128);
        leds[9].setRGB(64, 64, 64);
        leds[10].setRGB(0, 0, 0);
        leds[39].setRGB(0, 0, 0);
        leds[40].setRGB(64, 64, 64);
        leds[41].setRGB(128, 128, 128);
        leds[42].setRGB(191, 191, 191);
        leds[45].setRGB(255, 255, 255);
        break;
    case 21:
        leds[3].setRGB(255, 255, 255);
        leds[6].setRGB(191, 191, 191);
        leds[7].setRGB(128, 128, 128);
        leds[8].setRGB(64, 64, 64);
        leds[9].setRGB(0, 0, 0);
        leds[40].setRGB(0, 0, 0);
        leds[41].setRGB(64, 64, 64);
        leds[42].setRGB(128, 128, 128);
        leds[43].setRGB(191, 191, 191);
        leds[46].setRGB(255, 255, 255);
        break;
    case 22:
        leds[2].setRGB(255, 255, 255);
        leds[5].setRGB(191, 191, 191);
        leds[6].setRGB(128, 128, 128);
        leds[7].setRGB(64, 64, 64);
        leds[8].setRGB(0, 0, 0);
        leds[41].setRGB(0, 0, 0);
        leds[42].setRGB(64, 64, 64);
        leds[43].setRGB(128, 128, 128);
        leds[44].setRGB(191, 191, 191);
        leds[47].setRGB(255, 255, 255);
        break;
    case 23:
        leds[1].setRGB(255, 255, 255);
        leds[4].setRGB(191, 191, 191);
        leds[5].setRGB(128, 128, 128);
        leds[6].setRGB(64, 64, 64);
        leds[7].setRGB(0, 0, 0);
        leds[42].setRGB(0, 0, 0);
        leds[43].setRGB(64, 64, 64);
        leds[44].setRGB(128, 128, 128);
        leds[45].setRGB(191, 191, 191);
        leds[48].setRGB(255, 255, 255);
        break;
    case 24:
        leds[0].setRGB(255, 255, 255);
        leds[3].setRGB(191, 191, 191);
        leds[4].setRGB(128, 128, 128);
        leds[5].setRGB(64, 64, 64);
        leds[6].setRGB(0, 0, 0);
        leds[43].setRGB(0, 0, 0);
        leds[44].setRGB(64, 64, 64);
        leds[45].setRGB(128, 128, 128);
        leds[46].setRGB(191, 191, 191);
        leds[49].setRGB(255, 255, 255);
        break;
    case 25:
        leds[2].setRGB(191, 191, 191);
        leds[3].setRGB(128, 128, 128);
        leds[4].setRGB(64, 64, 64);
        leds[5].setRGB(0, 0, 0);
        leds[44].setRGB(0, 0, 0);
        leds[45].setRGB(64, 64, 64);
        leds[46].setRGB(128, 128, 128);
        leds[47].setRGB(191, 191, 191);
        break;
    case 26:
        leds[1].setRGB(191, 191, 191);
        leds[2].setRGB(128, 128, 128);
        leds[3].setRGB(64, 64, 64);
        leds[4].setRGB(0, 0, 0);
        leds[45].setRGB(0, 0, 0);
        leds[46].setRGB(64, 64, 64);
        leds[47].setRGB(128, 128, 128);
        leds[48].setRGB(191, 191, 191);
        break;
    case 27:
        leds[0].setRGB(191, 191, 191);
        leds[1].setRGB(128, 128, 128);
        leds[2].setRGB(64, 64, 64);
        leds[3].setRGB(0, 0, 0);
        leds[46].setRGB(0, 0, 0);
        leds[47].setRGB(64, 64, 64);
        leds[48].setRGB(128, 128, 128);
        leds[49].setRGB(191, 191, 191);
        break;
    case 28:
        leds[0].setRGB(128, 128, 128);
        leds[1].setRGB(64, 64, 64);
        leds[2].setRGB(0, 0, 0);
        leds[47].setRGB(0, 0, 0);
        leds[48].setRGB(64, 64, 64);
        leds[49].setRGB(128, 128, 128);
        break;
    case 29:
        leds[0].setRGB(64, 64, 64);
        leds[1].setRGB(0, 0, 0);
        leds[48].setRGB(0, 0, 0);
        leds[49].setRGB(64, 64, 64);
        break;
    case 30:
        leds[0].setRGB(0, 0, 0);
        leds[49].setRGB(0, 0, 0);
        break;
    case 31:
        break;
    case 32:
        break;
    case 33:
        break;
    case 34:
        fill_solid(leds, NUM_LEDS, CRGB(13, 13, 13));
        break;
    case 35:
        fill_solid(leds, NUM_LEDS, CRGB(19, 19, 19));
        break;
    case 36:
        fill_solid(leds, NUM_LEDS, CRGB(26, 26, 26));
        break;
    case 37:
        fill_solid(leds, NUM_LEDS, CRGB(33, 33, 33));
        break;
    case 38:
        fill_solid(leds, NUM_LEDS, CRGB(40, 40, 40));
        break;
    case 39:
        fill_solid(leds, NUM_LEDS, CRGB(47, 47, 47));
        break;
    case 40:
        fill_solid(leds, NUM_LEDS, CRGB(54, 54, 54));
        break;
    case 41:
        fill_solid(leds, NUM_LEDS, CRGB(61, 61, 61));
        break;
    case 42:
        fill_solid(leds, NUM_LEDS, CRGB(68, 68, 68));
        break;
    case 43:
        fill_solid(leds, NUM_LEDS, CRGB(75, 75, 75));
        break;
    case 44:
        fill_solid(leds, NUM_LEDS, CRGB(82, 82, 82));
        break;
    case 45:
        fill_solid(leds, NUM_LEDS, CRGB(89, 89, 89));
        break;
    case 46:
        fill_solid(leds, NUM_LEDS, CRGB(96, 96, 96));
        break;
    case 47:
        fill_solid(leds, NUM_LEDS, CRGB(103, 103, 103));
        break;
    case 48:
        fill_solid(leds, NUM_LEDS, CRGB(110, 110, 110));
        break;
    case 49:
        fill_solid(leds, NUM_LEDS, CRGB(117, 117, 117));
        break;
    case 50:
        fill_solid(leds, NUM_LEDS, CRGB(124, 124, 124));
        break;
    case 51:
        fill_solid(leds, NUM_LEDS, CRGB(131, 131, 131));
        break;
    case 52:
        fill_solid(leds, NUM_LEDS, CRGB(138, 138, 138));
        break;
    case 53:
        fill_solid(leds, NUM_LEDS, CRGB(145, 145, 145));
        break;
    case 54:
        fill_solid(leds, NUM_LEDS, CRGB(152, 152, 152));
        break;
    case 55:
        fill_solid(leds, NUM_LEDS, CRGB(159, 159, 159));
        break;
    case 56:
        fill_solid(leds, NUM_LEDS, CRGB(166, 166, 166));
        break;
    case 57:
        fill_solid(leds, NUM_LEDS, CRGB(173, 173, 173));
        break;
    case 58:
        fill_solid(leds, NUM_LEDS, CRGB(180, 180, 180));
        break;
    case 59:
        fill_solid(leds, NUM_LEDS, CRGB(187, 187, 187));
        break;
    case 60:
        fill_solid(leds, NUM_LEDS, CRGB(194, 194, 194));
        break;
    case 61:
        fill_solid(leds, NUM_LEDS, CRGB(201, 201, 201));
        break;
    case 62:
        fill_solid(leds, NUM_LEDS, CRGB(208, 208, 208));
        break;
    case 63:
        fill_solid(leds, NUM_LEDS, CRGB(215, 215, 215));
        break;
    case 64:
        fill_solid(leds, NUM_LEDS, CRGB(222, 222, 222));
        break;
    case 65:
        fill_solid(leds, NUM_LEDS, CRGB(229, 229, 229));
        break;
    case 66:
        fill_solid(leds, NUM_LEDS, CRGB(236, 236, 236));
        break;
    case 67:
        fill_solid(leds, NUM_LEDS, CRGB(243, 243, 243));
        break;
    case 68:
        fill_solid(leds, NUM_LEDS, CRGB(250, 250, 250));
        break;
    case 69:
        fill_solid(leds, NUM_LEDS, CRGB(255, 255, 255));
        break;
    case 70:
        break;
    }
}

void startAnimation()
{
    frameIndex = 0; // Reset frame index to start the animation from the beginning

    while (frameIndex < 70) // Iterate through all frames of the animation
    {
        setColors();    // Set colors for the current frame
        FastLED.show(); // Show the current frame
        delay(50);      // Delay between frames (adjust as needed)
        frameIndex++;   // Move to the next frame
    }
}


    // startAnimation
    server.on("/esp32/startAnimation", HTTP_GET, [](AsyncWebServerRequest *request)
              {
                  String path = request->url();
                  Serial.println("Received URL: " + request->url());

                  startAnimation();

                  request->send(200, "application/json", "{\"message\": \"Animation started\"}"); });

    server.begin();