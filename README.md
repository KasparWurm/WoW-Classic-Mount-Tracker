# Classic → MoP Mount Tracker

A lightweight, GitHub Pages–friendly web app to track your mount collection from **Vanilla Classic** through **Mists of Pandaria Classic**.  
Search, filter, and mark mounts as collected — progress is saved in your browser and can be exported/imported.

> Not affiliated with Blizzard Entertainment. Mount names and references are for noncommercial, informational purposes.

---

## 🌐 Live Demo
[View the Tracker Here](https://<username>.github.io/<repo>/)  
*(Replace `<username>` and `<repo>` with your GitHub info)*

---

## 🚀 Quick Start

1. **Clone or fork** this repository.
2. **Enable GitHub Pages**:  
   - Go to *Settings → Pages*  
   - Set **Source** to `Deploy from a branch`  
   - Select `main` branch and root (`/`)
3. Visit:  https://<username>.github.io/<repo>/
4. No build step is required — it’s just HTML, CSS, and JavaScript.

---

## 🖥 Local Development
Run the site locally with:
```bash
python3 -m http.server 8080
```
Then open:
http://localhost:8080

## 📄 Data Structure
Mounts are stored in data/mounts.json and validated against data/schema.json.
Required fields:
```
{
  "id": "unique-mount-id",
  "name": "Mount Name",
  "expansion": "Vanilla | TBC | WotLK | Cata | MoP",
  "sourceType": "Vendor | Drop | Quest | Achievement | Reputation | Profession | Event | Other"
}
```
Additional fields include:
```
faction
classReq
raceReq
profReq
sourceDetail
zone
instance
difficulty
npcOrVendor
cost
dropRateNote
notes
```

## 🤝 Contributing
We welcome all help — from adding mounts to improving features!

How to add or update mounts
1. Fork this repo and create a new branch.
2. Edit data/mounts.json and add your mount entry in the same format as existing ones.
    - Follow the field names and enums in data/schema.json.
    - Keep expansion names and sourceType exactly as listed.
3. Validate your JSON before opening a Pull Request:
```
npm init -y
npm i ajv ajv-cli
npx ajv validate -s data/schema.json -d data/mounts.json
```
4. Commit your changes and open a Pull Request.
5. Wait for GitHub Actions to confirm your data passes validation.

If unsure, look at a similar mount entry for formatting guidance.

## 🛣 Roadmap
Planned improvements and features:
- ~~Expand mount list: Complete Vanilla → MoP Classic coverage.~~
- ~~Faction/class/profession filters.~~
- Per-expansion progress bars.
- Sorting: By name, expansion, source type.
- Share progress: Generate a link or JSON to share collections.
- Offline support: Service worker for no-internet usage.
- Dark mode toggle.
