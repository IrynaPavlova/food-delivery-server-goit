const Product = require("../productSchema");

const getAllProducts = async (request, response) => {
  try {
    const allProducts = await Product.find().populate("ingredients");
    response.status(200).json({
      status: "success",
      products: allProducts
    });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "no products"
    });
  }
};

module.exports = getAllProducts;
