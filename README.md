## Render Hosting

### Build Command

```bash
npm ci && npm run build
```

### Start Command

```bash
npm run start
```

### Required Environment Variables

- `NODE_ENV=production`
- `TELEGRAM_BOT_TOKEN` (optional)
- `TELEGRAM_CHAT_ID` (optional)

### File Upload Storage (IDs)

This app saves uploaded ID images to a local directory. On Render, use a persistent disk and set:

- `UPLOADS_DIR=/var/data/uploads`

The included [render.yaml](file:///Users/mindedjr/Desktop/Web-Canvas-Share/render.yaml) sets up a disk and env var defaults.

