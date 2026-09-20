# Fashion Studio — Product Requirements Document (PRD)

**Version:** 0.1 (MVP)
**Date:** 2026-09-20
**Status:** Draft

---

## 1. Product Overview

Fashion Studio is an AI-assisted web platform that helps fashion designers and brands create professional fashion showcase content quickly and affordably.

Instead of expensive photoshoots, users upload garment photos / flats / descriptions, select a model look, scene, and style, and generate studio-quality showcase images and lookbook pages they can share or export.

MVP scope: single-page web app with project-based workflow: Create Project → Add Garments → Generate Showcase Images → Curate Collection → Export / Share.

Out of scope for MVP: video generation, e-commerce checkout, pattern-making / CAD, manufacturing integration.

## 2. Target Users

1. **Independent fashion designers** — need portfolio, lookbook, and social content without a studio budget.
2. **Small fashion brands / boutiques (2–20 people)** — need consistent product showcase images for web and Instagram.
3. **Stylists & fashion students** — need to visualize concepts and present collections.

Assumptions: users are non-technical, work on desktop + mobile browser, and already have garment photos or sketches.

## 3. Problem Statement

Professional fashion showcase content is slow and expensive:
- Photoshoots cost $500–$5,000+ per collection and require models, photographers, locations.
- DIY phone photos look inconsistent and hurt brand perception.
- Existing AI image tools are generic — no fashion-specific workflow (garments, models, poses, lookbooks), poor consistency across a collection.

Fashion Studio solves this with a guided, fashion-specific generation + curation workflow.

## 4. Product Goals

1. Reduce time to create a 10-look showcase from days to < 1 hour.
2. Reduce cost per collection showcase by 80% vs. basic photoshoot.
3. Enable a non-technical user to go from garment upload to shareable lookbook in 5 steps.
4. Validate AI generation quality and willingness to pay with MVP.

## 5. Main User Journey

1. **Sign up / Log in** — user creates account with email.
2. **Create Project** — names collection (e.g., "SS27 Capsule"), selects style preset (Minimal Studio, Streetwear, Editorial).
3. **Add Garments** — uploads 1–10 garment photos, adds name, description, fabric/color tags.
4. **Generate Showcase** — for each garment: picks model profile, pose, background; clicks Generate; previews 2–4 variants; keeps best, regenerates or edits prompt if needed.
5. **Curate Collection** — reorders looks, sets cover image, adds titles/descriptions.
6. **Export / Share** — exports PNG/ZIP or PDF lookbook, copies public share link.

Alternate path: start from text description only ("oversized beige trench coat") when no photo exists.

## 6. MVP Features

1. **Auth + Projects Dashboard** — signup/login, list/create/archive projects.
2. **Garment Management** — image upload, edit name/description/tags, delete.
3. **AI Showcase Generation** — prompt + preset-based generation (model, pose, background, aspect ratio), 2–4 variants per run, history per garment.
4. **Curation Board** — grid view, drag-to-reorder, select cover, approve/reject.
5. **Export & Share** — download images (PNG), export lookbook PDF, read-only public share link.
6. **Basic Generation Controls** — negative prompt, style strength, credit / usage indicator.

Explicitly NOT in MVP: custom model training, video, team workspaces, payments beyond simple credit pack stub, marketplace.

## 7. Functional Requirements

### 7.1 Authentication & Accounts
- FR-1: User can sign up / log in / log out via email + password.
- FR-2: User can view only their own projects.
- FR-3: Sessions persist; password reset via email.

### 7.2 Projects
- FR-4: User can create a project with name + style preset.
- FR-5: User can rename, archive, delete a project.
- FR-6: Dashboard lists projects with cover thumbnail, look count, updated date.

### 7.3 Garments
- FR-7: User can upload JPG/PNG/WebP (max 10MB each, max 10 per project in MVP).
- FR-8: User can add/edit name (required), description, color/fabric tags.
- FR-9: Uploads show progress, thumbnail preview, and error states.

### 7.4 Generation
- FR-10: User can select: model profile (3–5 presets), pose (3 presets), background/scene (3–5 presets), aspect ratio (1:1, 4:5, 9:16).
- FR-11: System generates 2–4 variants per run in < 60s and stores them linked to garment + settings.
- FR-12: User can approve one as hero, reject others, regenerate, view generation history.
- FR-13: Each generation consumes 1 credit; balance is displayed and decremented; insufficient credits blocks generation with upsell message.

### 7.5 Curation
- FR-14: User can reorder looks via drag-and-drop; order persists.
- FR-15: User can set cover image and edit look titles/captions.
- FR-16: Only approved looks appear in export/share.

### 7.6 Export & Share
- FR-17: User can download single PNG and all approved looks as ZIP.
- FR-18: User can export a simple PDF lookbook (cover + one look per page with title/caption).
- FR-19: User can toggle a public read-only share link on/off; link shows cover + approved looks.

## 8. Non-Functional Requirements

- **Performance:** Page load < 2.5s on broadband; generation completes < 60s P90; support 10 uploads per project.
- **Usability:** Mobile-responsive; core journey completable without tutorial; accessible contrast + keyboard nav for main flows.
- **Reliability:** 99% monthly availability for MVP host; failed generations show retry and refund credit automatically.
- **Security & Privacy:** HTTPS; hashed passwords; user images private by default; public link unguessable; delete project deletes associated files within 30 days.
- **Compatibility:** Latest Chrome, Safari, Edge, Firefox; desktop-first, usable on mobile.
- **Scalability:** Stateless web tier; async generation queue so 20 concurrent generations don't block UI.
- **Cost control:** Per-user monthly generation cap + global rate limiting to bound AI API spend.

## 9. Future Enhancements (Post-MVP)

1. Text-to-garment + sketch-to-photo.
2. Consistent AI model / face across a collection + custom model upload.
3. Video / 360° turntable and social-size auto-crop.
4. Team workspaces, comments, roles.
5. Brand kits (fonts, logos, templates) and Shopify / Instagram integrations.
6. Virtual try-on and size-inclusive model library.
7. Paid plans, credit packs, usage analytics.

## 10. Success Criteria

MVP is successful if within 8 weeks of launch:

- 50+ beta users create ≥ 1 project each.
- 30% of projects reach Export / Share (activation).
- Median time upload → export for 5 looks is < 45 min.
- Generation success rate > 90%; user keep-rate ≥ 1 in 4 variants.
- NPS / satisfaction ≥ 4/5 on output quality in beta survey.
- AI cost per approved look stays under target ($0.30).

**Tracking:** project creation, upload count, generations per garment, keep rate, time-to-export, share-link opens, credit consumption.
