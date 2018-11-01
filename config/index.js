"use strict";
exports.__esModule = true;
// Ensure environment variables are read.
// tslint:disable-next-line:no-var-requires
require("./env");
var configCache;
function resolveConfig() {
    if (configCache) {
        return configCache;
    }
    // eslint-disable-next-line global-require
    configCache = require('./values')["default"];
    return configCache;
}
function getConfig(path) {
    var parts = typeof path === 'string' ? path.split('.') : path;
    if (parts.length === 0) {
        throw new Error('You must provide the path to the configuration value you would like to consume.');
    }
    // const values: key: string]: any = resolveConfig();
    var result = resolveConfig();
    // tslint:disable-next-line:prefer-for-of
    for (var i = 0; i < parts.length; i += 1) {
        if (result === undefined) {
            var errorMessage = "Failed to resolve configuration value at \"" + parts.join('.') + "\".";
            throw new Error(errorMessage);
        }
        result = result[parts[i]];
    }
    return result;
}
exports["default"] = {
    get: getConfig
};
