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
