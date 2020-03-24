const Product = require("../productSchema");

const deleteProduct = async (request, response) => {
  try {
    const id = request.params.id;

    const productToDelete = await Product.findById(id);
    await productToDelete.remove();

    response.status(200).json({
      status: "success",
      deletedProduct: productToDelete
    });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "product was not deleted"
    });
  }
};

module.exports = deleteProduct;
