const User = require("../userSchema");

const getAllUsers = async (request, response) => {
  try {
    const allUsers = await User.find();
    response.status(200).json({
      status: "success",
      users: allUsers
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: " no users"
    });
  }
};

module.exports = getAllUsers;
