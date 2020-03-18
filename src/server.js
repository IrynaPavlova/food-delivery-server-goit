const morgan = require("morgan");
const express = require("express");
const corsMiddleware = require("cors");
const productRoute = require("./routes/products/productRoute");
const userRoute = require("./routes/users/userRoute");
const app = express();

const errorHandler = (error, request, response, next) => {
  response.status(500).send("Error found: " + error.stack);
};

const startServer = port => {
  app
    .use(express.json())
    .use(corsMiddleware())
    .use(morgan("dev"))
    .use("/products", productRoute)
    .use("/users", userRoute)
    .use(errorHandler);

  app.listen(port, error => {
    if (error) {
      return console.log("Somthing bad happened", error);
    }
    console.log("Server listening on port", port);
  });
};

module.exports = startServer;
