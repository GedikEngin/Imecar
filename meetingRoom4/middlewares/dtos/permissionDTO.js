class PermissionDTO {
	constructor(id) {
		this.id = id;
	}

	static convertToDTO(permissionEntity) {
		return new PermissionDTO(permissionEntity.id);
	}
}

module.exports = PermissionDTO;
