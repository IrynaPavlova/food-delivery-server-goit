const Product = require("../productSchema");

const createProduct = async (request, response) => {
  try {
    const product = request.body;

    const newProduct = new Product(product);
    const productToSave = await newProduct.save();

    response.status(201).json({
      status: "success",
      product: productToSave
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "product was not saved"
    });
  }
};

module.exports = createProduct;
