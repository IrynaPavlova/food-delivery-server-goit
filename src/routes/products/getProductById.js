const url = require("url");
const fs = require("fs");
const path = require("path");

const getId = url => {
  const lastIndex = url.lastIndexOf("/");

  if (lastIndex !== -1) {
    return url.slice(lastIndex + 1);
  }
};

const getProductById = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const id = getId(parsedUrl.path);

  const filePath = path.join(
    __dirname,
    "../../",
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
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: "success", products }));
    res.end();
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ status: "no products", products }));
  res.end();
};

module.exports = getProductById;
