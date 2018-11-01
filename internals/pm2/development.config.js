module.exports = {
  apps: [
    {
      name: 'app-dev',
      watch: true,
      script: 'server/index.ts',
      exec_interpreter: 'ts-node',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
