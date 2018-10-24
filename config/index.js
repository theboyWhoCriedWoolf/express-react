// Ensure environment variables are read.
require('./env');

let configCache;

function resolveConfig() {
  if (configCache) {
    return configCache;
  }
  // eslint-disable-next-line global-require
  configCache = require('./values');

  return configCache;
}

function getConfig(path) {
  const parts = typeof path === 'string' ? path.split('.') : path;

  if (parts.length === 0) {
    throw new Error(
      'You must provide the path to the configuration value you would like to consume.',
    );
  }

  let result = resolveConfig();
  for (let i = 0; i < parts.length; i += 1) {
    if (result === undefined) {
      const errorMessage = `Failed to resolve configuration value at "${parts.join('.')}".`;
      throw new Error(errorMessage);
    }
    // eslint-disable-next-line security/detect-object-injection
    result = result[parts[i]];
  }

  return result;
}

module.exports = {
  get: getConfig,
};
