# StoreOps — Retail Operations Dashboard

A multi-store analytics dashboard built for retail operations teams. StoreOps consolidates P&L performance, inventory health, and workforce scheduling into a single, actionable view — the kind of tool a district manager opens first thing Monday morning.

> **Demo project** — all data is fictional. Built to demonstrate full-stack dashboard architecture with realistic retail domain modeling.

![StoreOps Dashboard](docs/screenshot.png)

---

## Features

### P&L Dashboard
- **Real-time KPI cards** — Revenue, Gross Margin, Labor Cost, Shrink %, Net Profit, Conversion Rate, Foot Traffic with period-over-period deltas
- **Weekly revenue trend** — Pure CSS bar charts with labor and shrink overlays
- **Multi-store comparison table** — Side-by-side performance ranking across all locations
- **Actionable insights engine** — Auto-generated recommendations based on KPI thresholds (revenue gaps, margin erosion, shrink alerts, labor overruns)

### Inventory Management
- **Stock health overview** — Total value, item count, stockout count, reorder queue, shrink losses
- **Priority-ranked alerts** — Critical stockouts, low-stock warnings, and shrink flags sorted by severity
- **Full inventory table** — SKU-level detail with velocity tracking, days-of-stock calculation, and auto-generated reorder suggestions
- **Shrink analysis** — Per-item and per-category shrink value tracking

### Workforce Scheduling
- **Weekly schedule grid** — Shift assignments optimized against hourly traffic patterns
- **Daily coverage heatmap** — Visual staffing vs. demand overlay for every operating hour
- **Employee roster** — Skills matrix, availability windows, hourly rates, max-hours constraints
- **Labor budget tracking** — Weekly spend vs. budget with variance alerts
- **Traffic-aware scheduling** — Shift start times optimized to match peak foot traffic curves

### Cross-cutting
- **Multi-store selector** — 4 retail locations across 2 regions (Niagara, Hamilton) with distinct performance profiles
- **Multi-language** — English, French, Spanish, and Chinese (4-language i18n with instant toggle)
- **Dark / Light theme** — System-aware with manual toggle, full CSS variable theming
- **Responsive layout** — Works on desktop and tablet viewports
- **Zero external dependencies on the frontend** — No chart libraries, no CSS frameworks; pure vanilla JS + CSS

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Server** | Node.js + Express 5 |
| **Frontend** | Vanilla JavaScript (ES6 IIFE), CSS Custom Properties |
| **Data** | In-memory mock data with realistic retail modeling |
| **Charts** | Pure CSS bar charts (no Chart.js / D3) |
| **i18n** | Custom client-side translation layer (EN / FR / ES / ZH) |
| **Theming** | CSS custom properties with `data-theme` attribute switching |

---

## Getting Started

### Prerequisites

- Node.js 18+

### Install & Run

```bash
git clone git@github.com:GeraldYa/store-ops.git
cd store-ops
npm install
node server.js
```

Open [http://localhost:3084](http://localhost:3084) in your browser.

---

## Project Structure

```
store-ops/
├── server.js              # Express server with REST API routes
├── data/
│   ├── mock.js            # Realistic retail dataset (4 stores, 14 SKUs, 10 employees)
│   └── analyzer.js        # Business logic — P&L aggregation, inventory alerts, schedule optimization
├── public/
│   ├── index.html         # Single-page shell
│   ├── css/style.css      # Dark-first responsive theme
│   └── js/app.js          # Client app — data fetching, rendering, i18n, theming
└── package.json
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/stores` | List all store locations |
| `GET` | `/api/pnl/:storeId` | P&L data + multi-store comparison + insights |
| `GET` | `/api/inventory/:storeId` | Inventory overview, alerts, and item table |
| `GET` | `/api/workforce/:storeId` | Schedule, coverage analysis, and employee roster |

---

## Screenshots

> Screenshots coming soon. To preview locally, run the app and visit `http://localhost:3084`.

---

## License

MIT

---

Built by **Baojun Yang**
