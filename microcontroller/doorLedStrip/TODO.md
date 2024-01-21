# Door Led Strip

## To Do

#### EEPROM

- [x] read single data
- [x] write single data
- [x] be able to break down a class and write it
- [x] be able to retrieve data from written class
- [x] parse data that is read from eeprom

#### WebUI

- [ ] navigation
- [ ] saving button
- [ ] ui to do basic functions
- [ ] dynamic ui elements (sliders, color wheel etc)
- [ ] sending data to api
- [ ] retrieving data from api

#### CPP

- [x] led data format
- [x] blink function
- [ ] time out function
- [ ] breathing function
- [ ] solid color function
- [ ] buttons for prebuilt spectrum (example code)
- [ ] error handling
- [ ] router function
- [ ] toggle on/off func

#### API's

- [ ] get request for blink
- [ ] get request for time out
- [ ] get request for breathing
- [ ] get request for solid
- [ ] get for toggle/on off
- [ ] get request for prebuilt spectrum (example code)
- [ ] post for data being read from eeprom

#### Design & manufacturing

- [x] finalize design inspiration
- [x] design 'case' in cad
- [ ] revise the design
- [ ] manufacture

## General

- [x] Documentation for addresses
- [x] Copy paste hue spectrum
- [ ] Turn it into a library?

## Testing (in order)

- [ ] testing back end before introducing api (no post requests)
- [ ] testing api (no post requests)->backend before introducing
- [ ] testing browser to api (no post requests) (seeing if data and 'instructions' are passed in js console)
- [ ] testing if browser -> api (no post requests) -> backend works
- [ ] testing if browser -> api (no post requests) -> backend can store data in eeprom
- [ ] testing if backend -> api (yes post) -> browser works
