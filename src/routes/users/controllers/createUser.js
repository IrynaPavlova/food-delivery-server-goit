const User = require("../userSchema");
const bcrypt = require("bcrypt");

const createUser = async (request, response) => {
  try {
    const user = request.body;

    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const userData = { ...user, password: hashedPassword };

    const newUser = new User(userData);
    const userToSave = await newUser.save();

    response.status(201).json({
      status: "success",
      user: userToSave
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "user was not saved"
    });
  }
};

module.exports = createUser;
