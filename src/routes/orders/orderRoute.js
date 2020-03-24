const { Router } = require("express");
const createOrder = require("./controllers/createOrder");
//const getOrderById = require("./controllers/getOrderById");

const orderRoute = Router();

orderRoute.post("/", createOrder);
//orderRoute.get("/:id", getOrderById);

module.exports = orderRoute;
