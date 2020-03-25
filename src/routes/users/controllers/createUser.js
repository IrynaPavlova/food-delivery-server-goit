const fs = require("fs");
const path = require("path");
const Joi = require("joi");

const validation = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  telephone: Joi.string().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
});

const createUser = (request, response) => {
  if (request.method === "POST") {
    const user = Joi.validate(request.body, validation);
    if (user.error) {
      return response.status(400).json(user.error.details[0].message);
    }

    const userId = Date.now();
    const userWithId = { userid: userId, ...user.value, images: [] };
    filePath = path.join(
      __dirname,
      "../../../",
      "db",
      "users",
      "all-users.json"
    );

    fs.readFile(filePath, (err, data) => {
      if (err) {
        return console.log(err);
      }
      const parsedData = JSON.parse(data);
      const allUsers = parsedData;
      allUsers.push(userWithId);

      fs.writeFile(filePath, JSON.stringify(allUsers), err => {
        if (err) {
          return console.log(err);
        }
      });
    });

    response
      .set("Content-Type", "aplication/json")
      .status(201)
      .json({ status: "success", user: userWithId });
    return;
  } else {
    response
      .set("Content-Type", "aplication/json")
      .status(400)
      .json({ error: "error" });
    return;
  }
};

module.exports = createUser;
