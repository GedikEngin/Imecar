function toggleDarkMode() {
	const body = document.body;
	const darkModeToggle = document.getElementById("dark-mode-toggle");
	const styleLink = document.getElementById("style-link");

	if (darkModeToggle.checked) {
		body.classList.remove("light-mode");
		body.classList.add("dark-mode");
		styleLink.href = "dark-mode.css"; // Change to the dark mode stylesheet
	} else {
		body.classList.remove("dark-mode");
		body.classList.add("light-mode");
		styleLink.href = "light-mode.css"; // Change to the light mode stylesheet
	}
}

function ledButtons(button) {
	var buttonId = button.id;

	if (buttonId === "toggleLed") {
		var currentState = button.getAttribute("data-state");

		if (currentState === "On") {
			button.innerHTML = "Off";
			button.style.backgroundColor = "red";
			button.setAttribute("data-state", "Off");
		} else {
			button.innerHTML = "On";
			button.style.backgroundColor = "#4caf50";
			button.setAttribute("data-state", "On");
		}
	} else if (buttonId === "resetLed") {
		// Handle reset button click
	} else if (buttonId === "writeData") {
		// Handle write data button click
	} else if (buttonId === "readData") {
		// Handle read data button click
	}
}

function submitForm() {
	var values = [
		document.getElementById("startAddress").value,
		document.getElementById("ledID").value,
		document.getElementById("fooID").value,
		document.getElementById("fooMod").value,
		document.getElementById("hue").value,
		document.getElementById("saturation").value,
		document.getElementById("brightness").value,
	];

	console.log("Form data:", values);
}
