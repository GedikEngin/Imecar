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

// variable created to be used with setInterval function when creating time based
// constraints/functions, the identifier for hte interval
var autoCycleInterval;

// function for the rgb toggle
function toggleRGB() {
	// checks for the rgb flag
	isRGBEnabled = !isRGBEnabled;

	// if flag is true, call the autoCycleRGBSliders function
	if (isRGBEnabled) {
		autoCycleRGBSliders();

		// else clear the interval to stop the cycle running function from being called by an interval
	} else {
		clearInterval(autoCycleInterval);
	}
}

// function to start cycling rgb slider values
function autoCycleRGBSliders() {
	// creates an interval so the function can be called every interval & assigns it to autoCycleInterval
	autoCycleInterval = setInterval(function () {
		// fetches updated slider values from dom using the getElementByID and then specifying the slider id
		var redSlider = document.getElementById("pwmSliderRed");
		var greenSlider = document.getElementById("pwmSliderGreen");
		var blueSlider = document.getElementById("pwmSliderBlue");

		// change redSlider's value, doesn't focus on graphics but rather the value
		//  50% chance that either redSlider will get incremented by 1
		if (Math.random() > 0.5) {
			redSlider.value++;

			// or decremented by 1
		} else {
			redSlider.value--;
		}

		// change greenSlider's value, doesn't focus on graphics but rather the value
		if (Math.random() > 0.5) {
			greenSlider.value++;
		} else {
			greenSlider.value--;
		}

		// change blueSlider's value, doesn't focus on graphics but rather the value
		if (Math.random() > 0.5) {
			greenSlider.value++;
		} else {
			greenSlider.value--;
		}

		// Randomly change direction for red and blue sliders with a x% chance
		// makes no functional difference when observed

		// random val, gets activated if it is greater that 0.7
		// if (Math.random() > 0.7) {
		// 	// schedules a function to be executed once the interval specified passes
		// 	setTimeout(function () {
		// 		// function within the setTimeout
		// 		redIncrement = !redIncrement;

		// 		// random interval specified
		// 	}, Math.random() * 2000);
		// }

		// if (Math.random() > 0.7) {
		// 	setTimeout(function () {
		// 		blueIncrement = !blueIncrement;
		// 	}, Math.random() * 2000);
		// }

		// if (Math.random() > 0.7) {
		// 	setTimeout(function () {
		// 		greenIncrement = !greenIncrement;
		// 	}, Math.random() * 2000);
		// }

		// calls updateSliderPWM function, passing in colourSlider values, the target element id, and its color
		updateSliderPWM(redSlider, "textSliderValueRed", "red");
		updateSliderPWM(greenSlider, "textSliderValueGreen", "green");
		updateSliderPWM(blueSlider, "textSliderValueBlue", "blue");
	}, 50); // Adjust the interval to control the speed of the animation
}

// Initial call to start the auto cycle
autoCycleRGBSliders();
