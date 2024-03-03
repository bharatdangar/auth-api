const express = require("express");
const routes =  express.Router();

const { userRegisterValidate, userLoginValidate } = require("../utils/userValidation");

const { registerUser, loginUser, getUsersData } = require("../userController");

const { ensureAuthenticated } = require("../utils/auth")

//Register
routes.post("/register", userRegisterValidate, registerUser)

//Login 
routes.post("/login", userLoginValidate, loginUser)

routes.get("/users", ensureAuthenticated, getUsersData)

module.exports = routes;

