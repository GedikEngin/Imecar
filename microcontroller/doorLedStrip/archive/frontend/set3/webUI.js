function toggleDarkMode() {
	const body = document.body;
	const darkModeToggle = document.getElementById("dark-mode-toggle");
	const blinkContainer = document.getElementById("blink-container");
	const breathingContainer = document.getElementById("breathing-container");
	const timeoutContainer = document.getElementById("timeout-container");
	const solidContainer = document.getElementById("solid-container");
	const styleLink = document.getElementById("style-link");

	if (darkModeToggle.checked) {
		body.classList.remove("light-mode");
		body.classList.add("dark-mode");
		blinkContainer.classList.remove("light-mode");
		blinkContainer.classList.add("dark-mode");
		breathingContainer.classList.remove("light-mode");
		breathingContainer.classList.add("dark-mode");
		timeoutContainer.classList.remove("light-mode");
		timeoutContainer.classList.add("dark-mode");
		solidContainer.classList.remove("light-mode");
		solidContainer.classList.add("dark-mode");
		styleLink.href = "combined-styles.css"; // Change to the combined stylesheet
	} else {
		body.classList.remove("dark-mode");
		body.classList.add("light-mode");
		blinkContainer.classList.remove("dark-mode");
		blinkContainer.classList.add("light-mode");
		breathingContainer.classList.remove("dark-mode");
		breathingContainer.classList.add("light-mode");
		timeoutContainer.classList.remove("dark-mode");
		timeoutContainer.classList.add("light-mode");
		solidContainer.classList.remove("dark-mode");
		solidContainer.classList.add("light-mode");
		styleLink.href = "combined-styles.css"; // Change to the combined stylesheet
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
