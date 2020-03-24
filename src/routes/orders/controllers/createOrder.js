const Order = require("../orderSchema");
const User = require("../../users/userSchema");

const createOrder = (request, response) => {
  const order = request.body;

  const newOrder = new Order(order);
  //console.log("neworder", newOrder);
  const savedOrder = newOrder.save();

  const user = User.findById(savedOrder.creator);
  console.log("user", user);
  const userOrders = user.orders;
  //console.log("userOrders", userOrders);
  userOrders.push(order._id);

  const sendError = () => {
    response.status(400).json({
      status: "error",
      text: "order was not created"
    });
  };

  const sendResponse = newUser => {
    if (!newUser) {
      return sendError();
    }

    response.status(201).json({
      status: "success",
      oder: savedOrder
    });
  };

  User.findOneAndUpdate(
    { _id: savedOrder.creator, orders: userOrders },
    { new: true }
  )
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createOrder;
