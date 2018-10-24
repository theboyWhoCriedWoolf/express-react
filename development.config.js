module.exports = {
  apps: [
    {
      name: 'app-dev',
      script: './server/index.js',
      interpreter: 'babel-node',
      interpreter_args: '--presets env,flow',
      env: {
        NODE_PATH: 'src/',
        NODE_ENV: 'development',
      },
    },
  ],
};
