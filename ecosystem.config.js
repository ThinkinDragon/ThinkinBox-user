module.exports = {
  apps: [
    {
      name: 'Neo User',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
}
