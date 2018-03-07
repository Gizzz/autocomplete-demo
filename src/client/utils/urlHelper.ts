const getBaseUrl = () => {
  let baseUrl;

  // if client runs in production (github-pages hosting)
  if (window.location.href.includes(`github.io`)) {
    baseUrl = `https://autocomplete-demo-awniuaujwv.now.sh`;
  } else {
    baseUrl = `http://localhost:9000`;
  }

  return baseUrl;
};

export { getBaseUrl };
