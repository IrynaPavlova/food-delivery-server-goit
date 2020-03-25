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

module.exports = getRoute;
