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


---

## **11. `LICENSE`**
```text
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
