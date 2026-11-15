const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/docx-text-DscCvB_s.js","assets/jszip.min-DmP1z0LA.js","assets/word-DahZlceG.js","assets/view-pdf-Bdfownce.js","assets/pdf-images-OGEeKewo.js"])))=>i.map(i=>d[i]);
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t){let n=e.trim().split(`,`),r=new Set;for(let e of n){let n=e.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);if(!n)throw Error(`Enter page numbers or ranges, for example 1-3, 5.`);let i=Number(n[1]),a=Number(n[2]??i);if(i<1||a<i||a>t)throw Error(`Use ascending ranges within pages 1–${t}.`);for(let e=i;e<=a;e++)r.add(e-1)}return[...r]}var t=`modulepreload`,n=function(e){return`/`+e},r={},i=function(e){return e.pathname.endsWith(`.css`)},a=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},o=function(e,o,s){let c=Promise.resolve();if(o&&o.length>0){let e,l=document.querySelector(`meta[property=csp-nonce]`),u=l?.nonce||l?.getAttribute(`nonce`);function d(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function f(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}c=d(o.map(o=>{o=n(o,s);let c=f(o),l=i(c);return a(r,c.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((l?e.styles:e.all).has(c.href))return;let n=document.createElement(`link`);if(n.rel=l?`stylesheet`:t,l||(n.as=`script`),n.crossOrigin=``,n.href=c.href,u&&n.setAttribute(`nonce`,u),document.head.appendChild(n),l)return new Promise((e,t)=>{let r=i=>{n.removeEventListener(`load`,r),n.removeEventListener(`error`,r),i.type===`error`?t(Error(`Unable to preload CSS for ${c}`)):e(i)};n.addEventListener(`load`,r),n.addEventListener(`error`,r)})})}).filter(e=>e!==void 0))}function l(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return c.then(t=>{for(let e of t||[])e.status===`rejected`&&l(e.reason);return e().catch(l)})};function s({grid:t,feedback:n,range:r,onEdit:i}){let a,s=[],c=[],l=!1,u=!1,d;function f(){a?.abort(),a=void 0,c.forEach(e=>URL.revokeObjectURL(e)),c=[],s=[],d=void 0,t.replaceChildren(),t.hidden=!0,n.textContent=``}function p(n){let a=new Set;try{if(r.value.trim())for(let t of e(r.value,s.length))a.add(t)}catch{}let o=s.map((e,t)=>{let n=document.createElement(`li`);n.dataset.page=e.index;let o=document.createElement(`img`);o.alt=``,o.style.rotate=e.turn+`deg`,e.url&&(o.src=e.url);let c=`Page `+(e.index+1);if(!l){let t=document.createElement(`button`);return t.type=`button`,t.className=`page-select`,t.disabled=u,t.setAttribute(`aria-pressed`,String(a.has(e.index))),t.append(o,c),t.onclick=()=>{a.has(e.index)?a.delete(e.index):a.add(e.index),r.value=[...a].map(e=>e+1).join(`, `),i(),p([e.index,`select`])},t.dataset.action=`select`,n.append(t),n}let f=document.createElement(`span`);f.textContent=c,n.append(o,f),n.draggable=!u,n.ondragstart=t=>{d=e,t.dataTransfer.setData(`text/plain`,c)},n.ondragend=()=>{d=void 0},n.ondragover=e=>{d&&e.preventDefault()},n.ondrop=e=>{d&&!u&&(e.preventDefault(),e.stopPropagation(),m(d,t),d=void 0,i(),p())};let h=document.createElement(`div`);h.className=`page-actions`;let g=[[`↑`,`Move earlier`,()=>m(e,t-1),t===0],[`↓`,`Move later`,()=>m(e,t+1),t===s.length-1],[`↻`,`Rotate clockwise`,()=>{e.turn=(e.turn+90)%360},!1],[`×`,`Remove`,()=>{s.splice(t,1)},s.length===1]];for(let[n,r,a,o]of g){let l=document.createElement(`button`);l.className=`icon-button`,l.textContent=n,l.dataset.action=r,l.setAttribute(`aria-label`,r+` `+c.toLowerCase()),l.disabled=u||o,l.onclick=()=>{a(),i(),p([s.includes(e)?e.index:s[Math.min(t,s.length-1)].index,r])},h.append(l)}return n.append(h),n});if(t.replaceChildren(...o),t.hidden=!o.length,n){let e=[...o.find(e=>Number(e.dataset.page)===n[0])?.querySelectorAll(`button:enabled`)??[]];(e.find(e=>e.dataset.action===n[1])??e[0])?.focus()}}function m(e,t){s.splice(s.indexOf(e),1),s.splice(t,0,e)}async function h(e,r){if(f(),l=r,!e)return;a=new AbortController;let{signal:u}=a;n.textContent=`Loading pages…`;try{let[{withPdf:r,pageImage:a},d]=await Promise.all([o(()=>import(`./view-pdf-Bdfownce.js`),[]),e.arrayBuffer()]);await r(d,u,async e=>{s=Array.from({length:e.numPages},(e,t)=>({index:t,turn:0})),p(),i(!0),n.textContent=l?`Drag pages to reorder them, or use the arrow buttons.`:`Select pages or enter a range. An empty range exports all pages.`;let r=[...s];for(let n of r)try{let r=await a(e,n.index,140,u);if(u.aborted)return;n.url=URL.createObjectURL(r),c.push(n.url);let i=t.querySelector(`[data-page="${n.index}"] img`);i&&(i.src=n.url)}catch{if(u.aborted)return}})}catch{u.aborted||(n.textContent=`Could not preview this PDF. Try an unlocked, valid copy.`)}}return{load:h,reset:f,updateRange:()=>p(),setDisabled(e){u!==e&&(u=e,p())},getEdits:()=>s.map(({index:e,turn:t})=>({index:e,turn:t}))}}var c=`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-layers-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z" />
  <path d="m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845" />
</svg>
`,l={scan:{id:`scan`,slug:`scan-document`,title:`Document scanner`,actionText:`Create scanned PDF`,summary:`Capture pages with your camera`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-scan-line"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
  <path d="M7 12h10" />
</svg>
`,kind:`photos`,accept:`image/*`,multiple:!0,hint:`Take a photo of each page or choose existing photos. Arrange them and save an A4 PDF.`,steps:[{title:`Capture each page`,desc:`Place the document on a flat surface and fill the camera frame.`},{title:`Review the page order`,desc:`Use the arrows to arrange your photos. Choose grayscale if you prefer.`},{title:`Save your scan`,desc:`Enter a filename and save the PDF.`}],faqs:[{q:`Can I select text in my scan?`,a:`Scans contain page images. Text recognition requires an OCR tool.`}]},merge:{id:`merge`,slug:`merge-pdf`,title:`Merge PDFs`,actionText:`Merge PDFs`,summary:`Combine documents in any order`,hint:`Add at least two PDFs, then arrange them in the order you want.`,icon:c,multiple:!0,seoTitle:`Merge PDFs | docSpace`,seoDescription:`Combine PDFs in the order you choose.`,steps:[{title:`Upload PDFs`,desc:`Select or drag & drop two or more PDF documents into the queue.`},{title:`Arrange Order`,desc:`Drag files or click arrow buttons to arrange pages in your exact preferred sequence.`},{title:`Download Merged PDF`,desc:`Click Merge PDFs to combine documents locally and download immediately.`}],features:[`Preserves original vector clarity, embedded typography, and crisp resolution.`,`Supports merging up to 50 individual PDF files totaling up to 100 MB.`,`Complete privacy: files are merged in your local browser memory using browser processing.`],faqs:[{q:`Are my uploaded PDFs stored on your servers?`,a:`No. docSpace processes every document directly inside your web browser using browser processing. Your files never leave your device.`},{q:`Is there a limit on how many PDFs I can merge?`,a:`You can merge up to 50 documents totaling up to 100 MB and 500 total pages per batch.`},{q:`Can I reorder the files before merging?`,a:`Yes. Simply drag files up or down in the list, or use the handy arrow controls to set the precise ordering.`}]},split:{id:`split`,slug:`split-pdf`,title:`Split PDF`,actionText:`Split PDF`,summary:`Extract pages or split into files`,hint:`Select the pages you want to keep or save each page as a separate PDF.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-scissors"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="6" cy="6" r="3" />
  <path d="M8.12 8.12 12 12" />
  <path d="M20 4 8.12 15.88" />
  <circle cx="6" cy="18" r="3" />
  <path d="M14.8 14.8 20 20" />
</svg>
`,multiple:!1,seoTitle:`Split PDF Online Free — Extract Pages & Split Files | docSpace`,seoDescription:`Extract specific pages or separate entire PDF files into individual documents securely on your computer or phone.`,steps:[{title:`Select Document`,desc:`Pick the PDF document you want to extract or split.`},{title:`Specify Pages`,desc:`Enter page ranges (e.g., 1-3, 5) or click thumbnail previews to choose pages.`},{title:`Export PDF or ZIP`,desc:`Download as a single extracted PDF or check ZIP to get each page as an individual file.`}],features:[`Flexible range syntax: easily extract non-consecutive pages and page intervals.`,`Instant interactive thumbnail preview with visual page selector.`,`One-click ZIP bundling for bulk single-page extraction.`],faqs:[{q:`How do I specify multiple pages?`,a:`Type comma-separated numbers and ranges, such as "1, 3-5, 8". You can also click the page previews directly.`},{q:`Can I export every page as a separate PDF?`,a:`Yes. Simply check the "Save each selected page separately in a ZIP" option before processing.`}]},organize:{id:`organize`,slug:`organize-pdf`,title:`Organize PDF`,actionText:`Organize PDF`,summary:`Reorder, rotate, or remove pages`,hint:`Arrange the page thumbnails, then save a new PDF.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-layout-grid"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="7" height="7" x="3" y="3" rx="1" />
  <rect width="7" height="7" x="14" y="3" rx="1" />
  <rect width="7" height="7" x="14" y="14" rx="1" />
  <rect width="7" height="7" x="3" y="14" rx="1" />
</svg>
`,multiple:!1,seoTitle:`Organize PDF Pages Online — Rotate, Reorder & Delete | docSpace`,seoDescription:`Visual page organizer for PDF files. Rearrange pages with drag and drop, rotate orientations, and remove unwanted pages with live previews.`,steps:[{title:`Upload Document`,desc:`Choose a PDF to see page thumbnails.`},{title:`Organize Visually`,desc:`Drag thumbnails to reorder, click rotate (↻) to turn pages 90°, or click (×) to delete.`},{title:`Save New PDF`,desc:`Click Organize PDF to generate your updated document in seconds.`}],features:[`Visual drag-and-drop page canvas with fluid reordering.`,`Per-page 90° clockwise rotation for correcting misaligned scans.`,`Instantly remove unwanted or blank pages before finalizing.`],faqs:[{q:`Does rotating a page affect its quality?`,a:`No, page rotation modifies standard PDF viewport metadata losslessly without recompressing images.`},{q:`Can I undo deleted pages?`,a:`Before clicking Organize PDF, you can reload the original file at any time to start fresh.`}]},images:{id:`images`,slug:`images-to-pdf`,title:`Images to PDF`,actionText:`Images to PDF`,summary:`Combine JPG and PNG files`,hint:`Arrange your images. Each image becomes one PDF page.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-images"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16" />
  <path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2" />
  <circle cx="13" cy="7" r="1" fill="currentColor" />
  <rect x="8" y="2" width="14" height="14" rx="2" />
</svg>
`,accept:`.jpg,.jpeg,.png,image/jpeg,image/png`,kind:`images`,multiple:!0,seoTitle:`Convert JPG & PNG Images to PDF Online Free | docSpace`,seoDescription:`Transform photos, receipts, scans, and graphic images into a consolidated PDF file. Fast, free, and completely confidential.`,steps:[{title:`Select Images`,desc:`Upload JPG, JPEG, or PNG images from your device.`},{title:`Sequence Images`,desc:`Rearrange image cards in the order you want them to appear in the PDF.`},{title:`Build Document`,desc:`Generate your multi-page PDF document and download it.`}],features:[`Supports all standard JPEG and PNG formats.`,`Automatically matches each page dimension to the source image dimensions.`,`Batch conversion of up to 50 photos or documents in one operation.`],faqs:[{q:`Are my images compressed when converted?`,a:`Original image byte clarity is preserved without unnecessary downsampling.`},{q:`Can I mix PNG and JPG files together?`,a:`Yes! You can add both formats into a single batch.`}]},export:{id:`export`,slug:`pdf-to-images`,title:`PDF to images`,actionText:`PDF to images`,summary:`Save pages as JPG or PNG`,hint:`Export up to 50 selected pages at a time in a ZIP file.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-image-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
  <path d="m14 19 3 3v-5.5" />
  <path d="m17 22 3-3" />
  <circle cx="9" cy="9" r="2" />
</svg>
`,multiple:!1,seoTitle:`Convert PDF to Images Online — Export JPG or PNG | docSpace`,seoDescription:`Turn PDF document pages into high-resolution JPG or PNG image files. Download all rendered pages in a clean, organized ZIP.`,steps:[{title:`Upload PDF`,desc:`Choose the PDF you wish to convert into image files.`},{title:`Select Format & Pages`,desc:`Choose PNG or JPG format, and specify which pages to render.`},{title:`Download ZIP`,desc:`Receive a structured ZIP archive containing every rendered page image.`}],features:[`High-fidelity canvas rasterization powered by PDF.js.`,`Choice between lossless PNG or lightweight JPG compression.`,`Selective page export allows targeting only the graphics you need.`],faqs:[{q:`Which format should I choose: PNG or JPG?`,a:`Choose PNG for clean vector text, logos, and diagrams; choose JPG for photographs and complex scanned pages.`},{q:`Is there a limit on how many pages I can export?`,a:`Export up to 50 pages per batch.`}]},compress:{id:`compress`,slug:`compress-pdf`,title:`Compress scan`,actionText:`Compress scan`,summary:`Reduce the size of scanned PDFs`,hint:`Re-encode up to 50 pages as lower-resolution images. The new PDF loses selectable text, links, forms, and annotations.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-minimize-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m14 10 7-7" />
  <path d="M20 10h-6V4" />
  <path d="m3 21 7-7" />
  <path d="M4 14h6v6" />
</svg>
`,multiple:!1,seoTitle:`Compress Scanned PDF Online Free — Reduce PDF Size | docSpace`,seoDescription:`Significantly reduce the file size of heavy scanned PDF documents locally on your device. Downloads only if the file size is reduced.`,steps:[{title:`Select Scanned PDF`,desc:`Choose a large scanned document that exceeds your email or portal limit.`},{title:`Optimize In-Browser`,desc:`docSpace re-encodes scanned bitmap pages with efficient compression.`},{title:`Download Smaller PDF`,desc:`Compare sizes and download your lightweight PDF file.`}],features:[`Intelligent compression safeguard: downloads only if the output is genuinely smaller than the original.`,`Ideal for heavy receipts, contracts, government forms, and archival scans.`,`No cloud processing: your sensitive legal and personal records remain strictly on your machine.`],faqs:[{q:`Why did compression report no smaller file?`,a:`If your PDF is already heavily optimized, compressing further might increase size. The download is available when the result is smaller.`},{q:`Does compression preserve selectable text?`,a:`Scanned compression re-encodes pages as optimized raster images, so interactive form fields and selectable text are omitted in this mode.`}]},docx:{id:`docx`,slug:`word-to-pdf`,title:`Word to PDF`,actionText:`Word to PDF`,summary:`Export DOCX text as PDF`,hint:`Create a plain-text PDF from a DOCX file. Formatting and images are omitted. Supports Western European characters.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-file-up"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  <path d="M12 12v6" />
  <path d="m15 15-3-3-3 3" />
</svg>
`,accept:`.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document`,kind:`DOCX`,multiple:!1,seoTitle:`Convert Word DOCX to PDF Online Free — Private & Fast | docSpace`,seoDescription:`Convert Microsoft Word DOCX files to clean, searchable PDF documents directly in your browser with zero document uploads.`,steps:[{title:`Select Word Document`,desc:`Pick your .docx file from your device.`},{title:`Extract & Typeset`,desc:`docSpace parses XML paragraphs and renders crisp PDF pages locally.`},{title:`Download PDF`,desc:`Save the PDF.`}],features:[`Pure client-side XML extraction: zero transmission of proprietary corporate or personal Word files.`,`Automatic page budgeting and clean typography formatting.`,`Conversion runs in your browser.`],faqs:[{q:`Does Word to PDF preserve images and tables?`,a:`This tool extracts clean text and paragraph structures. Complex tables and embedded images are omitted for reliable browser typesetting.`},{q:`Are older .doc files supported?`,a:`Standard modern .docx files (Office 2007+) are supported.`}]},word:{id:`word`,slug:`pdf-to-word`,title:`PDF to Word`,actionText:`Export editable text`,summary:`Export editable text to DOCX`,hint:`Convert selectable text into a Word document. Scanned pages and original layout are outside this conversion.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-file-text"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  <path d="M10 9H8" />
  <path d="M16 13H8" />
  <path d="M16 17H8" />
</svg>
`,multiple:!1,seoTitle:`Convert PDF to Word DOCX Online — Extract Editable Text | docSpace`,seoDescription:`Transform selectable PDF document text into an editable Microsoft Word .docx file with paragraph breaks intact.`,steps:[{title:`Upload PDF`,desc:`Select the PDF containing selectable text that you need to edit.`},{title:`Extract Text Stream`,desc:`PDF.js extracts textual characters, font baselines, and page breaks in-memory.`},{title:`Download DOCX`,desc:`Open your generated .docx document in Microsoft Word, Google Docs, or LibreOffice.`}],features:[`Generates fully editable Microsoft Word .docx files compatible with all modern office suites.`,`Preserves multi-page structural page breaks and paragraph flows.`,`Document processing runs on your device.`],faqs:[{q:`Can this convert scanned images of text to Word?`,a:`The document must contain selectable text characters. Scanned image-only PDFs require OCR first.`},{q:`Can I edit the output in Google Docs?`,a:`Yes! The generated DOCX file can be opened directly in Google Docs, Word, or Pages.`}]},watermark:{id:`watermark`,slug:`watermark-pdf`,title:`Watermark PDF`,summary:`Mark selected pages with text`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-stamp"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13" />
  <path d="M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z" />
  <path d="M5 22h14" />
</svg>
`,hint:`Add a translucent centered watermark to selected pages. Supports unrotated PDFs and Western European text.`,steps:[{title:`Choose a PDF`,desc:`Your document stays on this device.`},{title:`Enter your watermark`,desc:`Choose the text and page range.`},{title:`Save your PDF`,desc:`Download the marked copy or continue in another tool.`}],faqs:[{q:`Does a watermark protect the document?`,a:`It adds a visible label. It does not restrict copying or editing.`}]},numbers:{id:`numbers`,slug:`page-numbers`,title:`Page numbers`,summary:`Number selected PDF pages`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-list-ordered"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 5h10" />
  <path d="M11 12h10" />
  <path d="M11 19h10" />
  <path d="M4 4h1v5" />
  <path d="M4 9h2" />
  <path d="M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02" />
</svg>
`,hint:`Place page numbers at the bottom center. Choose a range and a starting number. Supports unrotated PDFs.`,steps:[{title:`Choose a PDF`,desc:`Open an unrotated PDF.`},{title:`Set the numbering`,desc:`Enter a starting number and optionally choose pages.`},{title:`Save the numbered copy`,desc:`Download or continue with another PDF tool.`}],faqs:[{q:`How are selected pages numbered?`,a:`Numbers increment in the order of your selected range, starting at the number you enter.`}]}};function u(e){if(e)return Object.hasOwn(l,e)?l[e]:Object.values(l).find(t=>t.slug===e)}function d(e){let t=Object.values(l).filter(t=>t.id!==e.id).slice(0,4);return`
    <section class="landing-section" aria-label="Tool Information and Guides">
      <!-- 3-Step How-To Guide -->
      <div class="landing-block">
        <h3 class="section-title">Using ${e.title}</h3>
        <div class="steps-grid">
          ${e.steps.map((e,t)=>`
            <div class="step-card">
              <span class="step-num">${t+1}</span>
              <h4 class="step-title">${e.title}</h4>
              <p class="step-desc">${e.desc}</p>
            </div>
          `).join(``)}
        </div>
      </div>

      <div class="landing-block">
        <h3 class="section-title">Your files stay on this device</h3>
        <p>Document processing runs in your browser. Download your result or continue in another tool. Closing or reloading the page clears the current workspace.</p>
      </div>

      <!-- Frequently Asked Questions -->
      <div class="landing-block faq-block">
        <h3 class="section-title">Frequently Asked Questions</h3>
        <div class="faq-list">
          ${e.faqs.map(e=>`
            <details class="faq-item">
              <summary class="faq-question">
                <span>${e.q}</span>
              </summary>
              <div class="faq-answer">
                <p>${e.a}</p>
              </div>
            </details>
          `).join(``)}
        </div>
      </div>

      <!-- Related Tools Grid -->
      <div class="landing-block">
        <h3 class="section-title">Other PDF tools</h3>
        <div class="related-grid">
          ${t.map(e=>`
            <a href="/#/${e.slug}" class="related-card" data-switch-tool="${e.id}">
              <span class="related-icon">${e.icon}</span>
              <div class="related-info">
                <strong>${e.title}</strong>
                <span>${e.summary}</span>
              </div>
            </a>
          `).join(``)}
        </div>
      </div>
    </section>
  `}var f=`
  <h2>Privacy Policy</h2>
  <p class="legal-effective">Last updated November 2026</p>

  <h3>Documents</h3>
  <p>docSpace processes documents in your browser. The document tools do not send your files, filenames, or extracted content to a server.</p>

  <h3>Optional accounts</h3>
  <p>If you sign in, Supabase handles your email address and stores your last-used tool and per-tool usage counts. Database policies limit access to your account records.</p>
`,p=`
  <h2>Terms of Service</h2>
  <p class="legal-effective">Last updated: November 2026</p>

  <h3>1. Acceptance of Terms</h3>
  <p>By accessing or using docSpace, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

  <h3>2. Description of Service</h3>
  <p>docSpace provides client-side document processing tools, including PDF merging, splitting, organization, compression, and format conversions. The services are provided "as is" and "as available".</p>

  <h3>3. User Responsibilities</h3>
  <p>You retain full ownership and copyright of all documents and files you process using docSpace. Because processing happens locally on your device, you are solely responsible for ensuring you have the legal right to view and modify any documents you open in the application.</p>

  <h3>4. Disclaimer of Warranties</h3>
  <p>docSpace is provided without warranty of any kind, express or implied. While we take pride in rigorous client-side testing, we do not warrant that results will be uninterrupted, error-free, or meet all specific formatting requirements for complex proprietary documents.</p>

  <h3>5. Limitation of Liability</h3>
  <p>Under no circumstances shall docSpace or its contributors be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the tools.</p>
`,m=`
  <h2>About docSpace</h2>
  <p>docSpace is a personal project for everyday PDF and Word work. You can merge, split, organize, convert, and mark up documents in your browser.</p>
`;function h(){let e=location.hash.replace(/^#\/?/,``),t=location.pathname.replace(/^\/|\/$/g,``);return u(e)?.id??u(t)?.id??`merge`}function g(e,t=!1){let n=l[e];if(document.title=n.seoTitle||n.title+` — docSpace`,document.querySelector(`meta[name="description"]`).content=n.seoDescription||n.hint,t){let t=new URL(`/`,location.origin);t.hash=e===`merge`?``:`/`+n.slug,t.href!==location.href&&history.pushState(null,``,t)}}function _(e,t){let n=t.lastIndexOf(`.`),r=t.slice(n),i=e.trim().replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g,`-`);for(;i.toLowerCase().endsWith(r);)i=i.slice(0,-r.length).trimEnd();return i=[...i].slice(0,100).join(``).replace(/^[. ]+|[. ]+$/g,``),i?(/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(i)&&(i=`_`+i),i+r):t}function v(e,t){let n=document.documentElement,r=matchMedia(`(prefers-color-scheme: dark)`);try{let t=localStorage.getItem(`docspace-theme`);[`system`,`light`,`dark`].includes(t)&&(e.value=t)}catch{}let i=()=>{let i=e.value===`dark`||e.value===`system`&&r.matches;n.dataset.theme=i?`dark`:`light`,document.querySelector(`meta[name="theme-color"]`).content=i?`#171322`:`#f8f7fc`,t(i)};e.onchange=()=>{try{localStorage.setItem(`docspace-theme`,e.value)}catch{}i()},r.addEventListener(`change`,i),i()}function y(e,t){let n=matchMedia(`(display-mode: standalone)`),r;function i(){e.hidden=n.matches||navigator.standalone===!0}window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),r=e,i()}),window.addEventListener(`appinstalled`,()=>{r=void 0,i()}),n.addEventListener(`change`,i),e.onclick=async()=>{if(!r){t.showModal();return}let e=r;r=void 0;try{await e.prompt()}catch{t.showModal()}},i(),`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`/sw.js`).catch(e=>console.warn(`Offline setup failed`,e))})}var b=`10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`,x=8,ee=320,te=/^(currentcolor|inherit)$/i,ne=.15,S=.62,C=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-n/r)),re=e=>Math.min(1,Math.max(0,Number(e)||0)),w=(e,t,n)=>{let r=re((n-e)/(t-e));return r*r*(3-2*r)},T=(...e)=>{let t=2166136261;for(let n of e)t=Math.imul(t^(n|0),16777619),t^=t>>>13,t=Math.imul(t,1540483477),t^=t>>>15;return(t>>>0)/4294967296},E=e=>e>0?`+${e}`:e<0?`−${-e}`:`0`;function D(e,t={}){if(!e)return;e.classList.add(`tech-text`),t.className&&e.classList.add(...t.className.split(` `).filter(Boolean)),e.setAttribute(`role`,`img`),e.setAttribute(`aria-label`,t.text||`docSpace`);let n=e.querySelector(`.tech-text-canvas`);n||(n=document.createElement(`canvas`),n.className=`tech-text-canvas`,e.appendChild(n));let r={current:{text:`docSpace`,fontFamily:``,fontWeight:800,fontSize:90,letterSpacing:-.05,color:`currentColor`,accentColor:`#7c3aed`,align:`left`,reach:160,softness:.7,dashLength:4,dashGap:2,strokeWidth:1.5,lineStyle:`dashed`,reveal:`letter`,specks:12,selection:!0,labels:!0,draggable:!0,bounce:.4,sweep:!0,speed:1,clickKick:!0,intro:`none`,introDuration:2,guides:!1,...t}},i={current:()=>{}},a=n?.getContext(`2d`),o=document.createElement(`canvas`),s=o.getContext(`2d`);if(!e||!n||!a||!s)return;let c=window.matchMedia?.(`(prefers-reduced-motion: reduce)`)?.matches,l=1,u=1,d=1,f=0,p=performance.now(),m=!1,h=!0,g=``,_=!0,v=``,y=null,D=[],O=0,ie=0,ae=0,oe=!1,k=-1,A=``,j=0,M=``,N=!1,P=!document.fonts,F=0,I=[],L={x:0,y:0,time:0,index:-1},R={x:0,y:0,inside:!1},z={x:0,y:0},B={x:0,y:0},V={x1:0,y1:0,x2:0,y2:0,alpha:0,index:-1},H=()=>{g=``,i.current()},U=()=>{P=!0,H()},W=t=>t.fontFamily||getComputedStyle(e).fontFamily||`sans-serif`,G=(e,t)=>`${e.fontWeight} ${t}px ${W(e)}`,K=t=>{let n=getComputedStyle(e).color||`#000000`,r=e=>!e||te.test(String(e).trim())?n:e;return{ink:r(t.color),accent:r(t.accentColor)}},q=(e,t,n)=>{e.font=G(t,n),`letterSpacing`in e&&(e.letterSpacing=`${t.letterSpacing*n}px`),e.textAlign=`left`,e.textBaseline=`alphabetic`},se=(e,t,n,r,i)=>{let a=Math.ceil(e.strokeWidth*2+4),o=n.box.x1-a,s=n.box.y1-a,c=n.box.x2-n.box.x1+a*2,l=n.box.y2-n.box.y1+a*2,u=document.createElement(`canvas`);u.width=Math.max(1,Math.ceil(c*d)),u.height=Math.max(1,Math.ceil(l*d));let f=u.getContext(`2d`);return f&&(f.setTransform(d,0,0,d,-o*d,-s*d),q(f,e,t.size),r?(f.lineJoin=`round`,f.lineWidth=e.strokeWidth*2,f.lineCap=`butt`,f.strokeStyle=i,e.lineStyle!==`solid`&&f.setLineDash([Math.max(1,e.dashLength),Math.max(1,e.dashGap)]),f.strokeText(n.char,n.x,t.baseline),f.setLineDash([]),f.globalCompositeOperation=`destination-out`,f.fillStyle=`#000000`,f.fillText(n.char,n.x,t.baseline),f.globalCompositeOperation=`source-over`):(f.fillStyle=i,f.fillText(n.char,n.x,t.baseline))),{image:u,left:o,top:s}},ce=(e,t)=>{let n=[e.text,W(e),e.fontWeight,e.fontSize,e.letterSpacing,e.align,t,e.dashLength,e.dashGap,e.strokeWidth,e.lineStyle,l,u,d].join(`|`);if(n===g&&y)return y;g=n;let r=G(e,64);document.fonts&&r!==v&&(v=r,document.fonts.load(r,e.text).then(H,H));let i=s;q(i,e,e.fontSize);let a=i.measureText(e.text),o=Math.min(1,l*.9/Math.max(a.actualBoundingBoxLeft+a.actualBoundingBoxRight,1),u*.66/Math.max(a.actualBoundingBoxAscent+a.actualBoundingBoxDescent,1)),c=e.fontSize*o;q(i,e,c),a=i.measureText(e.text);let f=a.actualBoundingBoxLeft+a.actualBoundingBoxRight,p=a.actualBoundingBoxAscent+a.actualBoundingBoxDescent,m=l*.05,h=(e.align===`left`?m:e.align===`right`?l-m-f:(l-f)/2)+a.actualBoundingBoxLeft,_=(u-p)/2+a.actualBoundingBoxAscent,b=_-i.measureText(`x`).actualBoundingBoxAscent,x=_-i.measureText(`H`).actualBoundingBoxAscent,ee=_-i.measureText(`d`).actualBoundingBoxAscent,te=_+i.measureText(`p`).actualBoundingBoxDescent,ne=_-a.actualBoundingBoxAscent,S=_+a.actualBoundingBoxDescent,C=Math.min(ne,x)-2,re=Math.max(S,_)+2,w={size:c,baseline:_,left:h-a.actualBoundingBoxLeft,right:h+a.actualBoundingBoxRight,top:ne,bottom:S,lines:[{y:_,label:`baseline`},{y:b,label:`x-height`},{y:x,label:`cap height`},...x-ee>Math.max(11,c*.06)?[{y:ee,label:`ascender`}]:[],{y:te,label:`descender`}],bands:[{y0:b,y1:_,up:!0,order:0},{y0:x,y1:b,up:!0,order:1},{y0:C,y1:x,up:!0,order:2},{y0:_,y1:re,up:!1,order:1}].filter(e=>e.y1-e.y0>.5)};y=w;let T=Array.from(e.text),E=D;D=[];let O=``;return T.forEach((n,r)=>{O+=n;let a=i.measureText(n),o=h+i.measureText(O).width-a.width;if(!n.trim())return;let s={char:n,x:o,box:{x1:o-a.actualBoundingBoxLeft,y1:_-a.actualBoundingBoxAscent,x2:o+a.actualBoundingBoxRight,y2:_+a.actualBoundingBoxDescent}},c=E[D.length],l=c?.char===n&&c.index===r;D.push({...s,offset:l?c.offset:{x:0,y:0},velocity:l?c.velocity:{x:0,y:0},outline:l?c.outline:0,shown:l?c.shown:1,cells:null,assembled:0,index:r,fill:se(e,w,s,!1,t),dashes:se(e,w,s,!0,t)})}),k>=0&&D[k]?.index!==E[k]?.index&&(k=-1),V.index>=0&&D[V.index]?.char!==E[V.index]?.char&&(V.index=-1),w},le=(e,t)=>{if(!y||t<y.top-24||t>y.bottom+24)return-1;let n=-1,r=1/0;return D.forEach((t,i)=>{let a=t.box.x1+t.offset.x,o=t.box.x2+t.offset.x,s=e<a?a-e:e>o?e-o:0;s<r&&(r=s,n=i)}),r<28?n:-1},ue=(e,t,n,r,i,a)=>{let o=Math.min(1,Math.max(0,1-a)),s=e.createRadialGradient(t,n,0,t,n,r);if(s.addColorStop(0,`rgba(0, 0, 0, ${i})`),o>.995)return s.addColorStop(.995,`rgba(0, 0, 0, ${i})`),s.addColorStop(1,`rgba(0, 0, 0, 0)`),s;for(let e=0;e<=x;e++){let t=e/x,n=t*t*(3-2*t);s.addColorStop(o+(1-o)*t,`rgba(0, 0, 0, ${i*(1-n)})`)}return s},J=(e,t,n,r,i,a)=>{e.drawImage(t.image,Math.round((t.left+n)*d-i),Math.round((t.top+r)*d-a))},de=e=>{let t=e.reach*d,r=B.x*d,i=B.y*d;a.globalCompositeOperation=`destination-out`,a.fillStyle=ue(a,r,i,t,O,e.softness),a.fillRect(r-t,i-t,t*2,t*2),a.globalCompositeOperation=`source-over`;let c=Math.max(0,Math.floor(r-t)),l=Math.max(0,Math.floor(i-t)),u=Math.min(n.width,Math.ceil(r+t)),f=Math.min(n.height,Math.ceil(i+t));if(u<=c||f<=l)return;let p=u-c,m=f-l;(o.width<p||o.height<m)&&(o.width=Math.max(o.width,p),o.height=Math.max(o.height,m)),s.setTransform(1,0,0,1,0,0),s.globalCompositeOperation=`source-over`,s.clearRect(0,0,p,m);for(let e of D)J(s,e.dashes,e.offset.x,e.offset.y,c,l);s.globalCompositeOperation=`destination-in`,s.fillStyle=ue(s,r-c,i-l,t,1,e.softness),s.fillRect(0,0,p,m),s.globalCompositeOperation=`source-over`,a.globalAlpha=O,a.drawImage(o,0,0,p,m,c,l,p,m),a.globalAlpha=1},Y=e=>(Math.round(e*d)+.5)/d,X=(e,t,n)=>{let r=(e%(2*(t+n))+2*(t+n))%(2*(t+n));return r<t?[V.x1+r,V.y1,0,-1]:(r-=t,r<n?[V.x2,V.y1+r,1,0]:(r-=n,r<t?[V.x2-r,V.y2,0,1]:(r-=t,[V.x1,V.y2-r,-1,0])))},fe=(e,t,n)=>{let r=V.x2-V.x1,i=V.y2-V.y1;if(r<2||i<2)return;let o=2*(r+i),s=V.index+1;a.fillStyle=n,a.strokeStyle=n;for(let n=0;n<e.specks;n++){let e=.5+T(s,n,11)*1.2,c=ae/e+T(s,n,17),l=Math.floor(c),u=c-l;if(u>.7)continue;let[d,f,p,m]=X(T(s,n,l)*o,r,i),h=T(s,n,l,2),g=h<.46?2:h<.7?3:h<.84?5:h<.94?8:11,_=g>=8,v=(_?9:4)+Math.floor(T(s,n,l,1)*5)*3,y=V.x1+Math.round((d+p*v-V.x1)/3)*3,b=V.y1+Math.round((f+m*v-V.y1)/3)*3,x=T(s,n,l,3),ee=u<.06||u>.32&&u<.36?.35:1,te=t*(_?.3+.4*x:.3+.6*x)*ee,ne=Math.round(y-g/2),S=Math.round(b-g/2);a.globalAlpha=te,x<.26||_&&x<.78?(a.strokeRect(ne+.5,S+.5,g,g),_&&x>.5&&a.fillRect(Math.round(y)-1,Math.round(b)-1,2,2)):a.fillRect(ne,S,g,g)}for(let n=0;n<2;n++){let s=(ae*.42*e.speed+n*.5)*o;for(let e=0;e<4;e++){let[n,o]=X(s-e*6,r,i),c=e===0?3:2;a.globalAlpha=t*[.95,.55,.32,.16][e],a.fillRect(Math.round(n-c/2),Math.round(o-c/2),c,c)}}a.globalAlpha=1},pe=(e,t)=>{let n=D[V.index];if(!n||V.alpha<.01)return;let r=V.alpha,i=Y(V.x1),o=Y(V.y1),s=Y(V.x2),c=Y(V.y2);a.setTransform(d,0,0,d,0,0),a.fillStyle=t,a.strokeStyle=t,a.lineWidth=1;let l=Math.hypot(n.offset.x,n.offset.y);if(l>1){let e=(n.box.x1+n.box.x2)/2,t=(n.box.y1+n.box.y2)/2;a.beginPath(),a.moveTo(e,t),a.lineTo(e+n.offset.x,t+n.offset.y),a.setLineDash([3,4]),a.globalAlpha=.45*r,a.stroke(),a.setLineDash([]),a.beginPath(),a.rect(Math.round(e)-2,Math.round(t)-2,4,4),a.globalAlpha=.7*r,a.fill()}a.beginPath(),a.rect(i,o,s-i,c-o),a.globalAlpha=.5*r,a.stroke(),a.beginPath();for(let[e,t]of[[i,o],[s,o],[s,c],[i,c]])a.rect(Math.round(e)-2,Math.round(t)-2,5,5);if(a.globalAlpha=.95*r,a.fill(),a.globalAlpha=1,e.specks>0&&fe(e,r,t),!e.labels)return;a.font=b,a.textAlign=`left`,a.textBaseline=`bottom`,a.fillStyle=t,a.globalAlpha=.62*r;let u=l>1?`${E(Math.round(n.offset.x))}, ${E(Math.round(-n.offset.y))}`:`${n.char}  ${Math.round(n.box.x2-n.box.x1)} × ${Math.round(n.box.y2-n.box.y1)}`;a.fillText(u,Math.round(V.x1),Math.round(V.y1)-7),a.globalAlpha=1},Z=(e,t,n,r,i)=>{let o=Math.max(12,t.size*.12),s=Math.round(t.left-o),c=Math.round(t.right+o),u=l-c>s;a.setTransform(d,0,0,d,0,0),a.strokeStyle=n,a.fillStyle=n,a.lineWidth=1,a.font=b,a.textBaseline=`middle`,a.textAlign=u?`left`:`right`,t.lines.forEach((t,n)=>{let o=i(n);if(o<=.001)return;let l=Y(t.y),d=s+(c-s)*o;a.globalAlpha=r*.4,a.beginPath(),a.moveTo(s,l),a.lineTo(d,l),a.stroke(),a.globalAlpha=r*.9,a.fillRect(s-1,Math.round(t.y)-1,3,3),a.fillRect(Math.round(d)-1,Math.round(t.y)-1,3,3),e.labels&&(a.globalAlpha=r*.62*w(.7,1,o),a.fillText(t.label,u?c+8:s-8,Math.round(t.y)))}),a.textAlign=`left`,a.setTransform(1,0,0,1,0,0),a.globalAlpha=1},me=(e,t)=>{if(e.cells)return e.cells;let n=e.fill,r=Math.max(3,Math.round(t.size/26)),i=n.image.width,a=n.image.height,o=n.image.getContext(`2d`),s=[];if(e.cells=s,e.assembled=0,!o||i<2||a<2)return s;let c=o.getImageData(0,0,i,a).data,l=Math.floor(n.left/r)*r,u=Math.floor(n.top/r)*r,f=Math.ceil((n.left+i/d-l)/r)+1,p=Math.ceil((n.top+a/d-u)/r)+1,m=new Uint8Array(f*p);for(let e=0;e<a;e++)for(let t=0;t<i;t++){if(c[(e*i+t)*4+3]<24)continue;let a=Math.floor((n.left+t/d-l)/r),o=Math.floor((n.top+e/d-u)/r);m[o*f+a]=1}let h=re(((e.box.x1+e.box.x2)/2-t.left)/Math.max(1,t.right-t.left));for(let n=0;n<m.length;n++){if(!m[n])continue;let i=T(e.index,n,1)*Math.PI*2,a=t.size*(.25+.6*T(e.index,n,2)),o=.03+.36*h+.12*T(e.index,n,3),c=o+.3+.14*T(e.index,n,4);s.push({x:l+n%f*r,y:u+Math.floor(n/f)*r,size:r,dx:Math.cos(i)*a,dy:Math.sin(i)*a*.7,start:o,land:c}),e.assembled=Math.max(e.assembled,c)}return s},he=(e,t,n)=>{let r=Math.round(e*d),i=Math.round(t*d);return[r,i,Math.round((e+n)*d)-r,Math.round((t+n)*d)-i]},ge=(e,t,n)=>{let r=e.cells||[];a.save(),a.beginPath();let i=0;for(let e of r){if(t<e.land)continue;let[n,r,o,s]=he(e.x,e.y,e.size);a.rect(n,r,o,s),i++}i&&(a.clip(),J(a,e.fill,0,0,0,0)),a.restore(),a.fillStyle=n;for(let e of r){if(t<e.start||t>=e.land)continue;let n=(t-e.start)/(e.land-e.start),r=1-(1-n)**4,i=e.size*(.4+.6*r),o=e.x+(e.size-i)/2+e.dx*(1-r),s=e.y+(e.size-i)/2+e.dy*(1-r),[c,l,u,d]=he(o,s,i);a.globalAlpha=Math.min(1,n*4)*(.55+.45*r),a.fillRect(c,l,Math.max(1,u),Math.max(1,d))}a.globalAlpha=1},_e=(e,t,n,r)=>{let i=e.fill,o=Math.floor(i.left*d),s=Math.floor(i.top*d),c=i.image.width+2,l=i.image.height+2,u=re((n-.24-.28*t)/.48),f=[];for(let e of r.bands){let t=w(.3*e.order,.3*e.order+.4,u);if(t<=0)continue;let n=(e.y1-e.y0)*t,r=Math.round((e.up?e.y1-n:e.y0)*d),i=Math.round((e.up?e.y1:e.y0+n)*d);i>r&&f.push([r,i-r])}let p=w(.08+.2*t,.22+.2*t,n);if(p>.001){a.save(),a.beginPath(),a.rect(o-2,s-2,c+2,l+2);for(let[e,t]of f)a.rect(o-2,e,c+2,t);a.clip(`evenodd`),a.globalAlpha=p,J(a,e.dashes,0,0,0,0),a.restore()}if(f.length){a.save(),a.beginPath();for(let[e,t]of f)a.rect(o-2,e,c+2,t);a.clip(),J(a,e.fill,0,0,0,0),a.restore()}a.globalAlpha=1},ve=e=>{let t=(y?y.size:120)*11;I.push({index:e,at:ae,velocity:t});for(let n=1;n<D.length;n++){let r=t*S**+n;if(r<30)break;for(let t of[e-n,e+n])t>=0&&t<D.length&&I.push({index:t,at:ae+n*.055,velocity:r})}i.current()},Q=t=>{f=0;let i=r.current;if(!i)return;if(_){_=!1,l=Math.max(1,e.clientWidth),u=Math.max(1,e.clientHeight),d=Math.min(window.devicePixelRatio||1,2);let t=Math.round(l*d),r=Math.round(u*d);n.width!==t&&(n.width=t),n.height!==r&&(n.height=r)}let o=Math.min(.05,Math.max(.001,(t-p)/1e3));p=t;let{ink:s,accent:g}=K(i),v=ce(i,s),y=2*Math.sqrt(ee)*(1-re(i.bounce)*.96);i.intro!==M&&(M=i.intro,j=0);let b=M!==`none`&&!c&&D.length>0;b&&P&&(j+=o);let x=b?re((j-ne)/Math.max(.3,i.introDuration)):1;N=b&&x<1;let te=!N&&i.sweep&&!c&&!R.inside&&k<0;te&&(ie+=o*i.speed),ae+=o;let S=R.x,T=R.y;te&&(S=v.left+(v.right-v.left)*(.5-.5*Math.cos(ie*.45)),T=v.top+(v.bottom-v.top)*(.45+.1*Math.sin(ie*.8)));let E=!N&&(R.inside||te||k>=0);if(E&&!oe&&(B.x=S,B.y=T),E){let e=R.inside?.05:.22;B.x=C(B.x,S,o,e),B.y=C(B.y,T,o,e)}oe=E,O=C(O,i.reveal===`area`&&E&&k<0?1:0,o,.16);for(let e=I.length-1;e>=0;e--){if(I[e].at>ae)continue;let t=D[I[e].index];t&&(t.velocity.y-=I[e].velocity),I.splice(e,1)}let L=!1;D.forEach((e,t)=>{if(t===k){e.offset.x=C(e.offset.x,R.x-z.x,o,.03),e.offset.y=C(e.offset.y,R.y-z.y,o,.03),e.velocity.x=0,e.velocity.y=0,L=!0;return}let{offset:n,velocity:r}=e;Math.abs(n.x)<.05&&Math.abs(n.y)<.05&&Math.hypot(r.x,r.y)<.5?(n.x=0,n.y=0,r.x=0,r.y=0):(r.x+=(-320*n.x-y*r.x)*o,r.y+=(-320*n.y-y*r.y)*o,n.x+=r.x*o,n.y+=r.y*o,L=!0)});let H=-1;if(N&&M===`type`){let e=.86/D.length,t=Math.min(D.length-1,Math.floor(x/e));H=x<.93?t:-1,D.forEach((n,r)=>{n.shown=r<t?1:r===t?w(0,e*.3,x-r*e):0})}else D.forEach(e=>{e.shown=1});let U=N?H:k>=0?k:E?le(B.x,B.y):-1;if(U>=0&&i.selection){let e=D[U],t=e.box.x1+e.offset.x-6,n=e.box.y1+e.offset.y-6,r=e.box.x2+e.offset.x+6,i=e.box.y2+e.offset.y+6;(V.index<0||V.alpha<.02)&&(V.x1=t,V.y1=n,V.x2=r,V.y2=i);let a=U===k?.02:.08;V.x1=C(V.x1,t,o,a),V.y1=C(V.y1,n,o,a),V.x2=C(V.x2,r,o,a),V.y2=C(V.y2,i,o,a),V.index=U}V.alpha=C(V.alpha,U>=0&&i.selection?1:0,o,.1),D.forEach((e,t)=>{let n=N?+(M===`type`&&(t===H||H>=0&&t>H)):+(i.reveal===`letter`&&t===U&&t!==k);N&&e.shown===0&&(e.outline=n),e.outline=C(e.outline,n,o,.09),Math.abs(e.outline-n)>.002?L=!0:e.outline=n}),F=C(F,i.guides&&!N&&(U>=0||O>.4)?1:0,o,.14);let W=!N&&U>=0&&R.inside,G=k>=0?`grabbing`:W&&i.draggable?`grab`:W&&i.clickKick?`pointer`:``;G!==A&&(A=G,e.style.cursor=G),a.setTransform(1,0,0,1,0,0),a.globalCompositeOperation=`source-over`,a.globalAlpha=1,a.clearRect(0,0,n.width,n.height);for(let e of D){let t=Math.hypot(e.offset.x,e.offset.y);t>1&&(a.globalAlpha=Math.min(1,t/24)*.55,J(a,e.dashes,0,0,0,0),a.globalAlpha=1)}N&&M===`metrics`?Z(i,v,g,1-w(.84,1,x),e=>w(.02+.04*e,.2+.04*e,x)):F>.005&&Z(i,v,g,F*.6,()=>1),D.forEach((e,t)=>{if(N&&M===`assemble`&&(me(e,v),x<e.assembled))ge(e,x,g);else{if(N&&M===`metrics`){let n=D.length>1?t/(D.length-1):0;if(x<.72+.28*n){_e(e,n,x,v);return}}e.shown<.001||(e.outline<.999&&(a.globalAlpha=(1-e.outline)*e.shown,J(a,e.fill,e.offset.x,e.offset.y,0,0)),e.outline>.001&&(a.globalAlpha=e.outline*e.shown,J(a,e.dashes,e.offset.x,e.offset.y,0,0)),a.globalAlpha=1)}}),O>.001&&de(i),pe(i,g);let q=L||N||I.length>0||F>.005&&F<.995||Math.abs(O-(i.reveal===`area`&&E&&k<0?1:0))>.002||V.alpha>.01&&V.alpha<.99;(E||q)&&m&&h&&(f=requestAnimationFrame(Q))},$=()=>{!f&&m&&h&&(p=performance.now(),f=requestAnimationFrame(Q))};i.current=$;let ye=()=>{_=!0,$()},be=t=>{let n=e.getBoundingClientRect();R.x=t.clientX-n.left,R.y=t.clientY-n.top},xe=e=>{be(e),R.inside=!0,$()},Se=()=>{k>=0||(R.inside=!1,$())},Ce=t=>{be(t),R.inside=!0;let n=r.current,i=t.pointerType!==`mouse`||t.button===0,a=N||!i?-1:le(R.x,R.y);L.x=R.x,L.y=R.y,L.time=performance.now(),L.index=a,n?.draggable&&a>=0&&(k=a,z.x=R.x-D[a].offset.x,z.y=R.y-D[a].offset.y,e.setPointerCapture?.(t.pointerId)),$()},we=t=>{if(k>=0){k=-1,e.releasePointerCapture?.(t.pointerId);let n=e.getBoundingClientRect();R.inside=t.clientX>=n.left&&t.clientX<=n.right&&t.clientY>=n.top&&t.clientY<=n.bottom}if(t.type===`pointerup`&&L.index>=0&&r.current?.clickKick&&!c&&performance.now()-L.time<450){let n=e.getBoundingClientRect();Math.hypot(t.clientX-n.left-L.x,t.clientY-n.top-L.y)<6&&ve(L.index)}L.index=-1,$()};e.addEventListener(`pointermove`,xe,{passive:!0}),e.addEventListener(`pointerenter`,xe,{passive:!0}),e.addEventListener(`pointerdown`,Ce,{passive:!0}),e.addEventListener(`pointerup`,we,{passive:!0}),e.addEventListener(`pointercancel`,we,{passive:!0}),e.addEventListener(`pointerleave`,Se,{passive:!0});let Te=new ResizeObserver(ye);Te.observe(e),window.addEventListener(`resize`,ye,{passive:!0});let Ee=new IntersectionObserver(([e])=>{m=e.isIntersecting,$()});Ee.observe(e);let De=new MutationObserver($);for(let e of[document.documentElement,document.body])e&&De.observe(e,{attributes:!0,attributeFilter:[`class`,`style`,`data-theme`]});let Oe=window.matchMedia?.(`(prefers-color-scheme: dark)`);return Oe?.addEventListener?.(`change`,$),document.fonts&&document.fonts.ready.then(U,U),ye(),{destroy:()=>{h=!1,cancelAnimationFrame(f),i.current=()=>{},Te.disconnect(),window.removeEventListener(`resize`,ye),Ee.disconnect(),De.disconnect(),Oe?.removeEventListener?.(`change`,$),e.style.cursor=``,e.removeEventListener(`pointermove`,xe),e.removeEventListener(`pointerenter`,xe),e.removeEventListener(`pointerdown`,Ce),e.removeEventListener(`pointerup`,we),e.removeEventListener(`pointercancel`,we),e.removeEventListener(`pointerleave`,Se)},update(e){Object.assign(r.current,e),i.current()}}}var O=`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-upload-cloud"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 13v8" />
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
  <path d="m8 17 4-4 4 4" />
</svg>
`,ie=`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-shield-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  <path d="m9 12 2 2 4-4" />
</svg>
`,ae=`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-camera"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
  <circle cx="12" cy="13" r="3" />
</svg>
`,oe={BASE_URL:`/`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1},k=!!(oe.VITE_SUPABASE_URL&&oe.VITE_SUPABASE_PUBLISHABLE_KEY),A=h(),j=[],M,N,P,F,I=new Map,L,R,z=!1,B,V=document.querySelector(`#app`);V.innerHTML=`
<header class="top">
  <div class="shell top-inner">
    <a class="brand" href="/" aria-label="docSpace Home">
      <span class="brand-icon">${c}</span>
      <span class="brand-name">docSpace</span>
    </a>
    <nav class="top-nav" aria-label="Main Navigation">
      <a class="nav-link" href="#tools-section">Tools</a>
      <a href="#privacy" class="nav-link" id="nav-privacy">Privacy</a>
      <a href="#about" class="nav-link" id="nav-about">About</a>
    </nav>
    <div class="top-actions">
      <select id="theme" aria-label="Color theme">
        <option value="system">System theme</option>
        <option value="light">Light theme</option>
        <option value="dark">Dark theme</option>
      </select>
      <button id="install" class="outline" type="button">Install app</button>
      ${k?`<button id="account" class="outline">Sign in</button>`:``}
    </div>
  </div>
</header>

<section class="shell hero" id="tools-section">
  <h1 class="sr-only">docSpace</h1>
  <div id="hero-tech-wordmark" class="hero-tech-container" aria-hidden="true"></div>
  <p>Scan, organize, and convert documents on your device.</p>
</section>

<main class="shell studio">
  <aside class="rail">
    <nav aria-label="PDF tools" class="tools">
      ${Object.entries(l).map(([e,t])=>`<button class="tool" data-mode="${e}" aria-pressed="${String(e===A)}">
          <span class="tool-icon">${t.icon}</span>
          <span><strong>${t.title}</strong><small>${t.summary}</small></span>
        </button>`).join(``)}
    </nav>
    <p class="rail-note">${ie} Files stay on your device</p>
  </aside>

  <section class="workbench" aria-labelledby="tool-title">
    <div class="tool-head">
      <h2 id="tool-title">${l[A].title}</h2>
      <p id="tool-hint">${l[A].hint}</p>
    </div>

    <div class="drop" id="drop" role="region" aria-label="File upload area">
      <span class="upload-icon">${O}</span>
      <strong id="drop-title">Drop PDF files here</strong>
      <span class="limit">Up to 100 MB and 500 pages per job</span>
      <div class="file-actions">
        <button class="primary" id="take-photo" type="button" hidden>${ae} Take photo</button>
        <button class="primary" id="browse" type="button">Choose PDFs</button>
      </div>
      <input type="file" id="camera-picker" accept="image/*" capture="environment" hidden>
      <input type="file" id="picker" accept=".pdf,application/pdf" hidden>
    </div>

    <ol id="queue" aria-label="Selected files" hidden></ol>
    <label id="scan-options" class="check" hidden><input id="grayscale" type="checkbox"> Grayscale</label>

    <div id="split-options" hidden>
      <label for="pages">Pages to keep</label>
      <input id="pages" type="text" placeholder="All pages" aria-describedby="range-help">
      <small id="range-help">Enter page numbers or ranges, like 1-3, 5.</small>
      <label class="check" id="zip-option">
        <input id="separate" type="checkbox"> Save each selected page separately in a ZIP
      </label>
    </div>

    <div id="image-options" hidden>
      <label for="image-format">Image format</label>
      <select id="image-format">
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPG</option>
      </select>
    </div>

    <div id="stamp-options" hidden>
      <label id="watermark-label" for="watermark-text">Watermark text</label>
      <input id="watermark-text" type="text" maxlength="80" placeholder="For example, DRAFT">
      <label id="number-label" for="number-start">Start numbering at</label>
      <input id="number-start" type="number" min="1" max="99999" value="1">
    </div>
    <p id="page-feedback" aria-live="polite"></p>
    <ol id="page-grid" aria-label="PDF pages" hidden></ol>

    <div class="result">
      <p id="status" role="status" aria-live="polite"></p>
      <button class="outline" id="reload-tool" hidden>Reload docSpace</button>
      <button class="primary" id="process" hidden></button>
      <button class="outline" id="cancel" hidden>Cancel</button>
      <div id="save-options" hidden>
        <label for="output-name">Save as</label>
        <div class="save-actions">
          <div class="name-field">
            <input id="output-name" type="text" maxlength="120" spellcheck="false" autocapitalize="none" autocomplete="off" aria-describedby="output-extension">
            <span id="output-extension"></span>
          </div>
          <a class="primary" id="download">Download</a>
          <button class="outline" id="share-file" type="button" hidden>Share or save</button>
        </div>
      </div>
      <div id="continue-options" hidden>
        <label for="next-tool">Continue with this PDF</label>
        <select id="next-tool">${Object.values(l).filter(e=>!e.kind&&e.id!==`merge`).map(e=>`<option value="${e.id}">${e.title}</option>`).join(``)}</select>
        <button id="continue-tool" class="outline">Open tool</button>
      </div>
    </div>
  </section>
</main>

<div class="shell" id="landing-content">
  ${d(l[A])}
</div>

<footer class="footer">
  <div class="shell">
    <div class="footer-grid">
      <div class="footer-col">
        <a class="brand" href="/" style="margin-bottom: 12px; display:inline-flex;">
          <span class="brand-icon">${c}</span>
          <span class="brand-name">docSpace</span>
        </a>
        <p>A personal project for everyday PDF and Word work.</p>
        <span class="private" style="display:inline-flex;">${ie} Files processed on your device</span>
      </div>
      <div class="footer-col">
        <h4>PDF Workflows</h4>
        <ul class="footer-links">
          <li><a href="/merge-pdf" class="footer-link" data-switch-tool="merge">Merge PDFs</a></li>
          <li><a href="/split-pdf" class="footer-link" data-switch-tool="split">Split PDF</a></li>
          <li><a href="/organize-pdf" class="footer-link" data-switch-tool="organize">Organize PDF</a></li>
          <li><a href="/compress-pdf" class="footer-link" data-switch-tool="compress">Compress Scan PDF</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Conversions</h4>
        <ul class="footer-links">
          <li><a href="/pdf-to-word" class="footer-link" data-switch-tool="word">PDF to Word DOCX</a></li>
          <li><a href="/word-to-pdf" class="footer-link" data-switch-tool="docx">Word DOCX to PDF</a></li>
          <li><a href="/images-to-pdf" class="footer-link" data-switch-tool="images">Images to PDF</a></li>
          <li><a href="/pdf-to-images" class="footer-link" data-switch-tool="export">PDF to Images (ZIP)</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company & Legal</h4>
        <ul class="footer-links">
          <li><a href="#privacy" class="footer-link" id="link-privacy">Privacy Policy</a></li>
          <li><a href="#terms" class="footer-link" id="link-terms">Terms of Service</a></li>
          <li><a href="#about" class="footer-link" id="link-about">About</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} docSpace. All rights reserved.</span>
      <span>Built for private document workflows</span>
    </div>
  </div>
</footer>

<dialog id="sign-in">
  <form id="sign-in-form">
    <h2>Sign in to docSpace</h2>
    <p>Sync your last-used tool across devices with passwordless magic link.</p>
    <label for="email">Email address</label>
    <input type="email" id="email" required autocomplete="email" placeholder="name@example.com">
    <p id="account-status" role="status"></p>
    <div class="dialog-actions">
      <button type="button" class="outline" id="close-dialog">Close</button>
      <button class="primary" id="send-link">Send sign-in link</button>
    </div>
  </form>
</dialog>

<dialog id="install-dialog" aria-labelledby="install-title">
  <h2 id="install-title">Install docSpace</h2>
  <p><strong>Android:</strong> In Chrome, open the menu and choose Install app or Add to Home screen.</p>
  <p><strong>iPhone and iPad:</strong> In Safari, tap Share, then Add to Home Screen. Turn on Open as Web App if shown.</p>
  <form method="dialog" class="dialog-actions"><button class="primary">Done</button></form>
</dialog>

<dialog id="legal-dialog">
  <div id="legal-body"></div>
  <div class="dialog-actions">
    <button type="button" class="primary" id="close-legal">Close</button>
  </div>
</dialog>
`;var H=e=>document.getElementById(e),U=H(`picker`),W=H(`status`),G=H(`download`),K=H(`output-name`),q=H(`queue`),se=H(`legal-dialog`),ce=H(`legal-body`),le=s({grid:H(`page-grid`),feedback:H(`page-feedback`),range:H(`pages`),onEdit(e){!M&&!e&&Y(),de()}});function ue(e){ce.innerHTML=e,se.showModal()}H(`close-legal`).onclick=()=>se.close(),H(`nav-privacy`)?.addEventListener(`click`,e=>{e.preventDefault(),ue(f)}),H(`nav-about`)?.addEventListener(`click`,e=>{e.preventDefault(),ue(m)}),H(`link-privacy`)?.addEventListener(`click`,e=>{e.preventDefault(),ue(f)}),H(`link-terms`)?.addEventListener(`click`,e=>{e.preventDefault(),ue(p)}),H(`link-about`)?.addEventListener(`click`,e=>{e.preventDefault(),ue(m)});function J(){let e=[`split`,`organize`,`export`].includes(A);le.load(e?j[0]:void 0,A===`organize`)}function de(){H(`process`).disabled=A===`merge`&&j.length<2||A===`organize`&&le.getEdits().length===0}function Y(){P&&URL.revokeObjectURL(P),P=void 0,F=void 0,H(`save-options`).hidden=!0,H(`continue-options`).hidden=!0,G.removeAttribute(`href`),H(`reload-tool`).hidden=!0,W.textContent=``,W.classList.remove(`error`)}function X(e,t=!1){W.textContent=e,W.classList.toggle(`error`,t)}function fe(e,t=!0){Object.hasOwn(l,e)&&e!==A&&!M&&(l[A].kind!==l[e].kind&&(j=[]),A=e,l[A].multiple||(j=j.slice(0,1)),H(`pages`).value=``,H(`separate`).checked=!1,J(),Y(),g(A,t),Z(),pe())}function pe(){let e=H(`landing-content`);e&&(e.innerHTML=d(l[A]),e.querySelectorAll(`[data-switch-tool]`).forEach(e=>{e.onclick=t=>{t.preventDefault(),z=!0,fe(e.dataset.switchTool),window.scrollTo({top:H(`tools-section`).offsetTop-80,behavior:`smooth`})}}))}document.querySelectorAll(`.footer [data-switch-tool]`).forEach(e=>{e.onclick=t=>{t.preventDefault(),z=!0,fe(e.dataset.switchTool),window.scrollTo({top:H(`tools-section`).offsetTop-80,behavior:`smooth`})}}),window.addEventListener(`popstate`,()=>{let e=h();e&&e!==A&&!M&&fe(e,!1)});function Z(e,t){let n=l[A];H(`tool-title`).textContent=n.title,H(`tool-hint`).textContent=n.hint,U.multiple=!!n.multiple,U.accept=n.accept??`.pdf,application/pdf`;let r=n.kind??(n.multiple?`PDFs`:`PDF`);H(`browse`).textContent=`Choose `+r,H(`drop-title`).textContent=A===`scan`?`Add a photo for each page`:`Drop `+r+` here`,H(`browse`).disabled=!!M,H(`browse`).className=A===`scan`?`outline`:`primary`,H(`take-photo`).hidden=A!==`scan`,H(`take-photo`).disabled=!!M,H(`scan-options`).hidden=A!==`scan`||!j.length,H(`grayscale`).disabled=!!M,H(`process`).textContent=n.actionText??(A===`word`?`Export editable text`:n.title),H(`process`).hidden=!j.length||!!M,de(),H(`cancel`).hidden=!M,H(`split-options`).hidden=![`split`,`export`,`watermark`,`numbers`].includes(A)||!j.length,H(`zip-option`).hidden=A!==`split`,H(`image-options`).hidden=A!==`export`||!j.length,H(`pages`).disabled=H(`separate`).disabled=H(`image-format`).disabled=!!M,H(`stamp-options`).hidden=![`watermark`,`numbers`].includes(A)||!j.length,H(`watermark-label`).hidden=H(`watermark-text`).hidden=A!==`watermark`,H(`number-label`).hidden=H(`number-start`).hidden=A!==`numbers`,H(`watermark-text`).disabled=H(`number-start`).disabled=!!M,le.setDisabled(!!M);for(let e of document.querySelectorAll(`[data-mode]`))e.setAttribute(`aria-pressed`,String(e.dataset.mode===A)),e.disabled=!!M;q.hidden=!j.length,q.replaceChildren();for(let[e,t]of I)A===`scan`&&j.includes(e)||(URL.revokeObjectURL(t),I.delete(e));if(j.forEach((e,t)=>{let r=document.createElement(`li`),i=document.createElement(`span`);if(i.className=`filename`,i.textContent=e.name,A===`scan`){I.has(e)||I.set(e,URL.createObjectURL(e));let t=document.createElement(`img`);t.className=`scan-thumbnail`,t.alt=``,t.loading=`lazy`,t.src=I.get(e),r.append(t)}r.append(i);let a=document.createElement(`div`);a.className=`actions`,n.multiple&&j.length>1&&!M&&(r.draggable=!0,r.ondragstart=n=>{B=t,n.dataTransfer.setData(`text/plain`,e.name)},r.ondragend=()=>{B=void 0},r.ondragover=e=>{B!==void 0&&e.preventDefault()},r.ondrop=e=>{if(B===void 0)return;e.preventDefault();let[n]=j.splice(B,1);j.splice(t,0,n),B=void 0,Y(),Z(t)});let o=n.multiple?[[`↑`,`Move up`,-1],[`↓`,`Move down`,1]]:[];o.push([`×`,`Remove`,0]);for(let[r,i,s]of o){let o=document.createElement(`button`);o.className=`icon-button`,o.textContent=r,o.dataset.action=i,o.setAttribute(`aria-label`,`${i} ${e.name}`),o.disabled=!!M||t+s<0||t+s>=j.length,o.onclick=()=>{s?[j[t],j[t+s]]=[j[t+s],j[t]]:(j.splice(t,1),n.multiple||J()),Y(),Z(Math.min(t+s,j.length-1),i)},a.append(o)}r.append(a),q.append(r)}),e!==void 0){let n=q.children[e];([...n?.querySelectorAll(`button:enabled`)??[]].find(e=>e.dataset.action===t)??n?.querySelector(`button:enabled`)??H(`browse`)).focus()}}function me(e){if(M||!e.length)return;Y();let t=l[A];if(!t.multiple&&e.length!==1){X(`Choose one `+(t.kind??`PDF`)+` for this tool.`,!0);return}let n=t.multiple?[...j,...e]:e;n.length>50||n.reduce((e,t)=>e+t.size,0)>104857600?X(`Choose up to 50 files totaling 100 MB or less.`,!0):(j=n,J(),Z())}function he(){M?.cancel(),M=void 0,clearTimeout(N),Z()}function ge(e){if(he(),e.error){X(e.error,!0),H(`reload-tool`).hidden=!e.reload,(e.reload?H(`reload-tool`):H(`process`)).focus();return}F=e,P=URL.createObjectURL(e.blob),G.href=P;let t=e.filename.lastIndexOf(`.`);K.value=e.filename.slice(0,t),H(`output-extension`).textContent=e.filename.slice(t),_e(),H(`save-options`).hidden=!1,H(`continue-options`).hidden=e.blob.type!==`application/pdf`,H(`share-file`).hidden=!navigator.canShare?.({files:[ve()]}),X(`Your download is ready.`),K.focus(),K.select(),R&&L&&xe(R.user.id,A).catch(()=>{})}function _e(){if(!F)return;let e=_(K.value,F.filename);G.download=e,G.textContent=`Download`,G.setAttribute(`aria-label`,`Download `+e)}function ve(){return new File([F.blob],G.download,{type:F.blob.type})}K.oninput=_e,K.onkeydown=e=>{e.key===`Enter`&&F&&(e.preventDefault(),G.click())},H(`share-file`).onclick=async()=>{if(F)try{await navigator.share({files:[ve()]})}catch(e){e.name!==`AbortError`&&X(`Could not share this file. Use Download to save it.`,!0)}},H(`watermark-text`).oninput=H(`number-start`).oninput=Y,H(`continue-tool`).onclick=()=>{if(F?.blob.type!==`application/pdf`||M)return;let e=ve();fe(H(`next-tool`).value),j=[],me([e]),H(`tool-title`).scrollIntoView({block:`center`})},H(`reload-tool`).onclick=()=>location.reload(),H(`browse`).onclick=()=>U.click(),H(`take-photo`).onclick=()=>H(`camera-picker`).click(),H(`camera-picker`).onchange=e=>{A===`scan`&&me([...e.target.files]),e.target.value=``},H(`grayscale`).onchange=Y,U.onchange=()=>{me([...U.files]),U.value=``};var Q=H(`drop`);Q.ondragover=e=>{e.preventDefault(),Q.classList.add(`dragging`)},Q.ondragleave=()=>Q.classList.remove(`dragging`),Q.ondrop=e=>{e.preventDefault(),Q.classList.remove(`dragging`),me([...e.dataTransfer.files])},window.addEventListener(`dragover`,e=>{e.dataTransfer.types.includes(`Files`)&&e.preventDefault()}),window.addEventListener(`drop`,e=>{e.dataTransfer.types.includes(`Files`)&&e.preventDefault()}),H(`cancel`).onclick=()=>{he(),X(`Processing canceled.`),H(`process`).focus()},H(`pages`).oninput=()=>{Y(),le.updateRange()},H(`image-format`).onchange=Y,H(`separate`).onchange=Y;function $(e){let t=new Worker(new URL(`/assets/processor-CtYBihsJ.js`,``+import.meta.url),{type:`module`}),n=M,r=n.cancel;n.cancel=()=>{r(),t.terminate()},t.onmessage=({data:e})=>{M===n&&ge(e)},t.onerror=()=>{M===n&&ge({error:`Processing failed. Try a smaller file.`})},t.postMessage(e)}async function ye(e,t,n){let{mode:r,files:i,selection:a,imageFormat:s}=t;if(r===`scan`){let{prepareScanPages:r}=await o(async()=>{let{prepareScanPages:e}=await import(`./scan-CvN_gkOO.js`);return{prepareScanPages:e}},[]),a=await r(i,t.grayscale,n);M===e&&$({...t,files:a});return}if(![`word`,`export`,`compress`,`docx`].includes(r)){$(t);return}let c=await i[0].arrayBuffer();if(n.throwIfAborted(),r===`docx`){let{readDocx:r}=await o(async()=>{let{readDocx:e}=await import(`./docx-text-DscCvB_s.js`);return{readDocx:e}},__vite__mapDeps([0,1])),i=await r(c,n);M===e&&$({...t,lines:i});return}let l;if(r===`word`){let{toWord:e}=await o(async()=>{let{toWord:e}=await import(`./word-DahZlceG.js`);return{toWord:e}},__vite__mapDeps([2,3]));l={blob:await e(c,n),filename:`converted.docx`}}else{let{pdfToImages:e,compressScan:t}=await o(async()=>{let{pdfToImages:e,compressScan:t}=await import(`./pdf-images-OGEeKewo.js`);return{pdfToImages:e,compressScan:t}},__vite__mapDeps([4,1,3]));l=r===`export`?{blob:await e(c,n,a,s),filename:`page-images.zip`}:{blob:await t(c,n,i[0].size),filename:`compressed-scan.pdf`}}M===e&&ge(l)}H(`process`).onclick=()=>{Y();let e=new AbortController,t={cancel:()=>e.abort()};M=t,ye(t,{files:j,mode:A,selection:H(`pages`).value.trim(),separate:H(`separate`).checked,pageEdits:le.getEdits(),imageFormat:H(`image-format`).value,grayscale:H(`grayscale`).checked,stampOptions:{text:H(`watermark-text`).value,start:H(`number-start`).value}},e.signal).catch(e=>{M===t&&(/failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|unable to preload css/i.test(e.message)?ge({error:`This tool could not load. Reload docSpace, then select your file again.`,reload:!0}):ge({error:([`InvalidPDFException`,`PasswordException`].includes(e.name)?`This PDF is damaged or encrypted. Try an unlocked copy.`:e.message)||`Processing failed.`}))}),N=setTimeout(()=>ge({error:`Processing timed out. Try a smaller set of pages or files.`}),12e4),Z(),X(`Processing your files…`),H(`cancel`).focus()};var be=Promise.resolve();document.querySelector(`.tools`).onclick=e=>{let t=e.target.closest(`[data-mode]`);if(t&&(z=!0,fe(t.dataset.mode),R)){let e={user_id:R.user.id,last_tool:A};be=be.then(async()=>{let{error:t}=await L.from(`tool_preferences`).upsert(e);t&&R?.user.id===e.user_id&&X(`Could not sync your tool preference.`,!0)}).catch(()=>X(`Could not sync your tool preference.`,!0))}};async function xe(e,t){if(L&&e)try{await L.rpc(`increment_tool_usage`,{tool_name:t})}catch{}}async function Se(){let{createClient:e}=await o(async()=>{let{createClient:e}=await import(`./dist-CVPAM7_G.js`);return{createClient:e}},[]);L=e(oe.VITE_SUPABASE_URL,oe.VITE_SUPABASE_PUBLISHABLE_KEY,{auth:{flowType:`pkce`}});let t=H(`account`),n=H(`sign-in`),r=H(`account-status`);H(`close-dialog`).onclick=()=>n.close(),t.onclick=async()=>{if(!R)n.showModal();else{t.disabled=!0;try{let{error:e}=await L.auth.signOut();e&&X(`Could not sign out. Try again.`,!0)}finally{t.disabled=!1}}},H(`sign-in-form`).onsubmit=async e=>{e.preventDefault(),H(`send-link`).disabled=!0,r.textContent=`Sending your link…`;try{let{error:e}=await L.auth.signInWithOtp({email:H(`email`).value.trim(),options:{emailRedirectTo:location.origin+`/`}});r.textContent=e?`Could not send the link. Check your address and try again.`:`Open the sign-in link in this browser.`}catch{r.textContent=`Could not send the link. Check your connection and try again.`}finally{H(`send-link`).disabled=!1}},L.auth.onAuthStateChange((e,n)=>{let r=R?.user.id!==n?.user.id;if(R=n,t.textContent=n?`Sign out`:`Sign in`,!n||!r)return;let i=n.user.id;setTimeout(async()=>{let{data:e}=await L.from(`tool_preferences`).select(`last_tool`).eq(`user_id`,i).maybeSingle();R?.user.id===i&&!z&&!j.length&&e&&fe(e.last_tool,!1)})})}Z(),pe(),g(A);var Ce=document.getElementById(`hero-tech-wordmark`);if(Ce){let e=D(Ce,{text:`docSpace`,fontWeight:850,fontSize:window.innerWidth<640?56:82,letterSpacing:-.04,color:`#181528`,accentColor:`#7c3aed`,align:`left`,reach:160,dashLength:4,dashGap:2,strokeWidth:1.5,draggable:!0,clickKick:!0,sweep:!0,labels:!0,specks:12});v(H(`theme`),t=>e.update({color:t?`#f4efff`:`#181528`,accentColor:t?`#c4a7ff`:`#7c3aed`}))}H(`install-dialog`).addEventListener(`close`,()=>H(`install`).focus()),y(H(`install`),H(`install-dialog`)),k&&Se().catch(()=>{H(`account`).disabled=!0,H(`account`).textContent=`Sign-in unavailable`});export{e as n,o as t};