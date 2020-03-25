const { Router } = require("express");
const createOrder = require("./controllers/createOrder");

const orderRoute = Router();

orderRoute.post("/", createOrder);

module.exports = orderRoute;
