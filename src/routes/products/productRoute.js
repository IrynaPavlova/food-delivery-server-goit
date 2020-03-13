const url = require("url");

const getAllProducts = require("./getAllProducts");
const getProductById = require("./getProductById");
const getProductByCategory = require("./getProductByCategory");
const getProductByIds = require("./getProductsByIds");

const productRoute = (request, response) => {
  if (request.method === "GET") {
    const parsedUrl = url.parse(request.url);
    const path = parsedUrl.path;

    const pathId = /products\/\d/;
    const pathIds = /products\/\?ids=[\d\D]/;
    const pathCategory = /products\/\?category=[\d\D]/;

    path === "/products" && getAllProducts(request, response);
    path.match(pathId) && getProductById(request, response);
    path.match(pathIds) && getProductByIds(request, response);
    path.match(pathCategory) && getProductByCategory(request, response);

    return;
  }
};

module.exports = productRoute;
