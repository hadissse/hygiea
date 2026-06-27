# Appwrite Production Hardening Checklist

Before pointing a real domain at the self-hosted Appwrite instance at `/Users/hadi/Downloads/appwrite`, change these values in the `.env` file:

## Critical (must change before going live)

| Env var | Default (insecure) | What to set |
|---|---|---|
| `_APP_OPENSSL_KEY_V1` | `your-secret-key` | 32-char random string: `openssl rand -hex 32` |
| `_APP_DB_PASS` | `password` | Strong random password |
| `_APP_DB_ROOT_PASS` | `rootsecretpassword` | Strong random password |
| `_APP_DOMAIN` | `localhost` | Your actual domain, e.g. `appwrite.yourdomain.com` |
| `_APP_OPTIONS_FORCE_HTTPS` | `disabled` | `enabled` |

## Recommended

| Env var | What to set |
|---|---|
| `_APP_CONSOLE_WHITELIST_EMAILS` | `hadievet123@gmail.com` (restrict console access) |
| `_APP_SMTP_HOST` | Your SMTP server (for email verification) |
| `_APP_USAGE_STATS` | `disabled` (optional, privacy) |

## Steps to regenerate the OpenSSL key safely

1. **Stop all containers first**: `cd /Users/hadi/Downloads/appwrite && docker compose down`
2. Generate new key: `openssl rand -hex 32`
3. Update `_APP_OPENSSL_KEY_V1` in `.env` with the new value
4. Restart: `docker compose up -d`
5. **Warning**: Changing this key invalidates all existing sessions — users will need to log in again

## Notes
- Database password changes require re-initializing the database volume
- Do these changes BEFORE any real user data is stored
- Back up `.env` to a password manager (1Password, etc.) — never commit it to git
