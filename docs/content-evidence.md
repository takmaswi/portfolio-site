# Public content evidence

Reviewed 12 September 2026. Source of identity and project selection: ../taku.md in the parent brand folder. This is an internal record, not a public page.

## Boundaries

- Four case studies distinguish independent products, client work, and a reusable template. No unsupported impact figures, client testimonials, competition results, or production-readiness claims are published.
- Svika uses the current Svika AI grand challenge repository. Its README identifies the limited arrival dataset and baseline serving policy. The old carousel uses a superseded Svika URL and competition framing and was not reused.
- Muripi sources: C:\dev\muripi\README.md and docs\VERIFICATION.md. Physical AR accuracy remains unverified. Historical browser and Android checks were read, not rerun for this content task.
- Bushkin sources: C:\Users\Dell\Dev\bushkin-web\CODEX-MEMORY.md and current artifacts. Client acceptance is unverified. No claim that the planned Convex backend is complete appears in public copy.
- taku-cake sources: Cake Fairy\README.md and actual artifacts\screenshots\home-1440.png. Local template only. Generated cake imagery is part of the template, not evidence of a real bakery catalogue or delivery.
- Svika and Muripi URLs were attempted through the web reader, which returned a safe-open error. This does not prove either deployment is down. Browser verification belongs to the parent task.

## Images

The parent task copies actual interface screenshots to /images/project-svika.webp, project-muripi.webp, project-bushkin.webp, and project-taku-cake.webp. Prefer Bushkin artifacts\hero-desktop.png over the older .review\sweep capture. The About portrait is generated from supplied photographs and is labelled AI-assisted. No image is presented as a customer or completed client outcome.

## Credentials and contact

The Google AI Professional Certificate primary PDF was verified in taku.md, dated 3 March 2026, credential FZSTEM28BXNS, covering seven courses. Its printed verification URL is included; this task did not check that external record. The GDG Harare Build with AI Hackathon 2026 award is included as documented in the professional portfolio, as directed by the parent task. Primary award evidence remains pending. No winning product, score, prize, or invented verification link is associated with the award.

Public email takmaswi@gmail.com was read in the old portfolio Contact.tsx:155 and public JSON:29. GitHub and LinkedIn use the canonical taku.md URLs. The old public PDFs exist, but a label scan is not a full privacy/currentness review. Contact therefore offers a CV request email. No old public JSON or private records were copied.

## Humanizer audit

Draft: "An editorial storefront for a Dubai clothing brand with Zimbabwean roots, combining cinematic motion with a focused path into the collection."

Review: The draft packs visual claims into a long overview. Project summaries should identify the work first; the case study can explain the interaction.

Final: "An editorial storefront for a Dubai clothing brand with Zimbabwean roots."

Applied throughout: plain language, concrete functionality, no grand impact claims, no em or en dashes, varied sentence length, no invented training delivery history. AI training is an offering, not evidence of past workshops or an authorized Google trainer relationship.

## Validation

### Fresh public captures, 12 September 2026

Chromium through Playwright, clean signed-out browser contexts, 1440 x 1000 viewport, reduced motion requested. All three captures were visually inspected after capture. No forms submitted, logins performed, or remote data changed. Each navigation returned HTTP 200. This supersedes the earlier web-reader reachability limitation, but establishes only public-page reachability and visual capture, not complete workflow acceptance.

- `assets/project-captures/project-cake-current.png`: current public home from canonical Cake Fairy source, temporary Vite server at http://127.0.0.1:4372/. Shows Pink Party hero and first catalogue row, with no private data. The temporary server was stopped after capture. Template product imagery remains AI-generated, as documented above.
- `assets/project-captures/project-svika-current.png`: https://svika-web.vercel.app/, title Svika. Current signed-out landing page has a rendered map with a visible Demo movement label. No wallet, account, or private rider data appears. Current layout is a narrow centered product surface inside the desktop viewport.
- `assets/project-captures/project-muripi-current.png`: https://muripi.vercel.app/, title Muripi: find any shop inside Harare's busiest buildings. Current public landing page shows search and two demonstration buildings. No owner account data appears.

These PNGs are new source captures only. Public portfolio WebP files were not replaced by this follow-up. Original project captures were not overwritten.

tests/content.test.ts was written before content modules. Two initial attempts could not start because the parent dependency installation was not yet available: vitest was not recognized. Content implementation continued without pretending this was a behavioral red test. After installation, the initial four tests passed. The new award safeguard test was then written first and failed as expected because the award was absent (four pass, one fail), before award implementation. The parent task must verify rendered pages and imagery in the browser.
