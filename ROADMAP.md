# docSpace product direction

Prioritize everyday PDF tools with strong privacy. Success means a person can finish a document task accurately, understand limitations before processing, and keep document bytes on their device.

## Current release

Ten tools cover merge, split, organize, image conversion, scan compression, text-based Word conversion, watermarks, and page numbers. PDF outputs can continue into another tool without a download and re-selection. Watermarks and numbers currently support unrotated pages. Watermark text uses Western European characters.

Document content and filenames remain in browser memory. Optional accounts store preferences and usage counts. Ads and accounts are disabled in the hosted release until configured.

## Next releases, in order

1. Reliability and usability
   - Representative fixtures for forms, cropped and rotated pages, Unicode, large scans, and corrupt documents.
   - Output previews, undo for page editing, per-page progress, and cancellation during export.
   - Verify Chrome, Safari, Firefox, mobile memory limits, and keyboard/screen-reader workflows.
   - Extend stamping to rotated pages with visual placement and Unicode fonts.

2. Everyday editing
   - Add text and image overlays with a visible placement preview.
   - Fill existing PDF form fields with field-type validation and preserved appearances.
   - Draw or place a signature image, explicitly described as a visual signature.
   - Crop and resize pages with output previews.

3. Scans and conversion fidelity
   - On-device OCR with explicit language download and cancellation.
   - Searchable PDF output verified through text extraction and rendering.
   - Improved DOCX conversion with tables, images, and layout fixtures.
   - Compression presets with visual quality and size comparisons.

4. Installation and launch
   - Installable PWA with versioned application caching and offline verification.
   - Public hosting and custom domain when requested.
   - Connected Supabase auth verified with two independent users and row-access checks.
   - Privacy-focused diagnostics that exclude files, filenames, and document text.

## Release gates

Every advertised tool must produce a verified artifact from its normal UI entry point. Document conversion limits must be shown before processing. Redaction must remove recoverable source content before it can be offered. Retain published fingerprinted assets across deployments to protect open tabs.

## Competitive reference

iLovePDF's documented workflows include page numbering and watermarks.
https://www.ilovepdf.com/help/documentation

Acrobat includes text/image editing and broader document workflows. Full parity remains a longer-term objective.
https://helpx.adobe.com/en/pdf/acrobat_reference.pdf
