// creates a function that takes in parameters element, the element id and then the slider color
// element is the item that triggered the DOM event, which is the OnChange for the sliders
// same with color, it is specified manually when being passed through when OnChange is called
function updateSliderPWM(element, targetElementId, color) {
	// sets sliderValue to be the element.value, so the DOM being passed's RGB value (0-255)
	var sliderValue = element.value;

	// finds the html element within the document/dom that has the targetElementID (being passed through when function is called)
	// and updates the inner content of the html elements
	document.getElementById(targetElementId).innerHTML = sliderValue;

	// creates a new variable to use for html request, used to interact with servers and make http requests
	var xhr = new XMLHttpRequest();

	// initializes a new get request with a target slider to query for the color and assigns it to the colorSliderValue
	// i.e. gets color blue (passed from updateSliderPWM) and slider value is 43, blue=43
	xhr.open("GET", "/slider?" + color + "=" + sliderValue, true);

	// sends the html request (the get request for the sliders in this case)
	xhr.send();
}

// creates flags that are used by loops for conditions when running events/functions
var isRGBEnabled = true;

// variable created to be used with setInterval function when creating time-based
// constraints/functions, the identifier for the interval
var autoCycleInterval;
var redCycleInterval;
var greenCycleInterval;
var blueCycleInterval;

// Function to clear color intervals
function clearColorInterval() {
	clearInterval(redCycleInterval);
	clearInterval(greenCycleInterval);
	clearInterval(blueCycleInterval);
}

function autoRGB() {
	redColorCycle();
	greenColorCycle();
	blueColorCycle();
}

// function for the rgb toggle
function toggleRGB() {
	// checks for the rgb flag
	isRGBEnabled = !isRGBEnabled;
	console.log("rgb status: " + isRGBEnabled);

	// if flag is true, call the autoCycleRGBSliders function
	if (isRGBEnabled) {
		// autoCycleRGBSliders();
		autoRGB();

		// else clear the interval to stop the cycle running function from being called by an interval
	} else {
		// clearInterval(autoCycleInterval);
		clearColorInterval(); // Call the function to clear color intervals
	}
}

function redColorCycle() {
	redCycleInterval = setInterval(function redController(redSlider) {
		console.log("red signal");
		var redSlider = document.getElementById("pwmSliderRed");
		if (Math.random() > 0.5) {
			redSlider.value++;

			// or decremented by 1
		} else {
			redSlider.value--;
		}
		updateSliderPWM(redSlider, "textSliderValueRed", "red");
	}, 1000);
}

function greenColorCycle() {
	greenCycleInterval = setInterval(function greenController(greenSlider) {
		console.log("green signal");
		var greenSlider = document.getElementById("pwmSliderGreen");
		if (Math.random() > 0.5) {
			greenSlider.value++;

			// or decremented by 1
		} else {
			greenSlider.value--;
		}
		updateSliderPWM(greenSlider, "textSliderValueGreen", "green");
	}, 1000);
}

function blueColorCycle() {
	blueCycleInterval = setInterval(function blueController(blueSlider) {
		console.log("blue signal");
		var blueSlider = document.getElementById("pwmSliderBlue");
		if (Math.random() > 0.5) {
			blueSlider.value++;

			// or decremented by 1
		} else {
			blueSlider.value--;
		}
		updateSliderPWM(blueSlider, "textSliderValueBlue", "blue");
	}, 1000);
}
// function autoCycleRGBSliders() {
// 	autoCycleInterval = setInterval(function () {
// 		var redSlider = document.getElementById("pwmSliderRed");
// 		var greenSlider = document.getElementById("pwmSliderGreen");
// 		var blueSlider = document.getElementById("pwmSliderBlue");

// 		// updateSliderPWM(redSlider, "textSliderValueRed", "red");
// 		// updateSliderPWM(greenSlider, "textSliderValueGreen", "green");
// 		// updateSliderPWM(blueSlider, "textSliderValueBlue", "blue");
// 	}, 500); // Adjust the interval to control the speed of the animation
// }

// Initial call to start the auto cycle with RGB initially off
toggleRGB();
