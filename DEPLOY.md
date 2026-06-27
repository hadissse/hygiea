# Deployment Guide — Hygiea + Reports System

Two apps on one VPS: Hygiea (Next.js) + Reports (Python/Node) + Appwrite (Docker).

## Recommended Server

**Hetzner CX22** — €4.35/mo, 2 vCPU, 4GB RAM, 40GB SSD, Ubuntu 24.04  
Sign up at https://hetzner.com/cloud

---

## 1. Server Setup

```bash
# After SSH in as root:
adduser ubuntu && usermod -aG sudo ubuntu
# Copy your SSH key: ssh-copy-id ubuntu@<server-ip>

# Firewall
sudo ufw allow 22 && sudo ufw allow 80 && sudo ufw allow 443 && sudo ufw enable
```

---

## 2. Install Dependencies

```bash
# Node 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Python 3 + venv
sudo apt install -y python3 python3-pip python3-venv

# LibreOffice (PDF generation in reports — no GUI needed)
sudo apt install -y libreoffice --no-install-recommends

# PM2 (process manager — keeps apps alive after reboot)
sudo npm install -g pm2

# Docker (for Appwrite)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
newgrp docker

# Nginx + Certbot (SSL)
sudo apt install -y nginx certbot python3-certbot-nginx
```

---

## 3. Deploy Appwrite

**Before transferring**: edit `/Users/hadi/Downloads/appwrite/appwrite/.env` locally:
- See `APPWRITE_HARDENING.md` for exact vars to change
- Set `_APP_DOMAIN=appwrite.yourdomain.com`
- Set `_APP_OPTIONS_FORCE_HTTPS=enabled`
- Generate new key: `openssl rand -hex 32` → set as `_APP_OPENSSL_KEY_V1`

```bash
# Transfer from Mac
scp -r /Users/hadi/Downloads/appwrite/appwrite/ ubuntu@<server-ip>:~/appwrite/

# On server
cd ~/appwrite && docker compose up -d

# Verify
docker compose ps   # all services should be Up
```

---

## 4. Deploy Hygiea

```bash
# On server
git clone https://github.com/hadissse/hygiea.git ~/hygiea
cd ~/hygiea && npm install
```

Create `~/hygiea/.env.production`:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://appwrite.yourdomain.com/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<from Appwrite console after step 7>
NEXT_PUBLIC_SUPABASE_URL=<your supabase url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your supabase anon key>
```

```bash
npm run build

# Copy PM2 ecosystem file
cp deploy/ecosystem.config.js ~/ecosystem.config.js

pm2 start ~/ecosystem.config.js --only hygiea
pm2 save
pm2 startup   # follow the printed command to enable on reboot
```

---

## 5. Deploy Reports System

```bash
# From Mac — transfer (skips node_modules, venv, local DB)
rsync -av \
  --exclude 'node_modules' \
  --exclude '.venv' \
  --exclude 'data/db' \
  --exclude '__pycache__' \
  "/Users/hadi/Downloads/reports system/" \
  ubuntu@<server-ip>:~/reports/

# On server
cd ~/reports
npm install

python3 -m venv .venv
source .venv/bin/activate
pip install flask

pm2 start ~/ecosystem.config.js --only reports
pm2 save
```

---

## 6. Nginx Configuration

```bash
# Copy config (fill in your domain first — search/replace yourdomain.com)
sudo cp ~/hygiea/deploy/nginx.conf /etc/nginx/sites-available/hygiea
sudo ln -s /etc/nginx/sites-available/hygiea /etc/nginx/sites-enabled/hygiea
sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t && sudo systemctl reload nginx
```

---

## 7. SSL (HTTPS)

Point your DNS first:
- `yourdomain.com` → `<server-ip>` (A record)
- `www.yourdomain.com` → `<server-ip>` (A record)
- `reports.yourdomain.com` → `<server-ip>` (A record)
- `appwrite.yourdomain.com` → `<server-ip>` (A record)

Then:
```bash
sudo certbot --nginx \
  -d yourdomain.com \
  -d www.yourdomain.com \
  -d reports.yourdomain.com \
  -d appwrite.yourdomain.com
```

Certbot auto-renews. Test renewal: `sudo certbot renew --dry-run`

---

## 8. Appwrite Project Setup (post-deploy)

1. Visit `https://appwrite.yourdomain.com/console`
2. Create root account (first time only)
3. Create project → copy the **Project ID**
4. **Auth** → Settings → enable Email/Password
5. **Settings** → Add platform → Web → hostname: `yourdomain.com`
6. **Databases** → Create database → Create these collections:

| Collection ID | Fields |
|---|---|
| `profiles` | user_id (string), first_name (string), last_name (string), display_name (string) |
| `charts` | user_id (string), label (string), birth_data (string), chart_json (string) |
| `events` | user_id (string), event_id (string), event_json (string) |
| `calibrations` | user_id (string), calibrations_json (string) |
| `traits` | user_id (string), traits_json (string) |
| `journey_progress` | user_id (string), week_start (string), state_json (string) |

7. Update `.env.production` with the Project ID → rebuild:
   ```bash
   cd ~/hygiea && npm run build && pm2 restart hygiea
   ```

---

## 9. Update Workflow

```bash
# Hygiea update (after git push from Mac)
cd ~/hygiea && git pull && npm install && npm run build && pm2 restart hygiea

# Reports update (from Mac)
rsync -av --exclude node_modules --exclude .venv --exclude 'data/db' \
  "/Users/hadi/Downloads/reports system/" ubuntu@<server-ip>:~/reports/
ssh ubuntu@<server-ip> "cd ~/reports && npm install && pm2 restart reports"
```

---

## Verification Checklist

- [ ] `https://yourdomain.com` → Hygiea login page loads
- [ ] `https://reports.yourdomain.com` → Practice Manager loads
- [ ] `https://appwrite.yourdomain.com/console` → Appwrite dashboard loads
- [ ] Register/login works in Hygiea
- [ ] Generate a report + Download PDF works (LibreOffice on server)
- [ ] `pm2 status` → both `hygiea` and `reports` show `online`
- [ ] After `sudo reboot`, both apps come back up automatically
