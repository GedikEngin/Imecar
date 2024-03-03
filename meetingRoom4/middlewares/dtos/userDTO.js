class UserDTO {
	constructor(id) {
		this.id = id;
	}

	static convertToDTO(userEntity) {
		return new UserDTO(userEntity.id);
	}
}

module.exports = UserDTO;
