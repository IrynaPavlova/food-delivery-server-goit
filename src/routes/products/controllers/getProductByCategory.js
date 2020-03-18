const fs = require("fs");
const path = require("path");

const getProductByCategory = (request, response) => {
  const stringCategory = Object.values(request.query)[0];
  const category = stringCategory.slice(1, stringCategory.length - 1);

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
    return elem.categories == category;
  });

  if (products.length > 0) {
    response.writeHead(200, {
      "Content-Type": "aplication/json"
    });
    response.write(JSON.stringify({ status: "success", products }));
    response.end();
    return;
  } else {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify({ status: "no products", products }));
    response.end();
    return;
  }
};

module.exports = getProductByCategory;
