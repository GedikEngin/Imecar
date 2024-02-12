const { where } = require("sequelize");
const db = require(`../models`); // importing models file
// import { Op } from "@sequelize/core";
const { Op } = require("sequelize"); // imports op for comparisons

// creating main model

const Meeting = db.meetings;
const User = db.users;

// creates a meeting
const createMeeting = async (req, res) => {
	let info = {
		userID: req.body.userID,
		roomID: req.body.roomID,
		meetingDate: req.body.meetingDate,
		meetingStart: req.body.meetingStart,
		meetingEnd: req.body.meetingEnd,
	};
	const meeting = await Meeting.create(info);
	res.status(200).send(meeting);
	console.log(meeting);
};

// gets al meetings in db
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

const updateMeeting = async (req, res) => {
	console.log("inside update meeting");
	console.log(req.query);
	console.log(req.body);

	let userID = req.query.userID;
	let roomID = req.query.roomID;

	let meetingDate = req.body.meetingDate;
	let meetingStart = req.body.meetingStart;

	// let roomIDNew = req.body.roomIDNew;
	// let meetingDateNew = req.body.meetingDateNew;
	// let meetingStartNew = req.body.meetingStartNew;

	const meeting = await Meeting.update(
		{
			roomID: req.body.roomIDNew,
			meetingDate: req.body.meetingDateNew,
			meetingStart: req.body.meetingStartNew,
			meetingEnd: req.body.meetingEndNew,
		},
		{
			where: {
				userID: userID,
				roomID: roomID,
				meetingDate: meetingDate,
				meetingStart: meetingStart,
			},
		}
	);
	res.status(200).send("updated meeting");
};

const deleteMeeting = async (req, res) => {
	let userID = req.query.userID;
	let roomID = req.query.roomID;
	let meetingDate = req.body.meetingDate;
	let meetingStart = req.body.meetingStart;

	await Meeting.destroy({
		where: {
			userID: userID,
			roomID: roomID,
			meetingDate: meetingDate,
			meetingStart: meetingStart,
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
};
