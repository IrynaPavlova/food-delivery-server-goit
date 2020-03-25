const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const { port } = require("../../../../config");

const validation = Joi.object().keys({
  userId: Joi.string().required(),
  file: Joi.object().required()
});

const saveImage = (request, response) => {
  if (request.method === "POST") {
    const body = request.body;
    const validateBody = Joi.validate(body, validation);
    if (validateBody.error) {
      return response.status(400).json(validateBody.error.details[0].message);
    }

    const userId = validateBody.value.userId;
    const imagePath = validateBody.value.file.path;
    const imageStats = path.parse(imagePath);
    const imageUrl = `http://localhost:${port}/` + imageStats.base;

    usersfilePath = path.join(
      __dirname,
      "../../../",
      "db",
      "users",
      "all-users.json"
    );

    fs.readFile(usersfilePath, (err, data) => {
      if (err) {
        return console.log(err);
      }
      const parsedData = JSON.parse(data);
      const allUsers = parsedData;

      const users = allUsers.filter(elem => {
        return elem.userid == userId ? elem.images.push(imageUrl) : elem;
      });

      fs.writeFile(usersfilePath, JSON.stringify(users), err => {
        if (err) {
          return console.log(err);
        }
      });
    });

    response
      .set()
      .status(201)
      .json({ status: `was saved in:user-${userId}` });
    return;
  } else {
    response
      .set()
      .status(400)
      .json({ error: "error" });
    return;
  }
};

module.exports = saveImage;
