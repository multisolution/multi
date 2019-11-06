// next.config.js
const withCSS = require("@zeit/next-css");
module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  }
});

const withSass = require("@zeit/next-sass");
module.exports = withSass({});
