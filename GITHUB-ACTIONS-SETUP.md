# GitHub Actions Auto-Deployment Setup (PM2 Mode)

This workflow automatically **tests** and **deploys** your site to your VPS with PM2 at `/srv/marvel` whenever code is pushed to the `main` branch.

---

## How It Works
---
**On every push/PR to main:**
1. **Test Job**: Runs linting, TypeScript check, security audit, and build verification
2. **Deploy Job** (only on main branch): SSHs to VPS and:
   - Pulls latest code with git
   - Runs `npm ci` for clean install
   - Builds the Next.js app
   - Restarts the PM2 process

---

## Prerequisites on VPS

Before using GitHub Actions, make sure your VPS is set up:
```bash
# 1. Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 2. Install PM2
sudo npm install -g pm2

# 3. Clone your repo
cd /srv
git clone https://github.com/yourusername/frontend.git marvel
cd marvel

# 4. Install and build
npm ci
npm run build

# 5. Start with PM2
pm2 start ecosystem.config.js
pm2 save

# 6. Check it's running
pm2 status
```

See `VPS-DEPLOY.md` for complete setup instructions.

---

## Setup GitHub Actions

### 1. Generate SSH Key

On your local machine:
```bash
# Generate new SSH key for GitHub Actions
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions

# Copy public key to VPS
ssh-copy-id -i ~/.ssh/github_actions.pub your-user@your-vps-ip

# View private key (you'll need this for GitHub)
cat ~/.ssh/github_actions
```

### 2. Add GitHub Secrets

Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret | Value | Description |
|--------|-------|-------------|
| `VPS_HOST` | `123.45.67.89` or `your-domain.com` | Your VPS IP or domain |
| `VPS_USER` | `ubuntu` or your username | SSH username |
| `VPS_SSH_KEY` | Private key content | Full output of `cat ~/.ssh/github_actions` |
| `VPS_PORT` | `22` | SSH port (optional) |

**Important:** Copy the entire private key including:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

---

## Workflow Details

### Test Job

Runs on every push to any branch and all PRs:

```
===================================
TEST JOB - Environment Details
===================================
Node version: v20.x.x
NPM version: 10.x.x
Repository: yourname/frontend
Branch: main
Commit: abc123...
Commit message: Updated hero section
Triggered by: yourname
===================================
📦 Installing npm dependencies...
✅ Dependencies installed successfully
📊 Total packages: 47
🔒 Running security audit...
✅ Audit complete
🔍 Running ESLint...
✅ Linting passed
📘 Running TypeScript compiler check...
✅ TypeScript check passed
🏗️ Building project for testing...
✅ Build successful
✅ ALL TESTS PASSED
```

### Deploy Job

Only runs after tests pass on the `main` branch:

```
===================================
🚀 DEPLOY JOB - Starting PM2 Deployment
===================================
Repository: yourname/frontend
Branch: main
Deploy Path: /srv/marvel/frontend
VPS Target: your-domain.com
Time: Mon Feb 02 20:15:00 UTC 2024
===================================
🔌 Connected to VPS: server-name
===================================
📂 Changing to project directory...
✅ Now in: /srv/marvel/frontend
📥 Pulling latest code from main branch...
✅ Code updated to: abc123... (commit message)
📦 Installing dependencies with npm ci...
✅ Dependencies installed
📊 Package count: 47
🏗️ Building Next.js project...
✅ Build complete
🔍 Checking PM2 status...
📊 Current PM2 processes:
♻️  Restarting existing PM2 process...
💾 Saving PM2 configuration...
===================================
📊 Final PM2 Status:
===================================
┌────┬──────────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name             │ namespace │ version │ mode    │ pid   │ uptime │ ↺    │ status │ cpu      │ mem      │ user     │ watching │
├────┼──────────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┤
│ 0  │ frontend         │ default   │ N/A     │ fork    │ 12345 │ 2m     │ 0    │ online │ 0.3%     │ 65.2mb   │ user     │ disabled │
└────┴──────────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
📝 PM2 Logs (last 10 lines):
✅ DEPLOYMENT COMPLETE!
===================================
🔍 Final Verification
===================================
✅ SUCCESS: Site is live on port 3002
🎉 PM2 DEPLOYMENT COMPLETE!
===================================
Site URL: http://your-domain.com:3002
Deployed at: Mon Feb 02 20:15:30 UTC 2024
💡 Useful commands on VPS:
  pm2 logs frontend         # View logs
  pm2 status                # Check status
  pm2 restart frontend      # Restart app
```

---

## Viewing Logs

### GitHub Actions Logs

1. Go to **Actions** tab in your repo
2. Click on a workflow run
3. Click on a job ("Run Tests & Checks" or "Deploy to VPS")
4. Expand any step to see detailed output

### PM2 Logs on VPS

