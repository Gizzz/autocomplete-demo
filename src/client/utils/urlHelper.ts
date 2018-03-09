const getBaseUrl = () => {
  let baseUrl;

  // try heroku and if works - remove this file
  baseUrl = ``;

  // // if client runs in production (github-pages hosting)
  // if (window.location.href.includes(`autocomplete-demo`)) {
  //   baseUrl = ``;
  // } else {
  //   baseUrl = `http://localhost:9000`;
  // }

  return baseUrl;
};

export { getBaseUrl };
