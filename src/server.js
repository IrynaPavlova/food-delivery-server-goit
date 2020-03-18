const http = require("http");
const url = require("url");
const morgan = require("morgan");
const router = require("./routes/router");
const logger = morgan("combined");
const getRoute = require("./helpers/getRoute");

const startServer = port => {
  const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url);

    const func = getRoute(router, parsedUrl.pathname) || router.default;

    logger(request, response, () => func(request, response));
  });
  server.listen(port, err => {
    if (err) {
      return console.log("Somthing bad happened", err);
    }
    console.log("Server listening on port", port);
  });
};

module.exports = startServer;