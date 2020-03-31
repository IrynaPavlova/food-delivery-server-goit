///!!!!!!!Добавить проверку на наличие токена ко всем роутам в приложении кроме auth/login, auth/register
const authLogout = async (request, response) => {
  try {
    console.log("request.session", request.session);
    response.status(200).json({ status: "success", text: "user was logout" });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "user was not logout"
    });
  }
};

module.exports = authLogout;
