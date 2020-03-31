const { Router } = require("express");
const authLogin = require("./controllers/authLogin");
const authLogout = require("./controllers/authLogout");
const authCurrent = require("./controllers/authCurrent");
const authRegister = require("./controllers/authRegister");

const authRoute = Router();

authRoute.post("/login", authLogin);
authRoute.get("/logout", authLogout);
authRoute.get("/current", authCurrent);
authRoute.post("/register", authRegister);

module.exports = authRoute;
