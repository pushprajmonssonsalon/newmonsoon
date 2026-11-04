# Deploying to an EC2 instance

The site is a Next.js server app (it renders pages, resizes images and builds sitemap/llms files),
so it runs as a Node process behind nginx. A static `build/` folder is not produced.

## One-time server setup
1. Node **20.9 or newer** (20 LTS or 22): `node -v`
2. `sudo npm i -g pm2`
3. nginx proxying to the app (keep your existing `/api` rule for the backend):
   ```nginx
   location / {
     proxy_pass http://127.0.0.1:3000;
     proxy_set_header Host $host;
     proxy_set_header X-Forwarded-For $remote_addr;
     proxy_set_header X-Forwarded-Proto $scheme;
   }
   ```
4. Open port 80/443 in the security group (not 3000).

## Deploy / update
```bash
git pull                      # or upload the project (without node_modules and .next)
npm ci
npm run build                 # needs internet: it reads the salon list from monsoonsalon.com/api
pm2 start ecosystem.config.js # first time
pm2 restart monsoon           # later updates
pm2 save && pm2 startup       # once, so it restarts after a reboot
```
Build on the Linux server itself: `sharp` ships a different native binary per operating system, so
`node_modules` from a Windows machine will not work. The build needs roughly 1.5 GB of free RAM.

## Checks after deploying
- `curl -I http://127.0.0.1:3000/` returns 200
- `/sitemap.xml`, `/robots.txt`, `/llms.txt` open and list only the pages you expect
- `/aesthetics` returns 404 while the Aesthetics pages are hidden

## Switching the Aesthetics pages on later
Edit `src/lib/features.js`, set `SHOW_AESTHETICS = true`, add the real content in
`src/screens/aesthetics/data.js`, then `npm run build` and `pm2 restart monsoon`. That one switch brings
back the menu links, both page types, the sitemap/llms entries and the home-page FAQ about aesthetics.
