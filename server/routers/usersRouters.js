require("dotenv").config();
const express = require("express");
const { userLogin } = require("../controllers/userControllers");

const usersRouter = express.Router();

usersRouter.post("/login", userLogin);

module.exports = usersRouter;
