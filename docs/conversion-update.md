# Enquiry flow update

The cinematic design is retained. The hero now offers a project enquiry and CV download without scrolling through the installation. Every page has a fixed Contact action and direct CV download in its navigation.

Contact separates project work, AI training and hiring. Each opens an editable email with a relevant subject and short brief. Nothing is sent automatically. The email address is also visible for people using webmail. Case-study enquiries include the project title.

## Maintenance

- Enquiry wording and email templates: `src/content/contact.ts`.
- Public CV: `public/Takunda-Maswi-CV.pdf`.
- Regenerate the CV with `python scripts/build-cv.py` using a Python environment with ReportLab installed.
- CV source facts come from the brand's `taku.md`. Fairvalue employment dates and current title are deliberately omitted until the conflicting records are resolved. Personal identifiers are excluded.
- Regression checks: `npm test`, `npm run build`, then `node scripts/check-conversion.mjs` with the site running on port 4321.

This update removes navigation friction. It does not establish a measured increase in enquiries. No analytics service, message-sending backend or scheduling service was added.
