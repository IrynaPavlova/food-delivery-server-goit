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

  const products = allProducts.filter(elem => {
    return elem.id == id;
  });

  if (products.length > 0) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify({ status: "success", products }));
    response.end();
    return;
  }

  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify({ status: "no products", products }));
  response.end();
};

module.exports = getProductById;
