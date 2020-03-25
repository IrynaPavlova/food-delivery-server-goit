const User = require("../userSchema");

const deleteUser = async (request, response) => {
  try {
    const id = request.params.id;

    const userToDelete = await User.findById(id);
    await userToDelete.remove();

    response.status(200).json({
      status: "success",
      deletedUser: userToDelete
    });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "user was not deleted"
    });
  }
};

module.exports = deleteUser;
