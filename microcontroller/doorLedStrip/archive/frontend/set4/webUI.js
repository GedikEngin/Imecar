function toggleDarkMode() {
	const bodyDiv = document.getElementById("body-div");
	bodyDiv.classList.toggle("dark");
	const elements = bodyDiv.querySelectorAll(".light");
	elements.forEach((element) => {
		element.classList.toggle("dark");
	});
}

function submitForm(button) {
	// Get the parent form element of the clicked button
	const form = button.closest("form");

	// Extract data from the form
	const ledID = form.querySelector("input[name='ledID']").value;

	// Calculate the starting address based on the given formula
	const fooID = form.getAttribute("data-fooID");
	const startAddress = 42 * fooID + ledID * 7;

	const values = [
		startAddress,
		ledID,
		fooID,
		form.querySelector("input[name='fooMod']").value,
		form.querySelector("input[name='hue']").value,
		form.querySelector("input[name='saturation']").value,
		form.querySelector("input[name='brightness']").value,
	];

	console.log("Form data:", values);
}
