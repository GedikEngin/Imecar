exports.userResponseParser = (user) => {
	return {
		userID: user.userID,
		username: user.username,
		permission: user.permission,
		department: user.department,
	};
};
