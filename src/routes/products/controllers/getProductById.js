const Product = require("../productSchema");

const getProductById = async (request, response) => {
  try {
    const id = request.params.id;
    const findProduct = await Product.findById(id);
    response.status(200).json({
      status: "success",
      product: findProduct
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "product was not found"
    });
  }
};

module.exports = getProductById;
