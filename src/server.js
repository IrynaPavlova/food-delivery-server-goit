const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const corsMiddleware = require("cors");
//const verifyToken = require("./helpers/verifyToken");
const authRoute = require("./routes/auth/authRoute");
const productRoute = require("./routes/products/productRoute");
const userRoute = require("./routes/users/userRoute");
const orderRoute = require("./routes/orders/orderRoute");
const imageRoute = require("./routes/images/imageRoute");
const commentsRoute = require("./routes/comments/commentRoute");
const { mongodbUrl } = require("../config");
const app = express();

const errorHandler = (error, request, response, next) => {
  response.status(500).send("Error:" + error.stack);
};

const startServer = port => {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan("combined"))
  } else {
    app.use(morgan())
  }

  app
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use(express.static("static"))
    .use(corsMiddleware())
    //.use(verifyToken)
    .use("/auth", authRoute)
    .use("/products", productRoute)
    .use("/users", userRoute)
    .use("/orders", orderRoute)
    .use("/images", imageRoute)
    .use("/comments", commentsRoute)
    .use(errorHandler);

  mongoose.connect(
    mongodbUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    },
    err => {
      if (err) {
        console.log(err);
        process.exit(0);
      }
      app.listen(port, error => {
        if (error) {
          return console.log("Something bad happened", error);
        }
        console.log("Server listening on port", port);
      });
    }
  );
};

module.exports = startServer;
