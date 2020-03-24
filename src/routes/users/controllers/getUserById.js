const User = require("../userSchema");

const getUserById = (request, response) => {
  const id = request.params.id;

  const sendResponse = user => {
    response.status(200).json({
      status: "success",
      user: user
    });
  };

  const sendError = () => {
    response.status(400).json({
      status: "error",
      text: "user was not found"
    });
  };

  const findUser = User.findById(id);

  findUser.then(sendResponse).catch(sendError);
};

module.exports = getUserById;
