const { Router } = require("express");
const createUser = require("./controllers/createUser");
const getUserById = require("./controllers/getUserById");

const userRoute = Router();

userRoute.get("/:id", getUserById);
userRoute.post("/", createUser);

module.exports = userRoute;
