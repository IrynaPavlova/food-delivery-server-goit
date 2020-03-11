const productRoute = require("./products/productRoute");
const userRoute = require("./users/userRoute");
const mainRoute = require("./main/mainRoute");

const router = {
  "/signup": userRoute,
  "/products": productRoute,
  default: mainRoute
};

module.exports = router;