```bash
# View real-time logs
pm2 logs frontend

# View last 50 lines
pm2 logs frontend --lines 50

# View error logs only
pm2 logs frontend --err

# View output logs only
pm2 logs frontend --out
```

---

## Manual Trigger

You can also run the workflow manually:

1. Go to **Actions** tab
2. Select **"Test & Deploy to VPS (PM2 Mode)"**
3. Click **"Run workflow"** button
4. Select branch (main)
5. Click **"Run workflow"**

---

## Testing

### Test Auto-Deployment

1. Make a small change:
   ```bash
   # Edit any file
   echo "// Test" >> app/page.tsx
   ```

2. Commit and push:
   ```bash
   git add .
   git commit -m "Test auto-deployment"
   git push origin main
   ```

3. Watch in GitHub Actions:
   - Go to Actions tab
   - See test job run first
   - Then deploy job runs
   - Both should show green checkmarks ✓

4. Verify on VPS:
   ```bash
ssh your-vps
pm2 logs frontend --lines 5
   # Should show recent restart
   ```

### Test PR (Pull Request)

1. Create a branch:
   ```bash
   git checkout -b feature/test
   ```

2. Make changes and push:
   ```bash
   git add .
   git commit -m "Test PR"
   git push origin feature/test
   ```

3. Create PR on GitHub
4. The **Test job** runs automatically
5. Shows green ✓ if tests pass
6. Merge only when tests pass
7. After merge, **Deploy job** runs automatically

---

## Troubleshooting

### Workflow Fails

**Check the logs in GitHub Actions:**
- Click the failed job
- Expand the step that failed
- Read the error message

**Common Issues:**

1. **SSH Connection Failed**
   - Check VPS_HOST, VPS_USER, VPS_SSH_KEY secrets
   - Verify SSH key is copied to VPS: `cat ~/.ssh/authorized_keys`
   - Test manually: `ssh -i ~/.ssh/github_actions user@vps`

2. **npm ci fails**
   - Check Node.js version on VPS: `node --version` (needs v20+)
   - Check package-lock.json exists in repo
   - Try `npm install` locally and push updated lock file

3. **Build fails**
   - Check for TypeScript errors: `npx tsc --noEmit`
   - Run linting: `npm run lint`
   - Check logs in GitHub Actions for specific error

4. **PM2 restart fails**
   - Check PM2 is installed: `pm2 --version`
   - Check app exists: `pm2 list`
   - Check path exists: `ls -la /srv/marvel/frontend`
   - Check permissions: `ls -la /srv/`

### Deployment Succeeds but Site Not Updated

```bash
# SSH to VPS and check
ssh user@vps
cd /srv/marvel/frontend

# Check git status
git log -1  # Should show latest commit

# Check PM2 status
pm2 status
pm2 logs frontend --lines 20

# Restart manually if needed
pm2 restart frontend
```

---

## Security Best Practices

1. **Use dedicated deploy user** (not root)
   ```bash
   sudo adduser deploy
   sudo usermod -aG sudo deploy
   ```

2. **Restrict SSH key** to deployment only:
   - Edit `/home/deploy/.ssh/authorized_keys`
   - Add command restriction (optional):
   ```
   command="cd /srv/marvel && git pull && cd frontend && npm ci && npm run build && pm2 restart frontend" ssh-ed25519 AAA...
   ```

3. **Rotate keys regularly** (every 90 days)

4. **Enable branch protection** on GitHub:
   - Settings → Branches → Add rule
   - Require pull request reviews
   - Require status checks (tests must pass)

5. **Review deployment logs** regularly

---

## Alternative: Skip Tests in Deploy

If you want to deploy without waiting for tests (not recommended):

Edit `.github/workflows/deploy.yml`:
```yaml
deploy:
  # Remove: needs: test
  # Remove: if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
```

---

## Customization

### Deploy Multiple Servers

```yaml
strategy:
  matrix:
    server: [vps1, vps2]

steps:
  - name: Deploy to ${{ matrix.server }}
    uses: appleboy/ssh-action@v1.0.3
    with:
      host: ${{ secrets[format('VPS_HOST_{0}', matrix.server)] }}
      # ... rest same
```

### Add Notifications

```yaml
- name: Notify Discord
  uses: Ilshidur/action-discord@master
  if: always()
  env:
    DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK }}
  with:
    args: |
      Deployment ${{ job.status }}
      Commit: ${{ github.event.head_commit.message }}
      By: ${{ github.actor }}
```

---

**That's it! Every push to main now auto-tests and auto-deploys to your VPS with PM2! 🚀**

Site structure:
- Repo root: `/srv/marvel`
- Frontend app: `/srv/marvel/frontend`
- PM2 process: `frontend`
- Port: `3002`
- Logs: `/var/log/pm2/frontend.log`
- Nginx proxy: Port 80/443 → 3002
