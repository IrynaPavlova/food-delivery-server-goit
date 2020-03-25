const fs = require("fs");
const path = require("path");

const getProductById = (request, response) => {
  const stringIds = Object.values(request.query)[0];
  const ids = stringIds.slice(1, stringIds.length - 1).split(",");

  const filePath = path.join(
    __dirname,
    "../../../",
    "db",
    "products",
    "all-products.json"
  );

  const allProducts = JSON.parse(
    fs.readFileSync(filePath, (err, data) => {
      if (err) {
        return console.log(err);
      }
    })
  );

  const products = allProducts.filter(elem => {
    return ids.find(item => elem.id == item);
  });

  if (products.length > 0) {
    response
      .set("Content-Type", "aplication/json")
      .status(200)
      .json({ status: "success", products });
    return;
  } else {
    response
      .set("Content-Type", "aplication/json")
      .status(404)
      .json({ status: "no products", products });
    return;
  }
};

module.exports = getProductById;
