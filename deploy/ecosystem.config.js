module.exports = {
  apps: [
    {
      name: 'hygiea',
      cwd: '/home/ubuntu/hygiea',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      max_restarts: 10,
      restart_delay: 5000,
      watch: false,
    },
    {
      name: 'reports',
      cwd: '/home/ubuntu/reports',
      script: '.venv/bin/python3',
      args: 'web_server.py',
      env: {
        PORT: '5050',
        FLASK_ENV: 'production',
      },
      max_restarts: 10,
      restart_delay: 5000,
      watch: false,
    },
  ],
};
