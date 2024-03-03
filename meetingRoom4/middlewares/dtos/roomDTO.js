class RoomDTO {
	constructor(roomID, roomName, minPermission, department) {
		this.roomID = roomID;
		this.roomName = roomName;
		this.minPermission = minPermission;
		this.department = department;
	}

	static convertToDTO(roomEntity) {
		return new RoomDTO(
			roomEntity.roomID,
			roomEntity.roomName,
			roomEntity.minPermission,
			roomEntity.department
		);
	}
}

module.exports = RoomDTO;
