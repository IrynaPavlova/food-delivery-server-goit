const User = require("../userSchema");
const bcrypt = require("bcrypt");

const updateUser = async (request, response) => {
  try {
    const user = request.body;
    const id = request.params.id;

    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate({ _id: id }, user, {
      new: true
    });
    response.status(201).json({
      status: "success",
      user: updatedUser
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "there is no such user"
    });
  }
};

module.exports = updateUser;
