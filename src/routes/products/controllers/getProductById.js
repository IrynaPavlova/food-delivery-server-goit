const fs = require("fs");
const path = require("path");

const getProductById = (request, response) => {
  const id = request.params.id;

  const filePath = path.join(
    __dirname,
    "../../../",
    "db/products",
    "all-products.json"
  );

  const allProducts = JSON.parse(
    fs.readFileSync(filePath, (err, data) => {
      if (err) {
        console.log(err);
      }
    })
  );

  const product = allProducts.filter(elem => {
    return elem.id == id;
  });

  if (product.length > 0) {
    response
      .set("Content-Type", "aplication/json")
      .status(200)
      .json({ status: "success", product });
    return;
  } else {
    response
      .set("Content-Type", "aplication/json")
      .status(404)
      .json({ status: "no products", product });
    return;
  }
};

module.exports = getProductById;
