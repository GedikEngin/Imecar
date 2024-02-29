document.addEventListener("DOMContentLoaded", function () {
	const roomList = document.getElementById("roomList");
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
		roomList.innerHTML = ""; // Clear previous room list

		rooms.forEach((room) => {
			const listItem = document.createElement("li");
			listItem.textContent = `${room.roomName} - Minimum Permission: ${room.minPermission} - Room ID: ${room.id}`;

			// Add event listener to delete the room when clicked
			listItem.addEventListener("click", async function () {
				const confirmDelete = confirm(
					`Are you sure you want to delete room "${room.roomName}"?`
				);
				if (confirmDelete) {
					try {
						const response = await fetch(`/room/delete/roomID/${room.id}`, {
							method: "DELETE",
						});

						if (response.ok) {
							// Room deleted successfully, refresh the room list
							fetchRooms();
						} else {
							const data = await response.json();
							console.error("Error deleting room:", data.message);
							// Handle error - display error message to the user
						}
					} catch (error) {
						console.error("Error deleting room:", error);
						// Handle error - display error message to the user
					}
				}
			});

			roomList.appendChild(listItem);
		});
	}
});
