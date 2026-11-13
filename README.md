# docSpace

docSpace is a fast, responsive, 100% private web application for client-side PDF and Word workflows.

| Tool | Route | Output |
| --- | --- | --- |
| Merge PDFs | `/merge-pdf` | Combine files in queue order. Drag to reorder or use arrow controls. |
| Split PDF | `/split-pdf` | Select thumbnails or enter ranges. Download a single PDF or one PDF per page in a ZIP. |
| Organize PDF | `/organize-pdf` | Drag or move thumbnails, rotate pages 90°, and remove unwanted pages. |
| Images to PDF | `/images-to-pdf` | Combine JPG and PNG files into a clean PDF. |
| PDF to images | `/pdf-to-images` | Export selected pages as JPG or PNG in a ZIP archive, up to 50 pages at a time. |
| Compress scan | `/compress-pdf` | Render up to 50 pages as lower-resolution JPEGs. Downloads only when output is smaller. |
| Word to PDF | `/word-to-pdf` | Create a plain-text PDF from a DOCX file. Supports Western European characters. |
| PDF to Word | `/pdf-to-word` | Create an editable DOCX from selectable PDF text with paragraph breaks. |

---

## Scalable Architecture

1. **Client-Side WebAssembly & Workers:**
   - Computation runs entirely in the user's browser using `pdf-lib`, `PDF.js`, `docx`, and `JSZip`.
   - Dedicated Web Workers prevent UI freezes during heavy operations.
   - Zero document bytes or file contents ever touch external servers.

2. **SEO & Dynamic Landing Pages:**
   - Dedicated clean routes for every tool (`/merge-pdf`, `/split-pdf`, `/organize-pdf`, etc.) with dynamic OpenGraph meta tags and Schema.org `WebApplication` structured data.
   - Comprehensive landing content below each tool: 3-step How-To instructions, privacy benchmarks, technical limits, and interactive FAQs.

3. **Google AdSense Ready:**
   - Policy-compliant responsive ad unit containers (`top` leaderboard and mid-content slots) pre-styled with clean separation and "ADVERTISEMENT" labels.
   - Zero layout shifts when ads are enabled.
   - Compliant Privacy Policy, Terms of Service, and About pages accessible via modals and footer links.

4. **Vercel Deployment:**
   - `vercel.json` configured with SPA rewrites to `/index.html`, immutable asset caching for fingerprinted assets, and robust HTTP security headers.

5. **Supabase PostgreSQL Row Level Security (RLS):**
   - Migration `20261113000000_scalable_schema_rls.sql` configures:
     - `public.tool_preferences`: Synced user last-used tool preference with strict RLS (`auth.uid() = user_id`).
     - `public.user_profiles`: User profile with auto-creation trigger on signup.
     - `public.user_tool_stats`: User tool usage metrics with per-user RLS isolation.

---

## Developer Setup

Requires Node 22.13 or later and npm.

```sh
npm ci
npm run dev
npm test
npm run build
npm run test:e2e
```

---

## Deployment to Vercel

1. Push your repository to GitHub or GitLab.
2. Import the project into your [Vercel Dashboard](https://vercel.com/new).
3. Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Environment Variables (optional):
   - `VITE_SUPABASE_URL`: Your Supabase Project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase Publishable Key
   - `VITE_ADSENSE_CLIENT_ID`: Your Google AdSense Publisher ID (e.g., `ca-pub-XXXXXXXXXXXXXXXX`)
   - `VITE_ADSENSE_SLOT_TOP`: Ad unit slot ID for the top leaderboard
   - `VITE_ADSENSE_SLOT_BOTTOM`: Ad unit slot ID for the bottom placement
5. Deploy. Vercel automatically applies the `vercel.json` rewrites and caching headers.

---

## Supabase Setup & RLS

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Apply the SQL migrations in order from `supabase/migrations/` via the Supabase SQL Editor:
   - `20261111000000_preferences.sql`
   - `20261112000000_add_tools.sql`
   - `20261113000000_scalable_schema_rls.sql`
3. Under **Authentication > URL Configuration**:
   - Set your Vercel deployment URL (e.g., `https://your-domain.vercel.app`) as the **Site URL**.
   - Add your local dev URL (`http://localhost:5173/`) to **Redirect URLs**.
4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in your `.env.local` or Vercel Environment Variables.
5. All database operations strictly enforce Row Level Security (RLS) — users can access only their own records, and anonymous database access is denied.

---

## Enabling Google AdSense

When your domain starts receiving traffic and gets approved by Google AdSense:
1. Add `VITE_ADSENSE_CLIENT_ID="ca-pub-XXXXXXXXXXXXXXXX"` and `VITE_ADSENSE_SLOT_TOP="1234567890"` to your environment variables.
2. Re-deploy the site. docSpace automatically injects the Google AdSense script into the `<head>` and renders live responsive ad slots inside the pre-configured layout wrappers without any layout shift.

Previously published fingerprinted bundles are retained in public/assets so open browser tabs can load their original conversion modules after deployment. Preserve these files when publishing updates.
