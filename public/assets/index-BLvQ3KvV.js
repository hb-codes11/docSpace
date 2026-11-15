const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/docx-text-DscCvB_s.js","assets/jszip.min-DmP1z0LA.js","assets/word-DahZlceG.js","assets/view-pdf-Bdfownce.js","assets/pdf-images-9PUxIpaZ.js"])))=>i.map(i=>d[i]);
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
`,l={merge:{id:`merge`,slug:`merge-pdf`,title:`Merge PDFs`,actionText:`Merge PDFs`,summary:`Combine documents in any order`,hint:`Add at least two PDFs, then arrange them in the order you want.`,icon:c,multiple:!0,seoTitle:`Merge PDFs | docSpace`,seoDescription:`Combine PDFs in the order you choose.`,steps:[{title:`Upload PDFs`,desc:`Select or drag & drop two or more PDF documents into the queue.`},{title:`Arrange Order`,desc:`Drag files or click arrow buttons to arrange pages in your exact preferred sequence.`},{title:`Download Merged PDF`,desc:`Click Merge PDFs to combine documents locally and download immediately.`}],features:[`Preserves original vector clarity, embedded typography, and crisp resolution.`,`Supports merging up to 50 individual PDF files totaling up to 100 MB.`,`Complete privacy: files are merged in your local browser memory using browser processing.`],faqs:[{q:`Are my uploaded PDFs stored on your servers?`,a:`No. docSpace processes every document directly inside your web browser using browser processing. Your files never leave your device.`},{q:`Is there a limit on how many PDFs I can merge?`,a:`You can merge up to 50 documents totaling up to 100 MB and 500 total pages per batch.`},{q:`Can I reorder the files before merging?`,a:`Yes. Simply drag files up or down in the list, or use the handy arrow controls to set the precise ordering.`}]},split:{id:`split`,slug:`split-pdf`,title:`Split PDF`,actionText:`Split PDF`,summary:`Extract pages or split into files`,hint:`Select the pages you want to keep or save each page as a separate PDF.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
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
`;function h(){let e=location.hash.replace(/^#\/?/,``),t=location.pathname.replace(/^\/|\/$/g,``);return u(e)?.id??u(t)?.id??`merge`}function g(e,t=!1){let n=l[e];if(document.title=n.seoTitle||n.title+` — docSpace`,document.querySelector(`meta[name="description"]`).content=n.seoDescription||n.hint,t){let t=new URL(`/`,location.origin);t.hash=e===`merge`?``:`/`+n.slug,t.href!==location.href&&history.pushState(null,``,t)}}var _=`10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`,v=8,y=320,b=/^(currentcolor|inherit)$/i,x=.15,S=.62,C=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-n/r)),w=e=>Math.min(1,Math.max(0,Number(e)||0)),T=(e,t,n)=>{let r=w((n-e)/(t-e));return r*r*(3-2*r)},E=(...e)=>{let t=2166136261;for(let n of e)t=Math.imul(t^(n|0),16777619),t^=t>>>13,t=Math.imul(t,1540483477),t^=t>>>15;return(t>>>0)/4294967296},ee=e=>e>0?`+${e}`:e<0?`−${-e}`:`0`;function D(e,t={}){if(!e)return;e.classList.add(`tech-text`),t.className&&e.classList.add(...t.className.split(` `).filter(Boolean)),e.setAttribute(`role`,`img`),e.setAttribute(`aria-label`,t.text||`docSpace`);let n=e.querySelector(`.tech-text-canvas`);n||(n=document.createElement(`canvas`),n.className=`tech-text-canvas`,e.appendChild(n));let r={current:{text:`docSpace`,fontFamily:``,fontWeight:800,fontSize:90,letterSpacing:-.05,color:`currentColor`,accentColor:`#7c3aed`,align:`left`,reach:160,softness:.7,dashLength:4,dashGap:2,strokeWidth:1.5,lineStyle:`dashed`,reveal:`letter`,specks:12,selection:!0,labels:!0,draggable:!0,bounce:.4,sweep:!0,speed:1,clickKick:!0,intro:`none`,introDuration:2,guides:!1,...t}},i={current:()=>{}},a=n?.getContext(`2d`),o=document.createElement(`canvas`),s=o.getContext(`2d`);if(!e||!n||!a||!s)return;let c=window.matchMedia?.(`(prefers-reduced-motion: reduce)`)?.matches,l=1,u=1,d=1,f=0,p=performance.now(),m=!1,h=!0,g=``,D=!0,te=``,O=null,k=[],A=0,ne=0,j=0,M=!1,N=-1,P=``,re=0,F=``,I=!1,L=!document.fonts,R=0,z=[],B={x:0,y:0,time:0,index:-1},V={x:0,y:0,inside:!1},H={x:0,y:0},U={x:0,y:0},W={x1:0,y1:0,x2:0,y2:0,alpha:0,index:-1},G=()=>{g=``,i.current()},K=()=>{L=!0,G()},ie=t=>t.fontFamily||getComputedStyle(e).fontFamily||`sans-serif`,ae=(e,t)=>`${e.fontWeight} ${t}px ${ie(e)}`,oe=t=>{let n=getComputedStyle(e).color||`#000000`,r=e=>!e||b.test(String(e).trim())?n:e;return{ink:r(t.color),accent:r(t.accentColor)}},q=(e,t,n)=>{e.font=ae(t,n),`letterSpacing`in e&&(e.letterSpacing=`${t.letterSpacing*n}px`),e.textAlign=`left`,e.textBaseline=`alphabetic`},se=(e,t,n,r,i)=>{let a=Math.ceil(e.strokeWidth*2+4),o=n.box.x1-a,s=n.box.y1-a,c=n.box.x2-n.box.x1+a*2,l=n.box.y2-n.box.y1+a*2,u=document.createElement(`canvas`);u.width=Math.max(1,Math.ceil(c*d)),u.height=Math.max(1,Math.ceil(l*d));let f=u.getContext(`2d`);return f&&(f.setTransform(d,0,0,d,-o*d,-s*d),q(f,e,t.size),r?(f.lineJoin=`round`,f.lineWidth=e.strokeWidth*2,f.lineCap=`butt`,f.strokeStyle=i,e.lineStyle!==`solid`&&f.setLineDash([Math.max(1,e.dashLength),Math.max(1,e.dashGap)]),f.strokeText(n.char,n.x,t.baseline),f.setLineDash([]),f.globalCompositeOperation=`destination-out`,f.fillStyle=`#000000`,f.fillText(n.char,n.x,t.baseline),f.globalCompositeOperation=`source-over`):(f.fillStyle=i,f.fillText(n.char,n.x,t.baseline))),{image:u,left:o,top:s}},ce=(e,t)=>{let n=[e.text,ie(e),e.fontWeight,e.fontSize,e.letterSpacing,e.align,t,e.dashLength,e.dashGap,e.strokeWidth,e.lineStyle,l,u,d].join(`|`);if(n===g&&O)return O;g=n;let r=ae(e,64);document.fonts&&r!==te&&(te=r,document.fonts.load(r,e.text).then(G,G));let i=s;q(i,e,e.fontSize);let a=i.measureText(e.text),o=Math.min(1,l*.9/Math.max(a.actualBoundingBoxLeft+a.actualBoundingBoxRight,1),u*.66/Math.max(a.actualBoundingBoxAscent+a.actualBoundingBoxDescent,1)),c=e.fontSize*o;q(i,e,c),a=i.measureText(e.text);let f=a.actualBoundingBoxLeft+a.actualBoundingBoxRight,p=a.actualBoundingBoxAscent+a.actualBoundingBoxDescent,m=l*.05,h=(e.align===`left`?m:e.align===`right`?l-m-f:(l-f)/2)+a.actualBoundingBoxLeft,_=(u-p)/2+a.actualBoundingBoxAscent,v=_-i.measureText(`x`).actualBoundingBoxAscent,y=_-i.measureText(`H`).actualBoundingBoxAscent,b=_-i.measureText(`d`).actualBoundingBoxAscent,x=_+i.measureText(`p`).actualBoundingBoxDescent,S=_-a.actualBoundingBoxAscent,C=_+a.actualBoundingBoxDescent,w=Math.min(S,y)-2,T=Math.max(C,_)+2,E={size:c,baseline:_,left:h-a.actualBoundingBoxLeft,right:h+a.actualBoundingBoxRight,top:S,bottom:C,lines:[{y:_,label:`baseline`},{y:v,label:`x-height`},{y,label:`cap height`},...y-b>Math.max(11,c*.06)?[{y:b,label:`ascender`}]:[],{y:x,label:`descender`}],bands:[{y0:v,y1:_,up:!0,order:0},{y0:y,y1:v,up:!0,order:1},{y0:w,y1:y,up:!0,order:2},{y0:_,y1:T,up:!1,order:1}].filter(e=>e.y1-e.y0>.5)};O=E;let ee=Array.from(e.text),D=k;k=[];let A=``;return ee.forEach((n,r)=>{A+=n;let a=i.measureText(n),o=h+i.measureText(A).width-a.width;if(!n.trim())return;let s={char:n,x:o,box:{x1:o-a.actualBoundingBoxLeft,y1:_-a.actualBoundingBoxAscent,x2:o+a.actualBoundingBoxRight,y2:_+a.actualBoundingBoxDescent}},c=D[k.length],l=c?.char===n&&c.index===r;k.push({...s,offset:l?c.offset:{x:0,y:0},velocity:l?c.velocity:{x:0,y:0},outline:l?c.outline:0,shown:l?c.shown:1,cells:null,assembled:0,index:r,fill:se(e,E,s,!1,t),dashes:se(e,E,s,!0,t)})}),N>=0&&k[N]?.index!==D[N]?.index&&(N=-1),W.index>=0&&k[W.index]?.char!==D[W.index]?.char&&(W.index=-1),E},J=(e,t)=>{if(!O||t<O.top-24||t>O.bottom+24)return-1;let n=-1,r=1/0;return k.forEach((t,i)=>{let a=t.box.x1+t.offset.x,o=t.box.x2+t.offset.x,s=e<a?a-e:e>o?e-o:0;s<r&&(r=s,n=i)}),r<28?n:-1},Y=(e,t,n,r,i,a)=>{let o=Math.min(1,Math.max(0,1-a)),s=e.createRadialGradient(t,n,0,t,n,r);if(s.addColorStop(0,`rgba(0, 0, 0, ${i})`),o>.995)return s.addColorStop(.995,`rgba(0, 0, 0, ${i})`),s.addColorStop(1,`rgba(0, 0, 0, 0)`),s;for(let e=0;e<=v;e++){let t=e/v,n=t*t*(3-2*t);s.addColorStop(o+(1-o)*t,`rgba(0, 0, 0, ${i*(1-n)})`)}return s},X=(e,t,n,r,i,a)=>{e.drawImage(t.image,Math.round((t.left+n)*d-i),Math.round((t.top+r)*d-a))},le=e=>{let t=e.reach*d,r=U.x*d,i=U.y*d;a.globalCompositeOperation=`destination-out`,a.fillStyle=Y(a,r,i,t,A,e.softness),a.fillRect(r-t,i-t,t*2,t*2),a.globalCompositeOperation=`source-over`;let c=Math.max(0,Math.floor(r-t)),l=Math.max(0,Math.floor(i-t)),u=Math.min(n.width,Math.ceil(r+t)),f=Math.min(n.height,Math.ceil(i+t));if(u<=c||f<=l)return;let p=u-c,m=f-l;(o.width<p||o.height<m)&&(o.width=Math.max(o.width,p),o.height=Math.max(o.height,m)),s.setTransform(1,0,0,1,0,0),s.globalCompositeOperation=`source-over`,s.clearRect(0,0,p,m);for(let e of k)X(s,e.dashes,e.offset.x,e.offset.y,c,l);s.globalCompositeOperation=`destination-in`,s.fillStyle=Y(s,r-c,i-l,t,1,e.softness),s.fillRect(0,0,p,m),s.globalCompositeOperation=`source-over`,a.globalAlpha=A,a.drawImage(o,0,0,p,m,c,l,p,m),a.globalAlpha=1},Z=e=>(Math.round(e*d)+.5)/d,ue=(e,t,n)=>{let r=(e%(2*(t+n))+2*(t+n))%(2*(t+n));return r<t?[W.x1+r,W.y1,0,-1]:(r-=t,r<n?[W.x2,W.y1+r,1,0]:(r-=n,r<t?[W.x2-r,W.y2,0,1]:(r-=t,[W.x1,W.y2-r,-1,0])))},de=(e,t,n)=>{let r=W.x2-W.x1,i=W.y2-W.y1;if(r<2||i<2)return;let o=2*(r+i),s=W.index+1;a.fillStyle=n,a.strokeStyle=n;for(let n=0;n<e.specks;n++){let e=.5+E(s,n,11)*1.2,c=j/e+E(s,n,17),l=Math.floor(c),u=c-l;if(u>.7)continue;let[d,f,p,m]=ue(E(s,n,l)*o,r,i),h=E(s,n,l,2),g=h<.46?2:h<.7?3:h<.84?5:h<.94?8:11,_=g>=8,v=(_?9:4)+Math.floor(E(s,n,l,1)*5)*3,y=W.x1+Math.round((d+p*v-W.x1)/3)*3,b=W.y1+Math.round((f+m*v-W.y1)/3)*3,x=E(s,n,l,3),S=u<.06||u>.32&&u<.36?.35:1,C=t*(_?.3+.4*x:.3+.6*x)*S,w=Math.round(y-g/2),T=Math.round(b-g/2);a.globalAlpha=C,x<.26||_&&x<.78?(a.strokeRect(w+.5,T+.5,g,g),_&&x>.5&&a.fillRect(Math.round(y)-1,Math.round(b)-1,2,2)):a.fillRect(w,T,g,g)}for(let n=0;n<2;n++){let s=(j*.42*e.speed+n*.5)*o;for(let e=0;e<4;e++){let[n,o]=ue(s-e*6,r,i),c=e===0?3:2;a.globalAlpha=t*[.95,.55,.32,.16][e],a.fillRect(Math.round(n-c/2),Math.round(o-c/2),c,c)}}a.globalAlpha=1},fe=(e,t)=>{let n=k[W.index];if(!n||W.alpha<.01)return;let r=W.alpha,i=Z(W.x1),o=Z(W.y1),s=Z(W.x2),c=Z(W.y2);a.setTransform(d,0,0,d,0,0),a.fillStyle=t,a.strokeStyle=t,a.lineWidth=1;let l=Math.hypot(n.offset.x,n.offset.y);if(l>1){let e=(n.box.x1+n.box.x2)/2,t=(n.box.y1+n.box.y2)/2;a.beginPath(),a.moveTo(e,t),a.lineTo(e+n.offset.x,t+n.offset.y),a.setLineDash([3,4]),a.globalAlpha=.45*r,a.stroke(),a.setLineDash([]),a.beginPath(),a.rect(Math.round(e)-2,Math.round(t)-2,4,4),a.globalAlpha=.7*r,a.fill()}a.beginPath(),a.rect(i,o,s-i,c-o),a.globalAlpha=.5*r,a.stroke(),a.beginPath();for(let[e,t]of[[i,o],[s,o],[s,c],[i,c]])a.rect(Math.round(e)-2,Math.round(t)-2,5,5);if(a.globalAlpha=.95*r,a.fill(),a.globalAlpha=1,e.specks>0&&de(e,r,t),!e.labels)return;a.font=_,a.textAlign=`left`,a.textBaseline=`bottom`,a.fillStyle=t,a.globalAlpha=.62*r;let u=l>1?`${ee(Math.round(n.offset.x))}, ${ee(Math.round(-n.offset.y))}`:`${n.char}  ${Math.round(n.box.x2-n.box.x1)} × ${Math.round(n.box.y2-n.box.y1)}`;a.fillText(u,Math.round(W.x1),Math.round(W.y1)-7),a.globalAlpha=1},Q=(e,t,n,r,i)=>{let o=Math.max(12,t.size*.12),s=Math.round(t.left-o),c=Math.round(t.right+o),u=l-c>s;a.setTransform(d,0,0,d,0,0),a.strokeStyle=n,a.fillStyle=n,a.lineWidth=1,a.font=_,a.textBaseline=`middle`,a.textAlign=u?`left`:`right`,t.lines.forEach((t,n)=>{let o=i(n);if(o<=.001)return;let l=Z(t.y),d=s+(c-s)*o;a.globalAlpha=r*.4,a.beginPath(),a.moveTo(s,l),a.lineTo(d,l),a.stroke(),a.globalAlpha=r*.9,a.fillRect(s-1,Math.round(t.y)-1,3,3),a.fillRect(Math.round(d)-1,Math.round(t.y)-1,3,3),e.labels&&(a.globalAlpha=r*.62*T(.7,1,o),a.fillText(t.label,u?c+8:s-8,Math.round(t.y)))}),a.textAlign=`left`,a.setTransform(1,0,0,1,0,0),a.globalAlpha=1},pe=(e,t)=>{if(e.cells)return e.cells;let n=e.fill,r=Math.max(3,Math.round(t.size/26)),i=n.image.width,a=n.image.height,o=n.image.getContext(`2d`),s=[];if(e.cells=s,e.assembled=0,!o||i<2||a<2)return s;let c=o.getImageData(0,0,i,a).data,l=Math.floor(n.left/r)*r,u=Math.floor(n.top/r)*r,f=Math.ceil((n.left+i/d-l)/r)+1,p=Math.ceil((n.top+a/d-u)/r)+1,m=new Uint8Array(f*p);for(let e=0;e<a;e++)for(let t=0;t<i;t++){if(c[(e*i+t)*4+3]<24)continue;let a=Math.floor((n.left+t/d-l)/r),o=Math.floor((n.top+e/d-u)/r);m[o*f+a]=1}let h=w(((e.box.x1+e.box.x2)/2-t.left)/Math.max(1,t.right-t.left));for(let n=0;n<m.length;n++){if(!m[n])continue;let i=E(e.index,n,1)*Math.PI*2,a=t.size*(.25+.6*E(e.index,n,2)),o=.03+.36*h+.12*E(e.index,n,3),c=o+.3+.14*E(e.index,n,4);s.push({x:l+n%f*r,y:u+Math.floor(n/f)*r,size:r,dx:Math.cos(i)*a,dy:Math.sin(i)*a*.7,start:o,land:c}),e.assembled=Math.max(e.assembled,c)}return s},me=(e,t,n)=>{let r=Math.round(e*d),i=Math.round(t*d);return[r,i,Math.round((e+n)*d)-r,Math.round((t+n)*d)-i]},he=(e,t,n)=>{let r=e.cells||[];a.save(),a.beginPath();let i=0;for(let e of r){if(t<e.land)continue;let[n,r,o,s]=me(e.x,e.y,e.size);a.rect(n,r,o,s),i++}i&&(a.clip(),X(a,e.fill,0,0,0,0)),a.restore(),a.fillStyle=n;for(let e of r){if(t<e.start||t>=e.land)continue;let n=(t-e.start)/(e.land-e.start),r=1-(1-n)**4,i=e.size*(.4+.6*r),o=e.x+(e.size-i)/2+e.dx*(1-r),s=e.y+(e.size-i)/2+e.dy*(1-r),[c,l,u,d]=me(o,s,i);a.globalAlpha=Math.min(1,n*4)*(.55+.45*r),a.fillRect(c,l,Math.max(1,u),Math.max(1,d))}a.globalAlpha=1},ge=(e,t,n,r)=>{let i=e.fill,o=Math.floor(i.left*d),s=Math.floor(i.top*d),c=i.image.width+2,l=i.image.height+2,u=w((n-.24-.28*t)/.48),f=[];for(let e of r.bands){let t=T(.3*e.order,.3*e.order+.4,u);if(t<=0)continue;let n=(e.y1-e.y0)*t,r=Math.round((e.up?e.y1-n:e.y0)*d),i=Math.round((e.up?e.y1:e.y0+n)*d);i>r&&f.push([r,i-r])}let p=T(.08+.2*t,.22+.2*t,n);if(p>.001){a.save(),a.beginPath(),a.rect(o-2,s-2,c+2,l+2);for(let[e,t]of f)a.rect(o-2,e,c+2,t);a.clip(`evenodd`),a.globalAlpha=p,X(a,e.dashes,0,0,0,0),a.restore()}if(f.length){a.save(),a.beginPath();for(let[e,t]of f)a.rect(o-2,e,c+2,t);a.clip(),X(a,e.fill,0,0,0,0),a.restore()}a.globalAlpha=1},_e=e=>{let t=(O?O.size:120)*11;z.push({index:e,at:j,velocity:t});for(let n=1;n<k.length;n++){let r=t*S**+n;if(r<30)break;for(let t of[e-n,e+n])t>=0&&t<k.length&&z.push({index:t,at:j+n*.055,velocity:r})}i.current()},ve=t=>{f=0;let i=r.current;if(!i)return;if(D){D=!1,l=Math.max(1,e.clientWidth),u=Math.max(1,e.clientHeight),d=Math.min(window.devicePixelRatio||1,2);let t=Math.round(l*d),r=Math.round(u*d);n.width!==t&&(n.width=t),n.height!==r&&(n.height=r)}let o=Math.min(.05,Math.max(.001,(t-p)/1e3));p=t;let{ink:s,accent:g}=oe(i),_=ce(i,s),v=2*Math.sqrt(y)*(1-w(i.bounce)*.96);i.intro!==F&&(F=i.intro,re=0);let b=F!==`none`&&!c&&k.length>0;b&&L&&(re+=o);let S=b?w((re-x)/Math.max(.3,i.introDuration)):1;I=b&&S<1;let E=!I&&i.sweep&&!c&&!V.inside&&N<0;E&&(ne+=o*i.speed),j+=o;let ee=V.x,te=V.y;E&&(ee=_.left+(_.right-_.left)*(.5-.5*Math.cos(ne*.45)),te=_.top+(_.bottom-_.top)*(.45+.1*Math.sin(ne*.8)));let O=!I&&(V.inside||E||N>=0);if(O&&!M&&(U.x=ee,U.y=te),O){let e=V.inside?.05:.22;U.x=C(U.x,ee,o,e),U.y=C(U.y,te,o,e)}M=O,A=C(A,i.reveal===`area`&&O&&N<0?1:0,o,.16);for(let e=z.length-1;e>=0;e--){if(z[e].at>j)continue;let t=k[z[e].index];t&&(t.velocity.y-=z[e].velocity),z.splice(e,1)}let B=!1;k.forEach((e,t)=>{if(t===N){e.offset.x=C(e.offset.x,V.x-H.x,o,.03),e.offset.y=C(e.offset.y,V.y-H.y,o,.03),e.velocity.x=0,e.velocity.y=0,B=!0;return}let{offset:n,velocity:r}=e;Math.abs(n.x)<.05&&Math.abs(n.y)<.05&&Math.hypot(r.x,r.y)<.5?(n.x=0,n.y=0,r.x=0,r.y=0):(r.x+=(-320*n.x-v*r.x)*o,r.y+=(-320*n.y-v*r.y)*o,n.x+=r.x*o,n.y+=r.y*o,B=!0)});let G=-1;if(I&&F===`type`){let e=.86/k.length,t=Math.min(k.length-1,Math.floor(S/e));G=S<.93?t:-1,k.forEach((n,r)=>{n.shown=r<t?1:r===t?T(0,e*.3,S-r*e):0})}else k.forEach(e=>{e.shown=1});let K=I?G:N>=0?N:O?J(U.x,U.y):-1;if(K>=0&&i.selection){let e=k[K],t=e.box.x1+e.offset.x-6,n=e.box.y1+e.offset.y-6,r=e.box.x2+e.offset.x+6,i=e.box.y2+e.offset.y+6;(W.index<0||W.alpha<.02)&&(W.x1=t,W.y1=n,W.x2=r,W.y2=i);let a=K===N?.02:.08;W.x1=C(W.x1,t,o,a),W.y1=C(W.y1,n,o,a),W.x2=C(W.x2,r,o,a),W.y2=C(W.y2,i,o,a),W.index=K}W.alpha=C(W.alpha,K>=0&&i.selection?1:0,o,.1),k.forEach((e,t)=>{let n=I?+(F===`type`&&(t===G||G>=0&&t>G)):+(i.reveal===`letter`&&t===K&&t!==N);I&&e.shown===0&&(e.outline=n),e.outline=C(e.outline,n,o,.09),Math.abs(e.outline-n)>.002?B=!0:e.outline=n}),R=C(R,i.guides&&!I&&(K>=0||A>.4)?1:0,o,.14);let ie=!I&&K>=0&&V.inside,ae=N>=0?`grabbing`:ie&&i.draggable?`grab`:ie&&i.clickKick?`pointer`:``;ae!==P&&(P=ae,e.style.cursor=ae),a.setTransform(1,0,0,1,0,0),a.globalCompositeOperation=`source-over`,a.globalAlpha=1,a.clearRect(0,0,n.width,n.height);for(let e of k){let t=Math.hypot(e.offset.x,e.offset.y);t>1&&(a.globalAlpha=Math.min(1,t/24)*.55,X(a,e.dashes,0,0,0,0),a.globalAlpha=1)}I&&F===`metrics`?Q(i,_,g,1-T(.84,1,S),e=>T(.02+.04*e,.2+.04*e,S)):R>.005&&Q(i,_,g,R*.6,()=>1),k.forEach((e,t)=>{if(I&&F===`assemble`&&(pe(e,_),S<e.assembled))he(e,S,g);else{if(I&&F===`metrics`){let n=k.length>1?t/(k.length-1):0;if(S<.72+.28*n){ge(e,n,S,_);return}}e.shown<.001||(e.outline<.999&&(a.globalAlpha=(1-e.outline)*e.shown,X(a,e.fill,e.offset.x,e.offset.y,0,0)),e.outline>.001&&(a.globalAlpha=e.outline*e.shown,X(a,e.dashes,e.offset.x,e.offset.y,0,0)),a.globalAlpha=1)}}),A>.001&&le(i),fe(i,g);let q=B||I||z.length>0||R>.005&&R<.995||Math.abs(A-(i.reveal===`area`&&O&&N<0?1:0))>.002||W.alpha>.01&&W.alpha<.99;(O||q)&&m&&h&&(f=requestAnimationFrame(ve))},$=()=>{!f&&m&&h&&(p=performance.now(),f=requestAnimationFrame(ve))};i.current=$;let ye=()=>{D=!0,$()},be=t=>{let n=e.getBoundingClientRect();V.x=t.clientX-n.left,V.y=t.clientY-n.top},xe=e=>{be(e),V.inside=!0,$()},Se=()=>{N>=0||(V.inside=!1,$())},Ce=t=>{be(t),V.inside=!0;let n=r.current,i=t.pointerType!==`mouse`||t.button===0,a=I||!i?-1:J(V.x,V.y);B.x=V.x,B.y=V.y,B.time=performance.now(),B.index=a,n?.draggable&&a>=0&&(N=a,H.x=V.x-k[a].offset.x,H.y=V.y-k[a].offset.y,e.setPointerCapture?.(t.pointerId)),$()},we=t=>{if(N>=0){N=-1,e.releasePointerCapture?.(t.pointerId);let n=e.getBoundingClientRect();V.inside=t.clientX>=n.left&&t.clientX<=n.right&&t.clientY>=n.top&&t.clientY<=n.bottom}if(t.type===`pointerup`&&B.index>=0&&r.current?.clickKick&&!c&&performance.now()-B.time<450){let n=e.getBoundingClientRect();Math.hypot(t.clientX-n.left-B.x,t.clientY-n.top-B.y)<6&&_e(B.index)}B.index=-1,$()};e.addEventListener(`pointermove`,xe,{passive:!0}),e.addEventListener(`pointerenter`,xe,{passive:!0}),e.addEventListener(`pointerdown`,Ce,{passive:!0}),e.addEventListener(`pointerup`,we,{passive:!0}),e.addEventListener(`pointercancel`,we,{passive:!0}),e.addEventListener(`pointerleave`,Se,{passive:!0});let Te=new ResizeObserver(ye);Te.observe(e),window.addEventListener(`resize`,ye,{passive:!0});let Ee=new IntersectionObserver(([e])=>{m=e.isIntersecting,$()});Ee.observe(e);let De=new MutationObserver($);for(let e of[document.documentElement,document.body])e&&De.observe(e,{attributes:!0,attributeFilter:[`class`,`style`,`data-theme`]});let Oe=window.matchMedia?.(`(prefers-color-scheme: dark)`);return Oe?.addEventListener?.(`change`,$),document.fonts&&document.fonts.ready.then(K,K),ye(),{destroy:()=>{h=!1,cancelAnimationFrame(f),i.current=()=>{},Te.disconnect(),window.removeEventListener(`resize`,ye),Ee.disconnect(),De.disconnect(),Oe?.removeEventListener?.(`change`,$),e.style.cursor=``,e.removeEventListener(`pointermove`,xe),e.removeEventListener(`pointerenter`,xe),e.removeEventListener(`pointerdown`,Ce),e.removeEventListener(`pointerup`,we),e.removeEventListener(`pointercancel`,we),e.removeEventListener(`pointerleave`,Se)},update(e){Object.assign(r.current,e),i.current()}}}var te=`<!-- @license lucide-static v1.72.0 - ISC -->
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
`,O=`<!-- @license lucide-static v1.72.0 - ISC -->
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
`,k=`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-zap"
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
  <path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" />
