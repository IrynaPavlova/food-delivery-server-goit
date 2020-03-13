const http = require("http");
const url = require("url");
const morgan = require("morgan");
const router = require("./routes/router");
const logger = morgan("combined");

const startServer = port => {
  const server = http.createServer((request, response) => {
    const getClearUrl = url => {
      const lastIndex = url.lastIndexOf("/");
      if (lastIndex !== 0) {
        return url.slice(0, lastIndex);
      }
      return url;
    };

    const getRoute = (routerConfig, url) => {
      const clearUrl = getClearUrl(url);

      return routerConfig[clearUrl];
    };

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
