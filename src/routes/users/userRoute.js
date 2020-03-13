const fs = require("fs");
const path = require("path");
const id = require("shortid");

const saveUser = (user, response) => {
  const file = `${user.username.toLowerCase()}${user.userid}.json`;

  const userPath = path.resolve(__dirname, "../../", "db", "users", file);
  fs.writeFile(userPath, JSON.stringify(user), err => {
    if (err) throw err;

    fs.readFile(userPath, (err, data) => {
      if (err) throw err;
      response.writeHead(200, { "Content-Type": "aplication/json" });
      response.end(data);
    });
  });
};

const userRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body = body + data;
    });

    request.on("end", function() {
      let user = JSON.parse(body);
      const userId = id.generate();
      user = { userid: userId, ...user };
      saveUser(user, response);
    });
  } else {
    response.writeHead(401, { "Content-Type": "text/plain" });
    response.end("Forbidden");
  }
};

module.exports = userRoute;
