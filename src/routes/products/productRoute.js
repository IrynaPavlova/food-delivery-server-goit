const fs = require("fs");
const path = require("path");

const productRoute = (request, response) => {
  if (request.method === "GET") {
    const filePath = path.join(
      __dirname,
      "../../",
      "db",
      "products",
      "all-products.json"
    );

    response.writeHead(200, {
      "Content-Type": "aplication/json"
    });

    const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
    readStream.pipe(response);
  } else {
    response.writeHead(401, { "Content-Type": "text/plain" });
    response.end("Forbidden");
  }
};

module.exports = productRoute;
