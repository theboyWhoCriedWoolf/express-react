// @flow

/**
 * Setup pretty error
 * @return {object} prettyError
 */
export default (() => {
  // eslint-disable-next-line global-require
  const prettyErrorHandler = require('pretty-error').start();
  prettyErrorHandler.skipNodeFiles();
  prettyErrorHandler.skipPackage('express');

  return prettyErrorHandler;
})();
