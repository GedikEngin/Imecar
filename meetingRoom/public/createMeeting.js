// Assuming you have a function to get user's permission and rooms' data
async function getUserPermission() {
	// Fetch user's permission from your database
	// This is just a placeholder
	return 2;
}

async function getRoomsData() {
	// Fetch rooms' data from your database
	// This should return an array of objects, each containing room's name and min permission
	// This is just a placeholder
	return [
		{ name: "Room 1", minPermission: 0 },
		{ name: "Room 2", minPermission: 1 },
		{ name: "Room 3", minPermission: 2 },
		// ...
	];
}

window.onload = async function () {
	const userPermission = await getUserPermission();
	const roomsData = await getRoomsData();

	const roomSelect = document.getElementById("roomSelect");

	// Filter rooms based on user's permission
	const availableRooms = roomsData.filter(
		(room) => room.minPermission >= userPermission
	);

	// Populate the select element with available rooms
	availableRooms.forEach((room) => {
		const option = document.createElement("option");
		option.value = room.name;
		option.text = room.name;
		roomSelect.appendChild(option);
	});
};
