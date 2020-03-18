const fs = require("fs");
const path = require("path");
const url = require("url");
const qs = require("querystring");

const getProductByCategory = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const pathCategory = parsedUrl.path;
  const objectCategory = qs.parse(pathCategory);
  const stringCategory = Object.values(objectCategory)[0];
  const category = stringCategory.slice(1, stringCategory.length - 1);

  const filePath = path.join(
    __dirname,
    "../../",
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