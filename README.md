# Ember & Thyme

A contemporary, seasonal restaurant demo built with React, Vite, TypeScript, Tailwind CSS, React Router, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` checks TypeScript and creates the production bundle. `npm run preview` serves the production bundle.

`npm run test:ui` runs the Playwright interaction and responsive checks. Install the browser once with `npx playwright install chromium`. `node scripts/capture.mjs` captures desktop and mobile review images into `artifacts/screenshots` while the dev server is running.

## Routes

- `/` — cinematic home, seasonal dishes, chef, pairing, gallery, and visiting information
- `/menu` — accessible category tabs, dietary filters, and seasonal ingredient notes
- `/reservations` — three-step booking flow, mock date-based availability, guest validation, and confirmation
- `/story` — chef, sourcing, and cooking philosophy
- `/events` — three private dining formats, validated inquiry dialogs, and gallery lightbox

## Demo behaviour

No backend, live availability, email, or real bookings. The calendar action displays local feedback and downloads nothing. Event inquiries stay in memory. Theme, menu preferences, and the last booking's non-personal summary persist locally. Guest contact details are not stored. Restaurant identity, contact details, sourcing stories, menus, and prices are fictional.

Photographs are downloaded from Unsplash and served locally from `public/images`. `scripts/fetch-images.mjs` refreshes the curated assets. Image loading failures use a branded gradient fallback. Google Fonts has local system-font fallbacks.

Production hosting should rewrite unknown paths to `index.html` to support React Router deep links.
