// userDTO.js

class UserDTO {
	constructor(userID, username, permission, department) {
		this.userID = userID;
		this.username = username;
		this.permission = permission;
		this.department = department;
	}
}

module.exports = { UserDTO };
