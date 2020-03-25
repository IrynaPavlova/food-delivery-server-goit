const fs = require("fs");
const path = require("path");

const getAllProducts = (request, response) => {
  if (request.method === "GET") {
    const filePath = path.join(
      __dirname,
      "../../../",
      "db",
      "products",
      "all-products.json"
    );

    response.set("Content-Type", "aplication/json").status(200);

    const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
    readStream.pipe(response);
  } else {
    response.set("Content-Type", "text/plain").status(401);
  }
};

module.exports = getAllProducts;
