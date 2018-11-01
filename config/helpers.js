"use strict";
exports.__esModule = true;
/* eslint security/detect-object-injection:0 */
var path = require("path");
var fs = require("fs");
/**
 * Returns string NODE_ENV value
 */
function string(name, defaultVal) {
    return process.env[name] || defaultVal;
}
exports.string = string;
/**
 * Returns number NODE_ENV value
 */
function number(name, defaultVal) {
    return process.env[name] ? parseInt(process.env[name] || '', 10) : defaultVal;
}
exports.number = number;
/**
 * Returns boolean NODE_ENV value
 */
function bool(name, defaultVal) {
    return process.env[name] ? process.env[name] === 'true' || process.env[name] === '1' : defaultVal;
}
exports.bool = bool;
/**
 * Resolves application path
 */
// tslint:disable-next-line:tsr-detect-non-literal-fs-filename
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}
exports.resolveApp = resolveApp;
