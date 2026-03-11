# Oasis of Change Impact Report

A public transparency website that showcases **Oasis of Change, Inc.**'s tree planting impact: verified planting data, global project locations, and measurable climate outcomes.

**Live site:** [impact.oasisofchange.com](https://impact.oasisofchange.com)

---

## Overview

This static site provides donors, partners, and the public with full visibility into Oasis of Change's reforestation work. It includes:

- **Dashboard** — Tree totals, CO₂ offset, and progress toward the 1 million trees goal
- **Interactive map** — Planting sites across 14 countries with cluster markers
- **Impact reports** — Fiscal year summaries (2024–2025, 2025–2026)
- **Project gallery** — Photos from planting sites and team work worldwide
- **Tree species** — Species data for verified projects
- **Certificates** — Downloadable planting proof PDFs
- **Breakdown** — Detailed breakdown by project and region
- **News** — Updates and announcements

---

## Tech Stack

| Layer       | Technology                          |
|------------|--------------------------------------|
| HTML/CSS   | Static HTML, Tailwind CSS (CDN)     |
| Maps       | Leaflet.js + MarkerCluster          |
| Fonts      | Google Fonts (DM Serif Display, Poppins) |
| Data       | `assets/js/tree-data.js` (planting data) |
| Integration| Tree-Nation API & widget             |

No build step required — the site runs as plain HTML/CSS/JS and can be served by any static host (e.g. GitHub Pages).

---

## Project Structure

```
├── index.html              # Redirects to /home
├── home.html               # Dashboard
├── impact.html             # Impact report overview
├── impact-2025-2026.html   # 2025–2026 FY report
├── impact-2024-2025.html   # 2024–2025 FY report
├── gallery.html            # Project photo gallery
├── species.html            # Tree species catalog
├── certificates.html       # Certificate downloads
├── breakdown.html          # Project breakdown
├── news.html               # News & updates
├── 404.html                # Custom 404
├── CNAME                   # GitHub Pages custom domain
├── assets/
│   ├── css/                # Styles (design-tokens, nav, footer, map, etc.)
│   ├── js/                 # Scripts (tree-data, map, gallery, nav, etc.)
│   ├── images/             # Planting site photos
│   └── certificates/       # PDF certificates
```

---

## Data Source

Planting totals, project details, and certificate metadata live in **`assets/js/tree-data.js`**. This file is the single source of truth for:

- Verified projects (Oasis-funded via Tree-Nation)
- Partner plantings (SPES, Sustainable WWW, MST, EcoSearch)
- Legacy projects (Tero, Refoorest)
- Certificate paths and metadata

The `lastUpdated` field at the top reflects when data was last synced.

---

## License

© Oasis of Change, Inc. All rights reserved.
