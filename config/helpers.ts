/* eslint security/detect-object-injection:0 */
import * as path from 'path';
import * as fs from 'fs';

/**
 * Returns string NODE_ENV value
 */
export function string(name: string, defaultVal: string): string {
  return process.env[name] || defaultVal;
}

/**
 * Returns number NODE_ENV value
 */
export function number(name: string, defaultVal: number): number {
  return process.env[name] ? parseInt(process.env[name] || '', 10) : defaultVal;
}

/**
 * Returns boolean NODE_ENV value
 */
export function bool(name: string, defaultVal: boolean): boolean {
  return process.env[name] ? process.env[name] === 'true' || process.env[name] === '1' : defaultVal;
}

/**
 * Resolves application path
 */
// tslint:disable-next-line:tsr-detect-non-literal-fs-filename
const appDirectory = fs.realpathSync(process.cwd());

export function resolveApp(relativePath: string): string {
  return path.resolve(appDirectory, relativePath);
}
