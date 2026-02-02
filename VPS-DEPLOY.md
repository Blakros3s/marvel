# VPS Deployment Guide - Frontend (PM2 Mode)

Deploy your Next.js site with PM2 process manager at `/srv/marvel/frontend`.

---

## Prerequisites

- VPS with Ubuntu 22.04+ (DigitalOcean, Linode, AWS EC2, etc.)
- SSH access
- Domain name (optional)
- Git repository on GitHub

---

## Server Setup

### 1. Connect to VPS

```bash
ssh user@your-server-ip
```

### 2. Install Node.js & npm

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version  # v20.x.x
npm --version   # 10.x.x
```

### 3. Install PM2 Globally

```bash
sudo npm install -g pm2

# Check installation
pm2 --version
```

### 4. Install Nginx (for reverse proxy)

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
```

### 5. Create Log Directory

```bash
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2
```

---

## Initial Setup on VPS

### 1. Clone Your Repository

```bash
# Create directory
sudo mkdir -p /srv
sudo chown -R $USER:$USER /srv
cd /srv

# Clone repository (replace with your repo)
git clone https://github.com/yourusername/frontend.git marvel
cd marvel

# Or if you already have a repo elsewhere, just:
# cd /srv/marvel
```

### 2. Install Dependencies & Build

```bash
cd frontend
npm ci
npm run build
```

### 3. Start with PM2

```bash
# Using ecosystem config
pm2 start ecosystem.config.js

# Or manually
pm2 start npm --name "frontend" -- start

# Save PM2 config
pm2 save

# Setup PM2 startup script
pm2 startup
# Run the command PM2 outputs (usually: sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u your-username --hp /home/your-username)
```

### 4. Check Status

```bash
pm2 list
pm2 logs frontend --lines 20
```

---

## Configure Nginx (Reverse Proxy)

### 1. Create Nginx Config

```bash
sudo nano /etc/nginx/sites-available/frontend
```

**Add this configuration:**

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Proxy to Next.js app on port 3002
    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 2. Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default
sudo nginx -t
sudo systemctl restart nginx
```

### 3. Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw allow 3002/tcp  # For direct PM2 access (optional)
sudo ufw enable
```

---

## Enable HTTPS (SSL)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## PM2 Commands Reference

| Command | Description |
|---------|-------------|
| `pm2 status` | Check all processes |
| `pm2 logs frontend` | View real-time logs |
| `pm2 logs frontend --lines 50` | View last 50 lines |
| `pm2 restart frontend` | Restart app |
| `pm2 stop frontend` | Stop app |
| `pm2 delete frontend` | Remove from PM2 |
| `pm2 monit` | Monitor in real-time |
| `pm2 save` | Save current process list |

---

## Manual Deploy (Quick Update)

If you need to manually deploy without GitHub Actions:

```bash
# SSH into VPS
ssh user@your-server-ip

# Navigate to project
cd /srv/marvel

# Pull latest code
git pull origin main

# Install dependencies
cd frontend && npm ci

# Build
cd frontend && npm run build

# Restart PM2
pm2 restart frontend

# Check logs
pm2 logs frontend --lines 20
```

---

## Troubleshooting

### App Won't Start

```bash
# Check logs
pm2 logs frontend --lines 50

# Check if port 3002 is in use
sudo lsof -i :3002

# Kill process if needed
sudo kill -9 <PID>

# Then restart
pm2 restart frontend
```

### Nginx 502 Error

```bash
# Check if Next.js is running
pm2 status

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log

# Restart both
pm2 restart frontend
sudo systemctl restart nginx
```

### Permission Issues

```bash
# Fix ownership
sudo chown -R $USER:$USER /srv/marvel
sudo chown -R $USER:$USER /srv/marvel/frontend
sudo chown -R $USER:$USER /var/log/pm2
```

### PM2 Startup Not Working

```bash
# Check PM2 status
pm2 status

# If empty, start again
pm2 start ecosystem.config.js
pm2 save

# Get startup command
pm2 startup
# Run the command it outputs
```

---

## File Structure on VPS

```
/srv/marvel/                    # Git repository root
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── frontend/                   # Next.js app directory
│   ├── app/                    # Next.js app directory
│   ├── components/             # React components
│   ├── .next/                  # Next.js build output
│   ├── node_modules/           # Dependencies
│   ├── ecosystem.config.js     # PM2 config
│   ├── next.config.ts          # Next.js config
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
└── ...
```

---

## Auto-Deploy with GitHub Actions

The included `.github/workflows/deploy.yml` automatically deploys on every push to main:

1. **Test Job**: Runs linting, TypeScript check, and build
2. **Deploy Job**: SSHs to VPS, pulls code, runs `npm ci`, builds, and restarts PM2

### Setup GitHub Secrets:

Go to **Settings** → **Secrets** → **New repository secret**

| Secret | Value |
|--------|-------|
| `VPS_HOST` | Your server IP or domain |
| `VPS_USER` | SSH username |
| `VPS_SSH_KEY` | Private SSH key |
| `VPS_PORT` | 22 (default) |

See `GITHUB-ACTIONS-SETUP.md` for detailed instructions.

---

## Useful Scripts

### Deploy Script (Local)

Create `deploy-local.sh`:

```bash
#!/bin/bash
SERVER="user@your-server-ip"

echo "Deploying to VPS..."

ssh $SERVER << 'EOF'
  cd /srv/marvel
  git pull origin main
  cd frontend && npm ci
  cd frontend && npm run build
  pm2 restart frontend
  echo "Deployed successfully!"
EOF

chmod +x deploy-local.sh
./deploy-local.sh
```

---

## Security Checklist

- [ ] SSH key authentication only (no passwords)
- [ ] Firewall enabled (ufw)
- [ ] Automatic security updates: `sudo apt install unattended-upgrades`
- [ ] Fail2ban for brute force protection
- [ ] Regular backups of `/srv/marvel` and `/srv/marvel/frontend`
- [ ] PM2 logs monitored

---

## Performance Tips

1. **Enable Gzip** in Nginx (already in config)
2. **Use a CDN** for static assets (Cloudflare)
3. **Enable caching** in Next.js
4. **Monitor PM2** with `pm2 monit`
5. **Set up log rotation**:
   ```bash
   sudo apt install logrotate
   pm2 install pm2-logrotate
   pm2 set pm2-logrotate:retain 10
   ```

---

**Your frontend site is now running with PM2 at `/srv/marvel/frontend`! 🚀**

Access it at:
- Direct: `http://your-server-ip:3002`
- Via Nginx: `http://your-domain.com`