// @flow

/* eslint security/detect-object-injection:0 */
const path = require('path');
const fs = require('fs');

/**
  Returns string NODE_ENV value
*/
function string(name: string, defaultVal: string): string {
  return process.env[name] || defaultVal;
}

/**
  Returns number NODE_ENV value
*/
function number(name: string, defaultVal: number): number {
  return process.env[name] ? parseInt(process.env[name], 10) : defaultVal;
}

/**
  Returns boolean NODE_ENV value
*/
function bool(name: string, defaultVal: boolean): boolean {
  return process.env[name] ? process.env[name] === 'true' || process.env[name] === '1' : defaultVal;
}

/**
  Resolves application path
*/
// eslint-disable-next-line security/detect-non-literal-fs-filename
const appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath: string): string {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  string,
  number,
  bool,
  resolveApp,
};
