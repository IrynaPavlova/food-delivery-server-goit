const getProductById = (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("<h1>Product by id!</h1>");
  response.end();
};

module.exports = getProductById;
