# Classic → MoP Mount Tracker (Starter)

Static, GitHub Pages–friendly tracker for mounts from **Vanilla → MoP Classic**.

## Quick Start
1. Click **Use this template** or upload these files to a new repo.
2. Enable **GitHub Pages**: *Settings → Pages → Source → Deploy from a branch → main → /(root)*.
3. Visit your site at `https://<username>.github.io/<repo>/`.

## Local Dev
No build step needed. Just open `index.html` or run a tiny server:
```bash
python3 -m http.server 8080
# WoW-Classic-Mount-Tracker

# Requires Node >= 18
npm init -y
npm i ajv ajv-cli
npx ajv validate -s data/schema.json -d data/mounts.json
