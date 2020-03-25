const Product = require("../productSchema");

const updateProduct = async (request, response) => {
  try {
    const product = request.body;
    const id = request.params.id;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      product,
      {
        new: true
      }
    );
    response.status(201).json({
      status: "success",
      product: updatedProduct
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "there is no such product"
    });
  }
};

module.exports = updateProduct;
