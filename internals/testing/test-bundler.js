const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  babelrc: true,
  configFile: false,
});
