const Order = require("../orderSchema");

const getOrderById = async (request, response) => {
  try {
    const id = request.params.id;
    const findOrder = await Order.findById(id);
    response.status(200).json({
      status: "success",
      order: findOrder
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "order was not found"
    });
  }
};
module.exports = getOrderById;
