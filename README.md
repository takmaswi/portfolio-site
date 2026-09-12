# Takunda Maswi portfolio

A static Astro portfolio built around The Impossible Room. The opening combines purpose-made portrait compositions with an authored Three.js room, directed by GSAP. Semantic HTML keeps Work, About, Training, Recognition and Contact available without completing the cinematic sequence.

## Run locally

```powershell
npm install
npm run dev
```

Production verification:

```powershell
npm run test:coverage
npm run build
npm run preview
node docs\verify-browser.mjs
node docs\verify-content-update.mjs
```

The local preview runs at `http://127.0.0.1:4321`.

## Update content

- Projects: edit `src/content/projects.ts` and add the referenced public image to `public/images/`. The home installation, selector count, Work index and project detail routes derive from the record. Do not edit the room timeline.
- Credentials and recognition: edit `src/content/recognition.ts`. Add optional `url`, `documentUrl` and `courses` fields. Place local documents under `public/credentials/`.
- Capabilities: edit `src/content/capabilities.ts`.
- AI training and consulting: edit `src/content/services.ts`.
- Contact details and CV request route: edit `src/content/contact.ts`.

Use a unique lowercase project `slug`. Screenshots should contain only public, synthetic or sanitized data. Keep status and known limits accurate.

## Image provenance

The source identity references remain private to `assets/references/` and are not served. New production compositions and the alpha portrait layer are stored in `assets/generated/`; optimized WebPs are served from `public/images/`. See `docs/image-production.md` for the complete prompts, tool disclosure and integration notes. See `docs/content-evidence.md` for project screenshot provenance.

The built-in ChatGPT image generation tool created the new images. Its interface exposed no model selector, so use of the exact "ChatGPT Image 2.5" label could not be confirmed.

## Scope

Contact uses a verified email route. There is no submission backend. The older CV was not published because its present-day role details need review. Use the Request CV email link until a current public CV is approved.
