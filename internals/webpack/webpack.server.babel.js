const { BannerPlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');
const SizePlugin = require('size-plugin');

const config = require('../../config');

// get the bundle configuration
const bundleConfig = config.get('bundles.server');

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (process.env.NODE_ENV !== 'production') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  mode: 'production',
  target: 'node',

  entry: {
    index: [bundleConfig.srcEntryFile],
  },

  output: {
    path: bundleConfig.outputPath,
    filename: '[name].js',
    // The name format for any additional chunks produced for the bundle.
    chunkFilename: '[name]-[chunkhash].js',
    libraryTarget: 'commonjs2',
  },

  module: {
    strictExportPresence: true,

    rules: [
      // Process application JS with Babel.
      // The preset includes JSX, Flow, and some ESnext features.
      {
        test: /\.(js|jsx|mjs)$/,
        // include: bundleConfig.srcPaths,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [
                ['@babel/preset-env', { modules: false, targets: { node: 'current' } }],
                '@babel/preset-flow',
              ],
            },
          },
        ],
      },
    ],
  },

  externals: [
    nodeExternals({
      whitelist: ['source-map-support/register']
        .filter(Boolean)
        .concat(config.get('nodeExternalsFileTypeWhitelist')),
    }),
  ],

  plugins: [
    new BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
    new SizePlugin(),
  ],

  devtool: 'cheap-module-eval-source-map',
};
