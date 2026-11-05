// pm2 process file:  pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "monsoon",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      env: { NODE_ENV: "production" },
      max_memory_restart: "700M",
    },
  ],
};
