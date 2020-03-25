const fs = require("fs");
const path = require("path");

const getUserById = (request, response) => {
  const id = request.params.id;

  const filePath = path.join(
    __dirname,
    "../../../",
    "db/users",
    "all-users.json"
  );

  const allUsers = JSON.parse(
    fs.readFileSync(filePath, (err, data) => {
      if (err) {
        console.log(err);
      }
    })
  );

  const user = allUsers.filter(elem => {
    return elem.userid == id;
  });

  if (user.length > 0) {
    response
      .set("Content-Type", "aplication/json")
      .status(200)
      .json({ status: "success", user });
    return;
  }
  response
    .set("Content-Type", "aplication/json")
    .status(404)
    .json({ status: "not found" });
  return;
};

module.exports = getUserById;
