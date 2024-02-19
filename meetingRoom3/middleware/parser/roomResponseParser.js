exports.roomResponseParser = (room) => {
	return {
		roomID: room.roomID,
		roomName: room.roomName,
		minPermission: room.minPermission,
		department: room.department,
	};
};
