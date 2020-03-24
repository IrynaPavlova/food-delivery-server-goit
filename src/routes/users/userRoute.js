const { Router } = require("express");
const createUser = require("./controllers/createUser");
const getUserById = require("./controllers/getUserById");
const updateUser = require("./controllers/updateUser");

const userRoute = Router();

userRoute.get("/:id", getUserById);
userRoute.post("/", createUser);
userRoute.put("/:id", updateUser);

module.exports = userRoute;
