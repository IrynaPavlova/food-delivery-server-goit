const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const corsMiddleware = require("cors");
const productRoute = require("./routes/products/productRoute");
const userRoute = require("./routes/users/userRoute");
const orderRoute = require("./routes/orders/orderRoute");
const imageRoute = require("./routes/images/imageRoute");
const { mongodbUrl } = require("../config");
const app = express();

const errorHandler = (error, request, response, next) => {
  response.status(500).send("Error:" + error.stack);
};

const startServer = port => {
  app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(express.json())
    .use(express.static("static"))
    .use(corsMiddleware())
    .use(morgan("combined"))
    .use("/products", productRoute)
    .use("/users", userRoute)
    .use("/orders", orderRoute)
    .use("/images", imageRoute)
    .use(errorHandler);

  mongoose.connect(
    mongodbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (err) return console.log(err);
      app.listen(port, error => {
        if (error) {
          return console.log("Somthing bad happened", error);
        }
        console.log("Server listening on port", port);
      });
    }
  );
};

module.exports = startServer;
