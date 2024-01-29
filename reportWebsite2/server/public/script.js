// Function to check if the date is a Monday
function isMonday(date) {
	return new Date(date).getDay() === 1; // 1 for Monday
}

// Function to submit a report
function submitReport() {
	const name = document.getElementById("name").value;
	const startOfWeek = document.getElementById("startOfWeek").value;
	const dayOfWeek = document.getElementById("dayOfWeek").value;
	const comments = document.getElementById("comments").value;

	if (!isMonday(startOfWeek)) {
		alert("The start of the week must be a Monday.");
		return;
	}

	const formData = {
		name,
		startOfWeek,
		dayOfWeek,
		comments,
	};

	fetch("/submitReport", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			alert("Report submitted successfully!");
		})
		.catch((error) => {
			console.error("Error submitting report:", error);
			alert("Failed to submit report. Please try again.");
		});
}

// Function to submit tasks
function submitTasks() {
	const name = document.getElementById("name").value;
	const startOfWeek = document.getElementById("startOfWeek").value;

	// Ensure the start of the week is a Monday
	if (!isMonday(startOfWeek)) {
		alert("The start of the week must be a Monday.");
		return;
	}

	// Prepare task data
	const tasks = [
		{
			dayOfWeek: "Monday",
			description: document.getElementById("mondayTasks").value,
		},
		{
			dayOfWeek: "Tuesday",
			description: document.getElementById("tuesdayTasks").value,
		},
		{
			dayOfWeek: "Wednesday",
			description: document.getElementById("wednesdayTasks").value,
		},
		{
			dayOfWeek: "Thursday",
			description: document.getElementById("thursdayTasks").value,
		},
		{
			dayOfWeek: "Friday",
			description: document.getElementById("fridayTasks").value,
		},
		{
			dayOfWeek: "Saturday",
			description: document.getElementById("saturdayTasks").value,
		},
		{
			dayOfWeek: "Sunday",
			description: document.getElementById("sundayTasks").value,
		},
	];

	const formData = {
		name,
		startOfWeek,
		tasks,
	};

	fetch("/submitTask", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			alert("Tasks submitted successfully!");
		})
		.catch((error) => {
			console.error("Error submitting tasks:", error);
			alert("Failed to submit tasks. Please try again.");
		});
}

// Function to retrieve data
function retrieveData() {
	const name = document.getElementById("name").value;
	const startOfWeek = document.getElementById("startOfWeek").value;
	const readTypeSelect = document.getElementById("readType");
	const readType = readTypeSelect.options[readTypeSelect.selectedIndex].value;

	if (!isMonday(startOfWeek)) {
		alert("The start of the week must be a Monday.");
		return;
	}

	fetch(
		`/readData?name=${encodeURIComponent(
			name
		)}&startOfWeek=${encodeURIComponent(
			startOfWeek
		)}&readType=${encodeURIComponent(readType)}`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok " + response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			displayData(data.data); // Make sure the response has a 'data' property
		})
		.catch((error) => {
			console.error(`Error reading ${readType}:`, error);
			alert(`Failed to read ${readType}. Please try again.`);
		});
}
// Function to display retrieved data
function displayData(data) {
	// Updated dayMap to match the IDs in your HTML
	const dayMap = {
		Monday: "monday",
		Tuesday: "tuesday",
		Wednesday: "wednesday",
		Thursday: "thursday",
		Friday: "friday",
		Saturday: "saturday",
		Sunday: "sunday",
	};

	Object.keys(dayMap).forEach((day) => {
		const elementId = dayMap[day];
		const element = document.getElementById(elementId);
		if (element) {
			const dayData = data.find((d) => d.dayOfWeek === day);
			element.value = dayData ? dayData.data : ""; // Set to empty string if no data found
		} else {
			console.error(`Error: Element with ID '${elementId}' not found.`);
		}
	});
}
