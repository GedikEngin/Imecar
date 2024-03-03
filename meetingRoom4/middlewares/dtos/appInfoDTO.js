class AppInfoDTO {
	constructor(id, os, version) {
		this.id = id;
		this.os = os;
		this.version = version;
	}

	static convertToDTO(appInfoEntity) {
		return new AppInfoDTO(
			appInfoEntity.id,
			appInfoEntity.os,
			appInfoEntity.version
		);
	}
}

module.exports = AppInfoDTO;
