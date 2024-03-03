// resourceNotFoundErrorResponse.js

const resourceNotFoundErrorResponse = (status, level, description, data) => {
	const responseJson = {
		header: {
			info: {
				identifier: "meetingRoomApp",
				version: {
					major: 1,
					minor: 1,
					build: 1,
				},
			},
			status: status,
			messages: {
				level: level,
				description: description,
				data: data,
			},
		},
		body: {
			data: {},
		},
	};
	return responseJson;
};

module.exports = resourceNotFoundErrorResponse;
