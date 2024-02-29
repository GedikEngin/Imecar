document.addEventListener("DOMContentLoaded", function () {
	const roomSelect = document.getElementById("roomSelect");
	const createRoomForm = document.getElementById("createRoomForm");

	// Fetch and display existing rooms when the page loads
	fetchRooms();

	// Add event listener for creating a new room
	createRoomForm.addEventListener("submit", async function (event) {
		event.preventDefault();

		const formData = new FormData(createRoomForm);
		const roomName = formData.get("roomName");
		const minPermission = formData.get("minPermission");
		const department = formData.get("department");

		try {
			const response = await fetch("/room/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ roomName, minPermission, department }),
			});

			if (response.ok) {
				// Room created successfully, refresh the room list
				fetchRooms();
				createRoomForm.reset(); // Clear the form
			} else {
				const data = await response.json();
				console.error("Error creating room:", data.message);
				// Handle error - display error message to the user
			}
		} catch (error) {
			console.error("Error creating room:", error);
			// Handle error - display error message to the user
		}
	});

	// Function to fetch and display existing rooms
	async function fetchRooms() {
		try {
			const response = await fetch("/room/rooms");
			if (response.ok) {
				const rooms = await response.json();
				displayRooms(rooms);
			} else {
				console.error("Failed to fetch rooms");
				// Handle error - display error message to the user
			}
		} catch (error) {
			console.error("Error fetching rooms:", error);
			// Handle error - display error message to the user
		}
	}

	// Function to display existing rooms
	function displayRooms(rooms) {
		roomSelect.innerHTML = ""; // Clear previous room options

		rooms.forEach((room) => {
			const option = document.createElement("option");
			option.value = room.id;
			option.textContent = `${room.roomName} - ${room.department} - roomID: ${room.id}`;
			roomSelect.appendChild(option);
		});
	}

	// Add event listener to delete button
	const deleteRoomButton = document.getElementById("deleteRoomButton");
	deleteRoomButton.addEventListener("click", function () {
		const roomId = roomSelect.value;
		if (roomId) {
			const confirmDelete = confirm(
				`Are you sure you want to delete the selected room?`
			);
			if (confirmDelete) {
				// Perform delete action here
				alert("Room deleted!"); // Placeholder for actual delete action
			}
		} else {
			alert("Please select a room to delete.");
		}
	});
});
