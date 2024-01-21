function toggleDarkMode() {
	const bodyDiv = document.getElementById("body-div");
	bodyDiv.classList.toggle("dark");
	const elements = bodyDiv.querySelectorAll(".light");
	elements.forEach((element) => {
		element.classList.toggle("dark");
	});
}

function validateInput(value, fieldName) {
	if (/^0[0-9]+$/.test(value)) {
		alert(fieldName + " cannot have leading zeros.");
		return false;
	}
	return true;
}

function submitForm(button) {
	const form = button.closest("form");
	const formData = new FormData(form);

	// Set the value of fooID dynamically
	const fooID = form.getAttribute("data-fooID");
	formData.set("fooID", fooID);

	// Log the final data before sending it to the server
	console.log("Final Form Data:", Object.fromEntries(formData));

	fetch("/submit", {
		method: "POST",
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.text();
		})
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.error("There was a problem with the fetch operation:", error);
		});
}
