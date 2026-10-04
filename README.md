# Fashion Studio

Fashion Studio is an AI-assisted web platform that helps fashion designers and brands create professional fashion showcase content — without expensive photoshoots.

Upload garments, generate studio-quality showcase images with selectable models, poses, and scenes, curate a collection, then export or share it as images or a lookbook.

## Target Users

- **Independent fashion designers** — portfolio, lookbook, and social content on a budget.
- **Small fashion brands / boutiques** — consistent product imagery for web and social.
- **Stylists & fashion students** — fast concept visualization and collection presentation.

## Problem It Solves

Professional fashion shoots are slow and expensive ($500–$5,000+ per collection), while DIY phone photos look inconsistent. Generic AI image tools lack a fashion-specific workflow and collection-level consistency.

Fashion Studio provides a guided workflow: garments → AI showcase generation → curation → export/share.

## Main User Journey

1. Sign up / log in
2. Create a project (e.g., "SS27 Capsule") with a style preset
3. Upload garments with names and tags
4. Generate 2–4 showcase variants per garment, keep the best
5. Curate order, cover, and captions
6. Export PNG/ZIP/PDF lookbook or share via public link

## MVP Features

- Auth + projects dashboard
- Garment upload and management
- AI showcase generation with presets (model, pose, background, aspect ratio)
- Curation board with reorder and cover selection
- Export (PNG, ZIP, PDF lookbook) and public share links
- Credit-based usage controls

## Project Status

Early MVP planning stage.

Current files:
- `PRD.md` — MVP product requirements (v0.1 draft)
- `index.html` — placeholder, no implementation yet
- `README.md` — this file

Next steps: prototype the project → garment → generate → curate → export flow as a web app.

## About PRD.md

`PRD.md` is the source of truth for MVP scope. It defines the product overview, users, goals, user journey, MVP features, functional requirements (FR-1–FR-19), non-functional requirements, future enhancements, and success criteria.

## Run & Deploy

Local prototype (existing workflow, unchanged):

```sh
npm install
npm start
# open http://localhost:3000
```

Netlify deployment (static, mock data only):

- No build step. Publish directory: `.` (serves existing `index.html`, `styles.css`, `app.js`).
- Functions directory: `netlify/functions` (`health` mirrors the Express `GET /api/health` route; `netlify.toml` redirects `/api/health` to `/.netlify/functions/health`).
- Deploy by connecting the repo to Netlify or dragging the folder in Netlify Drop. No env vars or secrets required.
