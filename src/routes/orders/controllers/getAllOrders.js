const Order = require("../orderSchema");

const getAllOrders = async (request, response) => {
  try {
    const allOrders = await Order.find();
    response.status(200).json({
      status: "success",
      orders: allOrders
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: " no orders"
    });
  }
};

module.exports = getAllOrders;
