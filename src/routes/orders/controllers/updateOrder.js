const Order = require("../orderSchema");

const updateOrder = async (request, response) => {
  try {
    const order = request.body;
    const id = request.params.id;

    const updatedOrder = await Order.findOneAndUpdate({ _id: id }, order, {
      new: true
    });
    response.status(201).json({
      status: "success",
      order: updatedOrder
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "there is no such order"
    });
  }
};

module.exports = updateOrder;
