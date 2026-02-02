module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npm',
      args: 'start',
      cwd: '/srv/marvel/frontend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3006,
      },
      // Logging
      log_file: '/home/blak_ros3s/.pm2/logs/frontend.log',
      out_file: '/home/blak_ros3s/.pm2/logs/frontend-out.log',
      error_file: '/home/blak_ros3s/.pm2/logs/frontend-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      // Performance
      exec_mode: 'fork',
      wait_ready: false,
      listen_timeout: 10000,
      kill_timeout: 5000,
    },
  ],
};