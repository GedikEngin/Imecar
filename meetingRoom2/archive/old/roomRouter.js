// userRouter.js
// passes in data and calls functions between auth.JS and userController.js
// acts as a middle man between the two

const roomController = require(`../controllers/roomController.js`);
const routerRoom = require(`express`).Router();

routerRoom.post(`/createRoom`, roomController.createRoom); // goes to userController.js and calls register function

routerRoom.get(`/getAllRooms`, roomController.getAllRooms); // goes to userController.js and calls register function

module.exports = routerRoom;
