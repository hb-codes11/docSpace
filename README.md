# docSpace

**A personal project for everyday PDF and Word work.** Merge files, rearrange pages, or convert a document right in your browser.

[![Build and browser tests](https://github.com/hb-codes11/docSpace/actions/workflows/check.yml/badge.svg)](https://github.com/hb-codes11/docSpace/actions/workflows/check.yml)

[Tools](#tools) · [Run locally](#run-locally) · [Under the hood](#under-the-hood) · [Deploy](#deploy-to-netlify) · [Roadmap](ROADMAP.md)

## What makes docSpace useful

- **Your files stay on your device.** The tools work in the browser and are available without signing in.
- **Scan from your phone.** Capture pages with the rear camera or choose photos, review their order, and create an A4 PDF. Open **Edit** on each page to adjust its corners, correct perspective, rotate it, or preview the result.
- **Save and share your result.** Enter a filename in **Save as**, then download it, choose a save location where supported, or send the generated file through your device’s share sheet. PDF, DOCX, and ZIP extensions stay correct.
- **Work with pages visually.** Select thumbnails, drag pages into order, or enter a range like `1-3, 7`.
- **Pick up where the last tool finished.** **Continue with this PDF** carries the output into another tool. The workspace adapts to desktop and mobile.

> **Try a report workflow.** Merge your report and appendices, number the combined pages, then add a draft watermark. Download the finished PDF when you’re ready.

## Tools

| Tool | What it does |
| --- | --- |
| Document scanner | Creates a multipage A4 PDF from camera photos or browser-readable images. Grayscale is optional. |
| Merge PDFs | Combines multiple PDFs in the order you choose. |
| Split PDF | Extracts a range into one PDF or exports one PDF per selected page in a ZIP. |
| Organize PDF | Reorders, rotates, and removes pages with a thumbnail preview. |
| Images to PDF | Combines JPG and PNG files into a PDF. |
| PDF to images | Exports selected pages as JPG or PNG in a ZIP, up to 50 pages per export. |
| Compress scan | Re-renders scanned pages as lower-resolution images and offers a download when the result is smaller. Selectable text, links, forms, and annotations are lost. |
| PDF to Word | Exports selectable PDF text to an editable DOCX. OCR and original layout reconstruction are future work. |
| Word to PDF | Creates a plain-text PDF from DOCX. Supports Western European characters and omits original formatting and images. |
| Watermark PDF | Adds a translucent, centered text watermark to selected unrotated pages. Supports Western European characters. |
| Page numbers | Adds bottom-centered numbering to selected unrotated pages, with a custom starting number. |
| Sign PDF | Embeds a handwritten PNG signature on a chosen page. This is a visual signature. |
| Sanitize PDF | Removes the document information dictionary, including custom fields, and document-level XMP. Review annotations, embedded files, and image metadata separately. |
| Redact & Blackout | Burns a fixed band near the top of selected pages into their pixels. Rebuilds every page as an image, removing selectable text, links, forms, and annotations. Limited to 50 pages. Review the saved output before sharing. |

The file queue accepts up to 50 files and 100 MB total. PDF processing is limited to 500 pages per job, with lower limits for some tools. Available memory and document complexity affect how large a job the browser can handle.

## Run locally

Requires Node.js 22.13 or later and npm.

```sh
git clone https://github.com/hb-codes11/docSpace.git
cd docSpace
npm ci
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

### Run the checks

```sh
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite runs against the production build. It verifies downloaded files, mobile layout, browser navigation, recovery when a conversion module is missing, and chaining watermarking and page numbering. GitHub Actions runs the build and tests on pushes and pull requests.

## Under the hood

| Area | Implementation |
| --- | --- |
| Workspace | Vite serves a responsive JavaScript and CSS interface. The [tool catalog](src/tools-data.js) defines the controls’ labels, routes, and usage guides. |
| PDF operations | [The processing worker](src/processor.js) uses pdf-lib for page operations and stamping. PDF.js renders thumbnails and page images and extracts selectable text. |
| Conversion | docx creates editable Word exports. JSZip packages image and PDF downloads and reads DOCX input. |
| Accounts | Optional Supabase email sign-in stores the last-used tool and per-account usage counts. The database migrations set row-level security on account tables. |
| Delivery | Vite builds static files into `dist/`. Netlify and Vercel configurations provide routing and headers. Earlier fingerprinted bundles in `public/assets/` help open tabs finish conversions after a release. |

The core tools send no document bytes or filenames to Supabase. Closing or refreshing a tab clears the current workspace.

## Install on your phone

Open the HTTPS site on your phone. On **Android Chrome**, tap **Install app** in docSpace or use Chrome's menu. On **iPhone or iPad**, open the site in **Safari**, tap **Share** and choose **Add to Home Screen**. Turn on **Open as Web App** if Safari shows that option.

Visit once online to cache the app. Local tools can then open offline after caching completes. Sign-in and account sync require a connection. The app caches its code, styles, and icons. Scanned pages and other documents stay in memory until you save them.

Use the sun and moon controls to choose Light or Dark, or the monitor control to follow your device theme. **Save file** opens a filename and folder picker in supporting browsers. **Download** remains available, and **Share file** opens the device share sheet where file sharing is supported. Other browsers show download-and-attach instructions.

## Deploy to Netlify

1. In Netlify, import [`hb-codes11/docSpace`](https://github.com/hb-codes11/docSpace) and select the `main` branch.
2. Use the repository root. [`netlify.toml`](netlify.toml) sets Node 22, the build command `npm run build`, the publish directory `dist`, and the app route fallback.
3. Leave the environment variables blank to deploy in guest mode. Set the Supabase variables below if you want optional accounts.
4. Deploy and open the resulting HTTPS URL. Check a tool route such as `/#/pdf-to-images`, convert a sample document, and confirm the ZIP downloads.

For Vercel, import the same repository as a Vite project. The included [`vercel.json`](vercel.json) supplies the build settings and routing.

### Optional accounts

1. Apply every SQL file in [`supabase/migrations/`](supabase/migrations/) in filename order. This sets up preferences, profiles, usage counts, and the tool catalog constraints. If you already applied the first five migrations, apply [the scanner migration](supabase/migrations/20261115000000_document_scanner.sql), followed by [the signing and privacy tools migration](supabase/migrations/20261121000000_privacy_and_rate_limiting.sql). If the scanner migration is already applied, run only the remaining migration.
2. In Supabase Auth, set the deployment URL as the Site URL and allow the exact sign-in return URLs, including `http://localhost:5173/` for local testing.
3. Copy [`.env.example`](.env.example) to `.env.local` for local development. On your host, set the same variables before building.

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public browser key for Supabase. Keep secret and service-role keys out of the frontend. |

Rebuild after changing these variables. For a live account rollout, verify email sign-in and confirm two test accounts can access only their own records.

## Where it’s going

I’m building docSpace as a personal project and plan to expand it over time. The [roadmap](ROADMAP.md) tracks future improvements, including form filling, on-device OCR, and better Word conversion. Visual signatures and offline installation are available now.

Found a bug? [Open an issue](https://github.com/hb-codes11/docSpace/issues/new) with the tool, browser, and steps to reproduce. Use a synthetic sample if a document is needed to reproduce it.
