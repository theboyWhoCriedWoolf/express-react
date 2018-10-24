module.exports = {
  apps: [
    {
      name: 'app',
      script: 'www/index.js',
      env: {
        NODE_PATH: 'www',
        NODE_ENV: 'production',
      },
    },
  ],
};
