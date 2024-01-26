function toggleDarkMode() {
	const styleLink = document.getElementById("style-link");
	styleLink.href = styleLink.href.includes("light-mode.css")
		? "dark-mode.css"
		: "light-mode.css";
}

function ledButtons(button) {
	const action = button.getAttribute("data-action");
	// Handle different button actions here, for now, just log the action
	console.log(action + " button was pressed.");
}

function validateInput(value, fieldName, min, max) {
	const numericValue = parseFloat(value);
	if (/^0[0-9]+$/.test(value)) {
		alert(fieldName + " cannot have leading zeros.");
		return false;
	}
	if (isNaN(numericValue)) {
		alert(fieldName + " must be a valid number.");
		return false;
	}
	if (min !== undefined && numericValue < min) {
		alert(fieldName + " must be greater than or equal to " + min + ".");
		return false;
	}
	if (max !== undefined && numericValue > max) {
		alert(fieldName + " must be less than or equal to " + max + ".");
		return false;
	}
	return true;
}

function sendForm(button) {
	const form = button.closest("form");
	let isValid = true;
	const formData = {};

	form.querySelectorAll("input, select").forEach((input) => {
		if (input.type !== "checkbox") {
			// Skip checkboxes like the dark mode toggle
			const value = input.value;
			const fieldName = input.name;

			if (!validateInput(value, fieldName, input.min, input.max)) {
				isValid = false;
				return;
			}
			formData[fieldName] =
				fieldName === "compulsoryInput" || fieldName === "optionalInput"
					? parseInt(value)
					: value;
		}
	});

	if (isValid) {
		// Convert fooDropdown value to corresponding fooID
		switch (formData.fooDropdown) {
			case "blink":
				formData.fooID = 1;
				break;
			case "breath":
				formData.fooID = 2;
				break;
			case "solid":
				formData.fooID = 3;
				break;
			// Add cases for other dropdown values as needed
		}

		// Remove dropdown field from formData since it's not expected by ESP32
		delete formData.fooDropdown;

		console.log("Final Form Data:", formData);

		fetch("/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("There was a problem with the fetch operation:", error);
			});
	}
}
