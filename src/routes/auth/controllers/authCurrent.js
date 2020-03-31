const jwt = require("jsonwebtoken");
const User = require("../../users/userSchema");

const getToken = request =>
  request.body.token ||
  request.query.token ||
  request.headers["x-access-token"];

const authCurrent = async (request, response) => {
  try {
    const token = getToken(request);
    const userData = jwt.decode(token);
    const user = await User.findById(userData.id);

    response.status(200).json({ status: "success", user: user });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "user was not found"
    });
  }
};

module.exports = authCurrent;
