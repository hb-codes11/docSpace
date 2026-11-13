# docSpace

**Ten PDF and Word tools that run in your browser.** Combine, organize, convert, compress, and mark up documents while keeping your files on your device.

[![Build and browser tests](https://github.com/hb-codes11/docSpace/actions/workflows/check.yml/badge.svg)](https://github.com/hb-codes11/docSpace/actions/workflows/check.yml)

[Quick start](#quick-start) · [Tools](#tools) · [Architecture](#architecture) · [Deploy to Netlify](#deploy-to-netlify) · [Roadmap](ROADMAP.md)

## Highlights

- **Process documents in your browser.** The core tools work without an account. Inputs and results stay in browser memory until you download a copy.
- **See the pages you’re working on.** Use thumbnails to select, reorder, rotate, or remove pages. Use page ranges when you already know which pages you need.
- **Keep working with the result.** After a tool creates a PDF, use **Continue with this PDF** to open the result in another compatible tool without selecting it again. For example, merge a report and its appendices, number the combined pages, then watermark the final PDF.
- **Use the same workspace on desktop and mobile.** The tool rail becomes a horizontally scrollable picker on smaller screens.

## Tools

| Tool | What it does |
| --- | --- |
| [Merge PDFs](src/tools-data.js) | Combines multiple PDFs in the order you choose. |
| Split PDF | Extracts a range into one PDF or exports one PDF per selected page in a ZIP. |
| Organize PDF | Reorders, rotates, and removes pages with a thumbnail preview. |
| Images to PDF | Combines JPG and PNG files into a PDF. |
| PDF to images | Exports selected pages as JPG or PNG in a ZIP, up to 50 pages per export. |
| Compress scan | Re-renders scanned pages as lower-resolution images and offers a download when the result is smaller. Selectable text, links, forms, and annotations are lost. |
| PDF to Word | Exports selectable PDF text to an editable DOCX. OCR and original layout reconstruction are future work. |
| Word to PDF | Creates a plain-text PDF from DOCX. Supports Western European characters and omits original formatting and images. |
| Watermark PDF | Adds a translucent, centered text watermark to selected unrotated pages. Supports Western European characters. |
| Page numbers | Adds bottom-centered numbering to selected unrotated pages, with a custom starting number. |

The file queue accepts up to 50 files and 100 MB total. PDF processing is limited to 500 pages per job, with lower limits for some tools. Available memory and document complexity affect how large a job the browser can handle.

## Quick start

Requires Node.js 22.13 or later and npm.

```sh
git clone https://github.com/hb-codes11/docSpace.git
cd docSpace
npm ci
npm run dev
```

Open the local URL printed by Vite. Start with two small PDFs to try merging, then send the result to **Page numbers**.

```sh
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite runs against the production build. It verifies downloaded files, mobile layout, browser navigation, recovery when a conversion module is missing, and chaining watermarking and page numbering. GitHub Actions runs the build and tests on pushes and pull requests.

## Architecture

| Area | Implementation |
| --- | --- |
| Workspace | Vite serves a responsive JavaScript and CSS interface. The [tool catalog](src/tools-data.js) defines the controls’ labels, routes, and usage guides. |
| PDF operations | [The processing worker](src/processor.js) uses pdf-lib for page operations and stamping. PDF.js renders thumbnails and page images and extracts selectable text. |
| Conversion | docx creates editable Word exports. JSZip packages image and PDF downloads and reads DOCX input. |
| Accounts | Optional Supabase email sign-in stores the last-used tool and per-account usage counts. The database migrations set row-level security on account tables. |
| Delivery | Vite builds static files into `dist/`. Netlify and Vercel configurations provide routing and headers. Earlier fingerprinted bundles in `public/assets/` help open tabs finish conversions after a release. |

The core tools send no document bytes or filenames to Supabase. Closing or refreshing a tab clears the current workspace. Optional ads load a third-party script when configured.

## Deploy to Netlify

1. In Netlify, import [`hb-codes11/docSpace`](https://github.com/hb-codes11/docSpace) and select the `main` branch.
2. Use the repository root. [`netlify.toml`](netlify.toml) sets Node 22, the build command `npm run build`, the publish directory `dist`, and the app route fallback.
3. Add optional build variables before deploying if you want accounts or ads. Leave them blank for guest mode.
4. Deploy and open the resulting HTTPS URL. Check a tool route such as `/#/pdf-to-images`, convert a sample document, and confirm the ZIP downloads.

For Vercel, import the same repository as a Vite project. The included [`vercel.json`](vercel.json) supplies the build settings and routing.

### Optional accounts and ads

1. Apply every SQL file in [`supabase/migrations/`](supabase/migrations/) in filename order. This sets up preferences, profiles, usage counts, and the tool catalog constraints.
2. In Supabase Auth, set the deployment URL as the Site URL and allow the exact sign-in return URLs, including `http://localhost:5173/` for local testing.
3. Copy [`.env.example`](.env.example) to `.env.local` for local development. On your host, set the same variables before building.

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public browser key for Supabase. Keep secret and service-role keys out of the frontend. |
| `VITE_ADSENSE_CLIENT_ID` | Optional AdSense publisher ID. |
| `VITE_ADSENSE_SLOT_TOP` | Optional ID for the ad placement. |

Rebuild after changing these variables. For a live account rollout, verify email sign-in and confirm two test accounts can access only their own records.

## Where to contribute

Start with the [product roadmap](ROADMAP.md) for planned work on previews, editing, OCR, conversion fidelity, and offline installation. For bug reports, include the tool, browser, and steps to reproduce. Use a synthetic sample when a document is needed to reproduce the issue.

`src/` contains the interface and document processing. `tests/` covers the core PDF operations. `e2e/` exercises the tools through the browser.
