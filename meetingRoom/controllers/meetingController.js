const { where } = require("sequelize");
const db = require(`../models`); // importing models file
// import { Op } from "@sequelize/core";
const { Op } = require("sequelize"); // imports op for comparisons
const { verifyToken } = require("../authorization/auth");

// creating main model

const Meeting = db.meetings;

// creates a meeting
const createMeeting = async (req, res) => {
	try {
		let info = {
			userID: req.body.userID,
			roomID: req.body.roomID,
			meetingDate: req.body.meetingDate,
			meetingStart: req.body.meetingStart,
			meetingEnd: req.body.meetingEnd,
		};

		// Check for overlapping meetings
		const overlappingMeeting = await Meeting.findOne({
			where: {
				roomID: info.roomID,
				meetingDate: info.meetingDate,
				[Op.or]: [
					{
						meetingStart: {
							[Op.between]: [info.meetingStart, info.meetingEnd],
						},
					},
					{
						meetingEnd: {
							[Op.between]: [info.meetingStart, info.meetingEnd],
						},
					},
				],
			},
		});

		if (overlappingMeeting) {
			return res.status(400).send("Meeting overlaps with an existing meeting.");
		}

		// If no overlapping meeting found, create the new meeting
		const meeting = await Meeting.create(info);
		res.status(200).send(meeting);
		console.log(meeting);
	} catch (error) {
		console.error("Error creating meeting:", error);
		res.status(500).send("Error creating meeting.");
	}
};

// gets all meetings in db
const getAllMeetings = async (req, res) => {
	let meetings = await Meeting.findAll({});
	res.status(200).send(meetings);
	console.log(meetings);
};

// gets all meetings in-between two dates, if you want to query one day
// use same start and end date as its inclusive
const getAllMeetingsBetween = async (req, res) => {
	queryDateStart = req.body.queryDateStart;
	queryDateEnd = req.body.queryDateEnd;

	const meetings = await Meeting.findAll({
		where: {
			meetingDate: { [Op.between]: [queryDateStart, queryDateEnd] },
		},
	});
	res.status(200).send(meetings);
	console.log(meetings);
};

// gets all meetings based on userID in param (url) and specified dates (body)
const getMeetingsUserID = async (req, res) => {
	userID = req.query.userID;

	queryDateStart = req.body.queryDateStart;
	queryDateEnd = req.body.queryDateEnd;

	const meetings = await Meeting.findAll({
		where: {
			userID: userID,
			meetingDate: { [Op.between]: [queryDateStart, queryDateEnd] },
		},
	});
	res.status(200).send(meetings);
	console.log(meetings);
};

// gets meetings based on roomID (param/url) and the specified time frame (body)
const getMeetingsRoomID = async (req, res) => {
	roomID = req.query.roomID;

	queryDateStart = req.body.queryDateStart;
	queryDateEnd = req.body.queryDateEnd;

	const meetings = await Meeting.findAll({
		where: {
			roomID: roomID,
			meetingDate: { [Op.between]: [queryDateStart, queryDateEnd] },
		},
	});
	res.status(200).send(meetings);
	console.log(meetings);
};

// gets meetings based on roomID (param/url) and the specified time frame (body)
const getMeetingsRoomIDPost = async (req, res) => {
	roomID = req.query.roomID;

	queryDateStart = req.body.queryDateStart;
	queryDateEnd = req.body.queryDateEnd;

	const meetings = await Meeting.findAll({
		where: {
			roomID: roomID,
			meetingDate: { [Op.between]: [queryDateStart, queryDateEnd] },
		},
	});
	res.status(200).send(meetings);
	console.log(meetings);
};

const updateMeeting = async (req, res) => {
	try {
		console.log("inside update meeting");
		console.log(req.query);
		console.log(req.body);

		let meetingID = req.query.meetingID;

		// Get the existing meeting details
		const existingMeeting = await Meeting.findByPk(meetingID);

		// Check for overlapping meetings with the updated meeting
		const overlappingMeeting = await Meeting.findOne({
			where: {
				roomID: existingMeeting.roomID,
				meetingDate: req.body.meetingDateNew,
				[Op.or]: [
					{
						meetingStart: {
							[Op.between]: [req.body.meetingStartNew, req.body.meetingEndNew],
						},
					},
					{
						meetingEnd: {
							[Op.between]: [req.body.meetingStartNew, req.body.meetingEndNew],
						},
					},
				],
				meetingID: {
					[Op.ne]: meetingID, // Exclude the current meeting from the check
				},
			},
		});

		if (overlappingMeeting && overlappingMeeting.meetingID != meetingID) {
			return res
				.status(400)
				.send(
					"Cannot update meeting. It overlaps with an existing meeting in the same room."
				);
		}

		// If no overlapping meeting found or it's the same meeting being updated, proceed with the update
		await Meeting.update(
			{
				roomID: req.body.roomIDNew,
				meetingDate: req.body.meetingDateNew,
				meetingStart: req.body.meetingStartNew,
				meetingEnd: req.body.meetingEndNew,
			},
			{
				where: {
					meetingID: meetingID,
				},
			}
		);
		res.status(200).send("Updated meeting");
	} catch (error) {
		console.error("Error updating meeting:", error);
		res.status(500).send("Error updating meeting.");
	}
};

const deleteMeeting = async (req, res) => {
	let meetingID = req.query.meetingID;

	await Meeting.destroy({
		where: {
			meetingID: meetingID,
		},
	});
	res.status(200).send(`meeting deleted`);
};

module.exports = {
	createMeeting,
	getAllMeetings,
	getAllMeetingsBetween,
	getMeetingsUserID,
	getMeetingsRoomID,
	updateMeeting,
	deleteMeeting,
	getMeetingsRoomIDPost,
};
