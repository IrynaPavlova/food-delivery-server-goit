const url = require("url");

const getAllProducts = require("./getAllProducts");
const getProductById = require("./getProductById");
const getProducByCategory = require("./getProductByCategory");

const productRoute = (request, response) => {
  if (request.method === "GET") {
    const parsedUrl = url.parse(request.url);
    const path = parsedUrl.path;

    const pathId = /products\/\d/;
    const pathCategory = /products\/\?category=[\d\D]/;

    path === "/products" && getAllProducts(request, response);
    path.match(pathId) && getProductById(request, response);
    path.match(pathCategory) && getProducByCategory(request, response);

    return;
  }
};

module.exports = productRoute;
