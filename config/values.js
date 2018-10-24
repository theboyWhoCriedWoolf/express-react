const { number, string, resolveApp } = require('./helpers');

module.exports = {
  // The port on which the server should run.
  port: number('PORT', 3000),
  // The host on which the server should run.
  host: string('HOST', 'localhost'),
  clientDevServerPort: number('CLIENT_DEV_PORT', 7331),
  browserCacheMaxAge: '365d',
  correlationHeader: string('CORRELATION_HEADER', 'x-request-id'),
  sslCertificates: {},

  cspExtensions: {
    childSrc: [],
    connectSrc: [],
    defaultSrc: [],
    fontSrc: [],
    imgSrc: [],
    mediaSrc: [],
    manifestSrc: [],
    objectSrc: [],
    scriptSrc: [
      // Allow scripts from cdn.polyfill.io so that we can import the
    ],
    styleSrc: [],
  },

  nodeExternalsFileTypeWhitelist: [
    /\.(eot|woff|woff2|ttf|otf)$/,
    /\.(svg|png|jpg|jpeg|gif|ico)$/,
    /\.(mp4|mp3|ogg|swf|webp)$/,
    /\.(css|scss|sass|sss|less)$/,
  ],
  bundles: {
    client: {
      srcEntryFile: resolveApp('src/index.js'),
      srcPaths: [resolveApp('src'), resolveApp('config')],
      outputPath: resolveApp('build'),
    },
    server: {
      srcEntryFile: resolveApp('server/index.js'),
      srcPaths: [resolveApp('server'), resolveApp('src'), resolveApp('config')],
      outputPath: resolveApp('www'),
    },
  },
};
