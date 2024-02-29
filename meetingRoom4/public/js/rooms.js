document.addEventListener("DOMContentLoaded", function () {
	const roomSelect = document.getElementById("roomSelect");
	const deleteRoomButton = document.getElementById("deleteRoomButton");
	const createRoomForm = document.getElementById("createRoomForm");

	// Fetch and display existing rooms when the page loads
	fetchRooms();

	// Add event listener for delete button
	deleteRoomButton.addEventListener("click", function () {
		const roomId = roomSelect.value;
		if (roomId) {
			const confirmDelete = confirm(
				`Are you sure you want to delete the selected room?`
			);
			if (confirmDelete) {
				// Send DELETE request to delete room by ID
				deleteRoomById(roomId);
			}
		} else {
			alert("Please select a room to delete.");
		}
	});

	// Add event listener for create room form submission
	createRoomForm.addEventListener("submit", async function (event) {
		event.preventDefault();
		const formData = new FormData(createRoomForm);
		const roomName = formData.get("roomName");
		const minPermission = formData.get("minPermission");
		const department = formData.get("department");

		// Check if the room with the same name already exists
		const existingRoom = await checkExistingRoom(roomName);
		if (existingRoom) {
			alert("A room with the same name already exists.");
		} else {
			// If the room doesn't exist, proceed to create it
			createRoom({ roomName, minPermission, department });
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
			option.value = room.roomID;
			option.textContent = `${room.roomName} - ${room.department} - roomID: ${room.roomID}`;
			roomSelect.appendChild(option);
		});
	}

	// Function to delete room by ID
	async function deleteRoomById(roomId) {
		try {
			const response = await fetch(`/room/delete/roomID/${roomId}`, {
				method: "DELETE",
			});
			if (response.ok) {
				alert("Room deleted successfully");
				// Refresh room list after deletion
				fetchRooms();
			} else {
				console.error("Failed to delete room");
				// Handle error - display error message to the user
			}
		} catch (error) {
			console.error("Error deleting room:", error);
			// Handle error - display error message to the user
		}
	}

	// Function to create a new room
	async function createRoom(roomData) {
		try {
			const response = await fetch("/room/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(roomData),
			});
			if (response.ok) {
				alert("Room created successfully");
				// Refresh room list after creation
				fetchRooms();
			} else {
				console.error("Failed to create room");
				// Handle error - display error message to the user
			}
		} catch (error) {
			console.error("Error creating room:", error);
			// Handle error - display error message to the user
		}
	}

	// Function to check if a room with the same name already exists
	async function checkExistingRoom(roomName) {
		try {
			const response = await fetch(`/room/search/roomName/${roomName}`);
			if (response.ok) {
				const room = await response.json();
				return room !== null; // Returns true if room exists, false otherwise
			} else {
				console.error("Failed to check existing room");
				// Handle error - display error message to the user
			}
		} catch (error) {
			console.error("Error checking existing room:", error);
			// Handle error - display error message to the user
		}
	}
});