</svg>
`,A=`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-lock"
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
  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
</svg>
`,ne={BASE_URL:`/`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1},j=!!(ne.VITE_SUPABASE_URL&&ne.VITE_SUPABASE_PUBLISHABLE_KEY),M=h(),N=[],P,re,F,I,L,R,z=!1,B,V=document.querySelector(`#app`);V.innerHTML=`
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
      <span class="private">${O} On-device processing</span>
      ${j?`<button id="account" class="outline">Sign in</button>`:``}
    </div>
  </div>
</header>

<section class="shell hero" id="tools-section">
  <div class="hero-eyebrow">${k} ${Object.keys(l).length} free tools — no uploads, no account</div>
  <div id="hero-tech-wordmark" class="hero-tech-container"></div>
  <p>Merge, organize, stamp, and convert documents directly in your browser. Files never leave your device.</p>
  <div class="hero-badges">
    <span class="hero-badge">${O} 100% on-device</span>
    <span class="hero-badge">${A} No file uploads</span>
    <span class="hero-badge">${k} Instant processing</span>
  </div>
</section>

<main class="shell studio">
  <aside class="rail">
    <nav aria-label="PDF tools" class="tools">
      ${Object.entries(l).map(([e,t])=>`<button class="tool" data-mode="${e}" aria-pressed="${String(e===M)}">
          <span class="tool-icon">${t.icon}</span>
          <span><strong>${t.title}</strong><small>${t.summary}</small></span>
        </button>`).join(``)}
    </nav>
    <p class="rail-note">${O} Files stay on your device</p>
  </aside>

  <section class="workbench" aria-labelledby="tool-title">
    <div class="tool-head">
      <h2 id="tool-title">${l[M].title}</h2>
      <p id="tool-hint">${l[M].hint}</p>
    </div>

    <div class="drop" id="drop" role="region" aria-label="File upload area">
      <span class="upload-icon">${te}</span>
      <strong id="drop-title">Drop PDF files here</strong>
      <span class="limit">Up to 100 MB and 500 pages per job</span>
      <button class="primary" id="browse" type="button">Choose PDFs</button>
      <input type="file" id="picker" accept=".pdf,application/pdf" hidden>
    </div>

    <ol id="queue" aria-label="Selected files" hidden></ol>

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
      <a class="primary" id="download" hidden>Download</a>
      <div id="continue-options" hidden>
        <label for="next-tool">Continue with this PDF</label>
        <select id="next-tool">${Object.values(l).filter(e=>!e.kind&&e.id!==`merge`).map(e=>`<option value="${e.id}">${e.title}</option>`).join(``)}</select>
        <button id="continue-tool" class="outline">Open tool</button>
      </div>
    </div>
  </section>
