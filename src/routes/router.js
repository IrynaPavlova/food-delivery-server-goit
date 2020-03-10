const productRouter = require("./products/productRouter");
const userRouter = require("./users/userRouter");
const mainRouter = require("./main/mainRouter");

const router = {
  "/signup": userRouter,
  "/products": productRouter,
  default: mainRouter
};

module.exports = router;
