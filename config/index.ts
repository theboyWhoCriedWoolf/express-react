// Ensure environment variables are read.
// tslint:disable-next-line:no-var-requires
import './env';

// type ValueMapType = { [key: string]: string | boolean | undefined };

interface IValueMAp {
  [index: string]: string | boolean | undefined;
}

let configCache: IValueMAp;

function resolveConfig(): IValueMAp {
  if (configCache) {
    return configCache;
  }
  // eslint-disable-next-line global-require
  configCache = require('./values').default;

  return configCache;
}

function getConfig(path: string): any {
  const parts = typeof path === 'string' ? path.split('.') : path;

  if (parts.length === 0) {
    throw new Error(
      'You must provide the path to the configuration value you would like to consume.',
    );
  }

  // const values: key: string]: any = resolveConfig();

  let result: { [index: string]: any } = resolveConfig();

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < parts.length; i += 1) {
    if (result === undefined) {
      const errorMessage = `Failed to resolve configuration value at "${parts.join('.')}".`;
      throw new Error(errorMessage);
    }

    result = result[parts[i]];
  }

  return result;
}

export default {
  get: getConfig,
};