</main>

<div class="shell" id="landing-content">
  ${d(l[M])}
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
        <span class="private" style="display:inline-flex;">${O} Files processed on your device</span>
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

<dialog id="legal-dialog">
  <div id="legal-body"></div>
  <div class="dialog-actions">
    <button type="button" class="primary" id="close-legal">Close</button>
  </div>
</dialog>
`;var H=e=>document.getElementById(e),U=H(`picker`),W=H(`status`),G=H(`download`),K=H(`queue`),ie=H(`legal-dialog`),ae=H(`legal-body`),oe=s({grid:H(`page-grid`),feedback:H(`page-feedback`),range:H(`pages`),onEdit(e){!P&&!e&&J(),ce()}});function q(e){ae.innerHTML=e,ie.showModal()}H(`close-legal`).onclick=()=>ie.close(),H(`nav-privacy`)?.addEventListener(`click`,e=>{e.preventDefault(),q(f)}),H(`nav-about`)?.addEventListener(`click`,e=>{e.preventDefault(),q(m)}),H(`link-privacy`)?.addEventListener(`click`,e=>{e.preventDefault(),q(f)}),H(`link-terms`)?.addEventListener(`click`,e=>{e.preventDefault(),q(p)}),H(`link-about`)?.addEventListener(`click`,e=>{e.preventDefault(),q(m)});function se(){let e=[`split`,`organize`,`export`].includes(M);oe.load(e?N[0]:void 0,M===`organize`)}function ce(){H(`process`).disabled=M===`merge`&&N.length<2||M===`organize`&&oe.getEdits().length===0}function J(){F&&URL.revokeObjectURL(F),F=void 0,I=void 0,H(`continue-options`).hidden=!0,G.removeAttribute(`href`),G.hidden=!0,H(`reload-tool`).hidden=!0,W.textContent=``,W.classList.remove(`error`)}function Y(e,t=!1){W.textContent=e,W.classList.toggle(`error`,t)}function X(e,t=!0){Object.hasOwn(l,e)&&e!==M&&!P&&(l[M].kind!==l[e].kind&&(N=[]),M=e,l[M].multiple||(N=N.slice(0,1)),H(`pages`).value=``,H(`separate`).checked=!1,se(),J(),g(M,t),Z(),le())}function le(){let e=H(`landing-content`);e&&(e.innerHTML=d(l[M]),e.querySelectorAll(`[data-switch-tool]`).forEach(e=>{e.onclick=t=>{t.preventDefault(),z=!0,X(e.dataset.switchTool),window.scrollTo({top:H(`tools-section`).offsetTop-80,behavior:`smooth`})}}))}document.querySelectorAll(`.footer [data-switch-tool]`).forEach(e=>{e.onclick=t=>{t.preventDefault(),z=!0,X(e.dataset.switchTool),window.scrollTo({top:H(`tools-section`).offsetTop-80,behavior:`smooth`})}}),window.addEventListener(`popstate`,()=>{let e=h();e&&e!==M&&!P&&X(e,!1)});function Z(e,t){let n=l[M];H(`tool-title`).textContent=n.title,H(`tool-hint`).textContent=n.hint,U.multiple=!!n.multiple,U.accept=n.accept??`.pdf,application/pdf`;let r=n.kind??(n.multiple?`PDFs`:`PDF`);H(`browse`).textContent=`Choose `+r,H(`drop-title`).textContent=`Drop `+r+` here`,H(`browse`).disabled=!!P,H(`process`).textContent=M===`word`?`Export editable text`:n.title,H(`process`).hidden=!N.length||!!P,ce(),H(`cancel`).hidden=!P,H(`split-options`).hidden=![`split`,`export`,`watermark`,`numbers`].includes(M)||!N.length,H(`zip-option`).hidden=M!==`split`,H(`image-options`).hidden=M!==`export`||!N.length,H(`pages`).disabled=H(`separate`).disabled=H(`image-format`).disabled=!!P,H(`stamp-options`).hidden=![`watermark`,`numbers`].includes(M)||!N.length,H(`watermark-label`).hidden=H(`watermark-text`).hidden=M!==`watermark`,H(`number-label`).hidden=H(`number-start`).hidden=M!==`numbers`,H(`watermark-text`).disabled=H(`number-start`).disabled=!!P,oe.setDisabled(!!P);for(let e of document.querySelectorAll(`[data-mode]`))e.setAttribute(`aria-pressed`,String(e.dataset.mode===M)),e.disabled=!!P;if(K.hidden=!N.length,K.replaceChildren(),N.forEach((e,t)=>{let r=document.createElement(`li`),i=document.createElement(`span`);i.className=`filename`,i.textContent=e.name,r.append(i);let a=document.createElement(`div`);a.className=`actions`,n.multiple&&N.length>1&&!P&&(r.draggable=!0,r.ondragstart=n=>{B=t,n.dataTransfer.setData(`text/plain`,e.name)},r.ondragend=()=>{B=void 0},r.ondragover=e=>{B!==void 0&&e.preventDefault()},r.ondrop=e=>{if(B===void 0)return;e.preventDefault();let[n]=N.splice(B,1);N.splice(t,0,n),B=void 0,J(),Z(t)});let o=n.multiple?[[`↑`,`Move up`,-1],[`↓`,`Move down`,1]]:[];o.push([`×`,`Remove`,0]);for(let[r,i,s]of o){let o=document.createElement(`button`);o.className=`icon-button`,o.textContent=r,o.dataset.action=i,o.setAttribute(`aria-label`,`${i} ${e.name}`),o.disabled=!!P||t+s<0||t+s>=N.length,o.onclick=()=>{s?[N[t],N[t+s]]=[N[t+s],N[t]]:(N.splice(t,1),n.multiple||se()),J(),Z(Math.min(t+s,N.length-1),i)},a.append(o)}r.append(a),K.append(r)}),e!==void 0){let n=K.children[e];([...n?.querySelectorAll(`button:enabled`)??[]].find(e=>e.dataset.action===t)??n?.querySelector(`button:enabled`)??H(`browse`)).focus()}}function ue(e){if(P||!e.length)return;J();let t=l[M];if(!t.multiple&&e.length!==1){Y(`Choose one `+(t.kind??`PDF`)+` for this tool.`,!0);return}let n=t.multiple?[...N,...e]:e;n.length>50||n.reduce((e,t)=>e+t.size,0)>104857600?Y(`Choose up to 50 files totaling 100 MB or less.`,!0):(N=n,se(),Z())}function de(){P?.cancel(),P=void 0,clearTimeout(re),Z()}function fe(e){de(),e.error?(Y(e.error,!0),H(`reload-tool`).hidden=!e.reload,(e.reload?H(`reload-tool`):H(`process`)).focus()):(F=URL.createObjectURL(e.blob),G.href=F,G.download=e.filename,G.textContent=`Download `+e.filename,G.hidden=!1,e.blob.type===`application/pdf`&&(I=new File([e.blob],e.filename,{type:`application/pdf`}),H(`continue-options`).hidden=!1),Y(`Your download is ready.`),G.focus(),R&&L&&ge(R.user.id,M).catch(()=>{}))}H(`watermark-text`).oninput=H(`number-start`).oninput=J,H(`continue-tool`).onclick=()=>{if(!I||P)return;let e=I;X(H(`next-tool`).value),N=[],ue([e]),H(`tool-title`).scrollIntoView({block:`center`})},H(`reload-tool`).onclick=()=>location.reload(),H(`browse`).onclick=()=>U.click(),U.onchange=()=>{ue([...U.files]),U.value=``};var Q=H(`drop`);Q.ondragover=e=>{e.preventDefault(),Q.classList.add(`dragging`)},Q.ondragleave=()=>Q.classList.remove(`dragging`),Q.ondrop=e=>{e.preventDefault(),Q.classList.remove(`dragging`),ue([...e.dataTransfer.files])},window.addEventListener(`dragover`,e=>{e.dataTransfer.types.includes(`Files`)&&e.preventDefault()}),window.addEventListener(`drop`,e=>{e.dataTransfer.types.includes(`Files`)&&e.preventDefault()}),H(`cancel`).onclick=()=>{de(),Y(`Processing canceled.`),H(`process`).focus()},H(`pages`).oninput=()=>{J(),oe.updateRange()},H(`image-format`).onchange=J,H(`separate`).onchange=J;function pe(e){let t=new Worker(new URL(`/assets/processor-ChP6gCjX.js`,``+import.meta.url),{type:`module`}),n=P,r=n.cancel;n.cancel=()=>{r(),t.terminate()},t.onmessage=({data:e})=>{P===n&&fe(e)},t.onerror=()=>{P===n&&fe({error:`Processing failed. Try a smaller file.`})},t.postMessage(e)}async function me(e,t,n){let{mode:r,files:i,selection:a,imageFormat:s}=t;if(![`word`,`export`,`compress`,`docx`].includes(r)){pe(t);return}let c=await i[0].arrayBuffer();if(n.throwIfAborted(),r===`docx`){let{readDocx:r}=await o(async()=>{let{readDocx:e}=await import(`./docx-text-DscCvB_s.js`);return{readDocx:e}},__vite__mapDeps([0,1])),i=await r(c,n);P===e&&pe({...t,lines:i});return}let l;if(r===`word`){let{toWord:e}=await o(async()=>{let{toWord:e}=await import(`./word-DahZlceG.js`);return{toWord:e}},__vite__mapDeps([2,3]));l={blob:await e(c,n),filename:`converted.docx`}}else{let{pdfToImages:e,compressScan:t}=await o(async()=>{let{pdfToImages:e,compressScan:t}=await import(`./pdf-images-9PUxIpaZ.js`);return{pdfToImages:e,compressScan:t}},__vite__mapDeps([4,1,3]));l=r===`export`?{blob:await e(c,n,a,s),filename:`page-images.zip`}:{blob:await t(c,n,i[0].size),filename:`compressed-scan.pdf`}}P===e&&fe(l)}H(`process`).onclick=()=>{J();let e=new AbortController,t={cancel:()=>e.abort()};P=t,me(t,{files:N,mode:M,selection:H(`pages`).value.trim(),separate:H(`separate`).checked,pageEdits:oe.getEdits(),imageFormat:H(`image-format`).value,stampOptions:{text:H(`watermark-text`).value,start:H(`number-start`).value}},e.signal).catch(e=>{P===t&&(/failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|unable to preload css/i.test(e.message)?fe({error:`This tool could not load. Reload docSpace, then select your file again.`,reload:!0}):fe({error:([`InvalidPDFException`,`PasswordException`].includes(e.name)?`This PDF is damaged or encrypted. Try an unlocked copy.`:e.message)||`Processing failed.`}))}),re=setTimeout(()=>fe({error:`Processing timed out. Try a smaller set of pages or files.`}),12e4),Z(),Y(`Processing your files…`),H(`cancel`).focus()};var he=Promise.resolve();document.querySelector(`.tools`).onclick=e=>{let t=e.target.closest(`[data-mode]`);if(t&&(z=!0,X(t.dataset.mode),R)){let e={user_id:R.user.id,last_tool:M};he=he.then(async()=>{let{error:t}=await L.from(`tool_preferences`).upsert(e);t&&R?.user.id===e.user_id&&Y(`Could not sync your tool preference.`,!0)}).catch(()=>Y(`Could not sync your tool preference.`,!0))}};async function ge(e,t){if(L&&e)try{await L.rpc(`increment_tool_usage`,{tool_name:t})}catch{}}async function _e(){let{createClient:e}=await o(async()=>{let{createClient:e}=await import(`./dist-CVPAM7_G.js`);return{createClient:e}},[]);L=e(ne.VITE_SUPABASE_URL,ne.VITE_SUPABASE_PUBLISHABLE_KEY,{auth:{flowType:`pkce`}});let t=H(`account`),n=H(`sign-in`),r=H(`account-status`);H(`close-dialog`).onclick=()=>n.close(),t.onclick=async()=>{if(!R)n.showModal();else{t.disabled=!0;try{let{error:e}=await L.auth.signOut();e&&Y(`Could not sign out. Try again.`,!0)}finally{t.disabled=!1}}},H(`sign-in-form`).onsubmit=async e=>{e.preventDefault(),H(`send-link`).disabled=!0,r.textContent=`Sending your link…`;try{let{error:e}=await L.auth.signInWithOtp({email:H(`email`).value.trim(),options:{emailRedirectTo:location.origin+`/`}});r.textContent=e?`Could not send the link. Check your address and try again.`:`Open the sign-in link in this browser.`}catch{r.textContent=`Could not send the link. Check your connection and try again.`}finally{H(`send-link`).disabled=!1}},L.auth.onAuthStateChange((e,n)=>{let r=R?.user.id!==n?.user.id;if(R=n,t.textContent=n?`Sign out`:`Sign in`,!n||!r)return;let i=n.user.id;setTimeout(async()=>{let{data:e}=await L.from(`tool_preferences`).select(`last_tool`).eq(`user_id`,i).maybeSingle();R?.user.id===i&&!z&&!N.length&&e&&X(e.last_tool,!1)})})}Z(),le(),g(M);var ve=document.getElementById(`hero-tech-wordmark`);ve&&D(ve,{text:`docSpace`,fontWeight:850,fontSize:window.innerWidth<640?56:82,letterSpacing:-.04,color:`#181528`,accentColor:`#7c3aed`,align:`left`,reach:160,dashLength:4,dashGap:2,strokeWidth:1.5,draggable:!0,clickKick:!0,sweep:!0,labels:!0,specks:12}),j&&_e().catch(()=>{H(`account`).disabled=!0,H(`account`).textContent=`Sign-in unavailable`});export{e as n,o as t};