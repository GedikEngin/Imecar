// Function to submit a report
function submitReport() {
	const name = document.getElementById("name").value;
	const startOfWeek = document.getElementById("startOfWeek").value;
	const dayOfWeek = document.getElementById("dayOfWeek").value;
	const comments = document.getElementById("comments").value;

	if (dayOfWeek !== "Monday") {
		alert("Please select Monday as the start of the week.");
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
	const mondayTasks = document.getElementById("mondayTasks").value;
	const tuesdayTasks = document.getElementById("tuesdayTasks").value;
	const wednesdayTasks = document.getElementById("wednesdayTasks").value;
	const thursdayTasks = document.getElementById("thursdayTasks").value;
	const fridayTasks = document.getElementById("fridayTasks").value;
	const saturdayTasks = document.getElementById("saturdayTasks").value;
	const sundayTasks = document.getElementById("sundayTasks").value;

	if (dayOfWeek !== "Monday") {
		alert("Please select Monday as the start of the week.");
		return;
	}

	const formData = {
		name,
		startOfWeek,
		tasks: {
			Monday: mondayTasks,
			Tuesday: tuesdayTasks,
			Wednesday: wednesdayTasks,
			Thursday: thursdayTasks,
			Friday: fridayTasks,
			Saturday: saturdayTasks,
			Sunday: sundayTasks,
		},
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
	const readType = document.getElementById("readType").value;

	fetch(
		`/readData?name=${name}&startOfWeek=${startOfWeek}&readType=${readType}`
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			displayData(data);
		})
		.catch((error) => {
			console.error(`Error reading ${readType}:`, error);
			alert(`Failed to read ${readType}. Please try again.`);
		});
}

// Function to display retrieved data
function displayData(data) {
	// Assuming data is an array of objects with dayOfWeek, tasks, and reports properties

	// Map the days to their respective input fields
	const dayMap = {
		Monday: "monday",
		Tuesday: "tuesday",
		Wednesday: "Wednesday",
		Thursday: "thursday",
		Friday: "friday",
		Saturday: "saturday",
		Sunday: "sunday",
	};

	// Iterate over the days and update the corresponding input fields
	for (const day of Object.keys(dayMap)) {
		const inputFieldId = dayMap[day];

		// Find the data object for the current day
		const dayData = data.find((entry) => entry.dayOfWeek === day) || {
			tasks: "",
			reports: "",
		};

		// Update the corresponding input fields
		document.getElementById(`${inputFieldId}Tasks`).value = dayData.tasks;
		document.getElementById(`${inputFieldId}Reports`).value = dayData.reports;
	}
}
