class MeetingDTO {
	constructor(
		meetingID,
		roomID,
		userID,
		meetingDate,
		meetingStart,
		meetingEnd
	) {
		this.meetingID = meetingID;
		this.roomID = roomID;
		this.userID = userID;
		this.meetingDate = meetingDate;
		this.meetingStart = meetingStart;
		this.meetingEnd = meetingEnd;
	}

	static convertToDTO(meetingEntity) {
		return new MeetingDTO(
			meetingEntity.meetingID,
			meetingEntity.roomID,
			meetingEntity.userID,
			meetingEntity.meetingDate,
			meetingEntity.meetingStart,
			meetingEntity.meetingEnd
		);
	}
}

module.exports = MeetingDTO;
