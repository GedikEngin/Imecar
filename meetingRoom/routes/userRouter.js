// userRouter.js
// passes in data and calls functions between auth.JS and userController.js
// acts as a middle man between the two

const userController = require(`../controllers/userController.js`);
const routerUser = require(`express`).Router();

routerUser.post(`/login`, userController.login); // goes to userController.js and calls login function
routerUser.post(`/register`, userController.register); // goes to userController.js and calls register function

routerUser.get(`/getAllUsers`, userController.getAllUsers); // goes to userController.js and calls register function

module.exports = routerUser;
