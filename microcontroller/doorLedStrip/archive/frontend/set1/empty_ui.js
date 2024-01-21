function updateSliderPWM(element, targetElementId, color) {
	var sliderValue = element.value;
	document.getElementById(targetElementId).innerHTML = sliderValue;
	console.log(sliderValue);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/slider?" + color + "=" + sliderValue, true);
	xhr.send();
}

function toggleOnOff() {
	var button = document.getElementById("toggleOnOff");
	var toggleState;
	var xhr = new XMLHttpRequest();

	if (button.getAttribute("data-state") === "off") {
		button.setAttribute("data-state", "on");
		button.innerHTML = "On";
		toggleState = "on";
	} else {
		button.setAttribute("data-state", "off");
		button.innerHTML = "Off";
		toggleState = "off";
	}

	xhr.open("GET", "/toggleOnOff?state=" + toggleState, true);
	xhr.send();
	console.log(toggleState);
}

function interactWithLED(button, colorLED) {
	var xhr = new XMLHttpRequest();
	console.log(colorLED);
	xhr.open("GET", "/colorLED?colorLED=" + colorLED, true);
	xhr.send();

	// Apply acknowledgment effect to the button
	button.classList.add("controlButton-clicked");

	// Optionally, you can reset the button state after a delay
	setTimeout(function () {
		button.classList.remove("controlButton-clicked");
	}, 1000); // Adjust the delay as needed
}
