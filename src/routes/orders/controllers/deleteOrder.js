const Order = require("../orderSchema");

const deleteOrder = async (request, response) => {
  try {
    const id = request.params.id;

    const orderToDelete = await Order.findById(id);
    await orderToDelete.remove();

    response.status(200).json({
      status: "success",
      deletedOder: orderToDelete
    });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "order was not deleted"
    });
  }
};

module.exports = deleteOrder;
