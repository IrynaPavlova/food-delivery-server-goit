const fs = require("fs");
const path = require("path");
const Joi = require("joi");

const validation = Joi.object().keys({
  user: Joi.number().required(),
  products: Joi.array().required(),
  deliveryType: Joi.string().required(),
  deliveryAdress: Joi.string().required()
});

const createOrder = (request, response) => {
  if (request.method === "POST") {
    const order = Joi.validate(request.body, validation);
    if (order.error) {
      return response.status(400).json(order.error.details[0].message);
    }

    filePathToProducts = path.join(
      __dirname,
      "../../../",
      "db",
      "products",
      "all-products.json"
    );

    const allProducts = JSON.parse(
      fs.readFileSync(filePathToProducts, (err, data) => {
        if (err) {
          console.log(err);
        }
      })
    );

    const orderedProducts = order.value.products;
    const products = allProducts.filter(elem => {
      return orderedProducts.find(item => elem.id == item);
    });

    const orderToSave = {
      id: Date.now(),
      user: order.value.user,
      products: products,
      deliveryType: order.value.deliveryType,
      deliveryAdress: order.value.deliveryAdress
    };

    filePathToOrders = path.join(
      __dirname,
      "../../../",
      "db",
      "orders",
      "all-orders.json"
    );

    fs.readFile(filePathToOrders, (err, data) => {
      if (err) {
        return console.log(err);
      }
      const parsedData = JSON.parse(data);
      const allOrders = parsedData;
      allOrders.push(orderToSave);

      fs.writeFile(filePathToOrders, JSON.stringify(allOrders), err => {
        if (err) {
          return console.log(err);
        }
      });
    });

    if (products.length > 0) {
      response
        .set("Content-Type", "aplication/json")
        .status(200)
        .json({ status: "success", order: orderToSave });
      return;
    } else
      response
        .set("Content-Type", "aplication/json")
        .status(404)
        .json({ status: "failed", order: null });
    return;
  }
};

module.exports = createOrder;
