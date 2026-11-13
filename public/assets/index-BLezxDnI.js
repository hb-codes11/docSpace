const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/docx-text-DscCvB_s.js","assets/jszip.min-DmP1z0LA.js","assets/word-DahZlceG.js","assets/view-pdf-Bdfownce.js","assets/pdf-images-Dwt5GX3o.js"])))=>i.map(i=>d[i]);
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
`,l={merge:{id:`merge`,slug:`merge-pdf`,title:`Merge PDFs`,actionText:`Merge PDFs`,summary:`Combine documents in any order`,hint:`Add at least two PDFs, then arrange them in the order you want.`,icon:c,multiple:!0,seoTitle:`Merge PDF Files Online — Free, Fast & 100% Private | docSpace`,seoDescription:`Combine multiple PDF documents into one unified file directly in your browser. 100% client-side privacy with zero file uploads or server queues.`,steps:[{title:`Upload PDFs`,desc:`Select or drag & drop two or more PDF documents into the queue.`},{title:`Arrange Order`,desc:`Drag files or click arrow buttons to arrange pages in your exact preferred sequence.`},{title:`Download Merged PDF`,desc:`Click Merge PDFs to combine documents locally and download immediately.`}],features:[`Preserves original vector clarity, embedded typography, and crisp resolution.`,`Supports merging up to 50 individual PDF files totaling up to 100 MB.`,`Complete privacy: files are merged in your local browser memory using WebAssembly.`],faqs:[{q:`Are my uploaded PDFs stored on your servers?`,a:`No. docSpace processes every document directly inside your web browser using WebAssembly. Your files never leave your device.`},{q:`Is there a limit on how many PDFs I can merge?`,a:`You can merge up to 50 documents totaling up to 100 MB and 500 total pages per batch.`},{q:`Can I reorder the files before merging?`,a:`Yes. Simply drag files up or down in the list, or use the handy arrow controls to set the precise ordering.`}]},split:{id:`split`,slug:`split-pdf`,title:`Split PDF`,actionText:`Split PDF`,summary:`Extract pages or split into files`,hint:`Select the pages you want to keep or save each page as a separate PDF.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
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
`,multiple:!1,seoTitle:`Organize PDF Pages Online — Rotate, Reorder & Delete | docSpace`,seoDescription:`Visual page organizer for PDF files. Rearrange pages with drag and drop, rotate orientations, and remove unwanted pages with live previews.`,steps:[{title:`Upload Document`,desc:`Choose your PDF to instantly render visual thumbnail cards.`},{title:`Organize Visually`,desc:`Drag thumbnails to reorder, click rotate (↻) to turn pages 90°, or click (×) to delete.`},{title:`Save New PDF`,desc:`Click Organize PDF to generate your updated document in seconds.`}],features:[`Visual drag-and-drop page canvas with fluid reordering.`,`Per-page 90° clockwise rotation for correcting misaligned scans.`,`Instantly remove unwanted or blank pages before finalizing.`],faqs:[{q:`Does rotating a page affect its quality?`,a:`No, page rotation modifies standard PDF viewport metadata losslessly without recompressing images.`},{q:`Can I undo deleted pages?`,a:`Before clicking Organize PDF, you can reload the original file at any time to start fresh.`}]},images:{id:`images`,slug:`images-to-pdf`,title:`Images to PDF`,actionText:`Images to PDF`,summary:`Combine JPG and PNG files`,hint:`Arrange your images. Each image becomes one PDF page.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
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
`,accept:`.jpg,.jpeg,.png,image/jpeg,image/png`,kind:`images`,multiple:!0,seoTitle:`Convert JPG & PNG Images to PDF Online Free | docSpace`,seoDescription:`Transform photos, receipts, scans, and graphic images into a consolidated PDF file. Fast, free, and completely confidential.`,steps:[{title:`Select Images`,desc:`Upload JPG, JPEG, or PNG images from your device.`},{title:`Sequence Images`,desc:`Rearrange image cards in the order you want them to appear in the PDF.`},{title:`Build Document`,desc:`Generate your multi-page PDF document and download instantly.`}],features:[`Supports all standard JPEG and PNG formats.`,`Automatically matches each page dimension to the source image dimensions.`,`Batch conversion of up to 50 photos or documents in one operation.`],faqs:[{q:`Are my images compressed when converted?`,a:`Original image byte clarity is preserved without unnecessary downsampling.`},{q:`Can I mix PNG and JPG files together?`,a:`Yes! You can add both formats into a single batch.`}]},export:{id:`export`,slug:`pdf-to-images`,title:`PDF to images`,actionText:`PDF to images`,summary:`Save pages as JPG or PNG`,hint:`Export up to 50 selected pages at a time in a ZIP file.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
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
`,multiple:!1,seoTitle:`Convert PDF to Images Online — Export JPG or PNG | docSpace`,seoDescription:`Turn PDF document pages into high-resolution JPG or PNG image files. Download all rendered pages in a clean, organized ZIP.`,steps:[{title:`Upload PDF`,desc:`Choose the PDF you wish to convert into image files.`},{title:`Select Format & Pages`,desc:`Choose PNG or JPG format, and specify which pages to render.`},{title:`Download ZIP`,desc:`Receive a structured ZIP archive containing every rendered page image.`}],features:[`High-fidelity canvas rasterization powered by PDF.js.`,`Choice between lossless PNG or lightweight JPG compression.`,`Selective page export allows targeting only the graphics you need.`],faqs:[{q:`Which format should I choose: PNG or JPG?`,a:`Choose PNG for clean vector text, logos, and diagrams; choose JPG for photographs and complex scanned pages.`},{q:`Is there a limit on how many pages I can export?`,a:`Up to 50 pages can be exported per batch to guarantee high performance on device memory.`}]},compress:{id:`compress`,slug:`compress-pdf`,title:`Compress scan`,actionText:`Compress scan`,summary:`Reduce the size of scanned PDFs`,hint:`Re-encode up to 50 pages as lower-resolution images. The new PDF loses selectable text, links, forms, and annotations.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
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
`,multiple:!1,seoTitle:`Compress Scanned PDF Online Free — Reduce PDF Size | docSpace`,seoDescription:`Significantly reduce the file size of heavy scanned PDF documents locally on your device. Downloads only if the file size is reduced.`,steps:[{title:`Select Scanned PDF`,desc:`Choose a large scanned document that exceeds your email or portal limit.`},{title:`Optimize In-Browser`,desc:`docSpace re-encodes scanned bitmap pages with efficient compression.`},{title:`Download Smaller PDF`,desc:`Compare sizes and download your lightweight PDF file.`}],features:[`Intelligent compression safeguard: downloads only if the output is genuinely smaller than the original.`,`Ideal for heavy receipts, contracts, government forms, and archival scans.`,`No cloud processing: your sensitive legal and personal records remain strictly on your machine.`],faqs:[{q:`Why did compression report no smaller file?`,a:`If your PDF is already heavily optimized, compressing further might increase size. docSpace guarantees it never delivers a larger file.`},{q:`Does compression preserve selectable text?`,a:`Scanned compression re-encodes pages as optimized raster images, so interactive form fields and selectable text are omitted in this mode.`}]},docx:{id:`docx`,slug:`word-to-pdf`,title:`Word to PDF`,actionText:`Word to PDF`,summary:`Export DOCX text as PDF`,hint:`Create a plain-text PDF from a DOCX file. Formatting and images are omitted. Supports Western European characters.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
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
`,accept:`.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document`,kind:`DOCX`,multiple:!1,seoTitle:`Convert Word DOCX to PDF Online Free — Private & Fast | docSpace`,seoDescription:`Convert Microsoft Word DOCX files to clean, searchable PDF documents directly in your browser with zero document uploads.`,steps:[{title:`Select Word Document`,desc:`Pick your .docx file from your device.`},{title:`Extract & Typeset`,desc:`docSpace parses XML paragraphs and renders crisp PDF pages locally.`},{title:`Download PDF`,desc:`Save your freshly created PDF document instantly.`}],features:[`Pure client-side XML extraction: zero transmission of proprietary corporate or personal Word files.`,`Automatic page budgeting and clean typography formatting.`,`Instant processing with zero wait times.`],faqs:[{q:`Does Word to PDF preserve images and tables?`,a:`This tool extracts clean text and paragraph structures. Complex tables and embedded images are omitted for reliable browser typesetting.`},{q:`Are older .doc files supported?`,a:`Standard modern .docx files (Office 2007+) are supported.`}]},word:{id:`word`,slug:`pdf-to-word`,title:`PDF to Word`,actionText:`Export editable text`,summary:`Export editable text to DOCX`,hint:`Convert selectable text into a Word document. Scanned pages and original layout are outside this conversion.`,icon:`<!-- @license lucide-static v1.72.0 - ISC -->
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
`,multiple:!1,seoTitle:`Convert PDF to Word DOCX Online — Extract Editable Text | docSpace`,seoDescription:`Transform selectable PDF document text into an editable Microsoft Word .docx file with paragraph breaks intact.`,steps:[{title:`Upload PDF`,desc:`Select the PDF containing selectable text that you need to edit.`},{title:`Extract Text Stream`,desc:`PDF.js extracts textual characters, font baselines, and page breaks in-memory.`},{title:`Download DOCX`,desc:`Open your generated .docx document in Microsoft Word, Google Docs, or LibreOffice.`}],features:[`Generates fully editable Microsoft Word .docx files compatible with all modern office suites.`,`Preserves multi-page structural page breaks and paragraph flows.`,`100% private: ideal for confidential contracts, NDAs, and manuscripts.`],faqs:[{q:`Can this convert scanned images of text to Word?`,a:`The document must contain selectable text characters. Scanned image-only PDFs require OCR first.`},{q:`Can I edit the output in Google Docs?`,a:`Yes! The generated DOCX file can be opened directly in Google Docs, Word, or Pages.`}]}};function u(e){if(e)return Object.hasOwn(l,e)?l[e]:Object.values(l).find(t=>t.slug===e)}var d=`<!-- @license lucide-static v1.72.0 - ISC -->
<svg
  class="lucide lucide-check"
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
  <path d="M20 6 9 17l-5-5" />
</svg>
`,f=`<!-- @license lucide-static v1.72.0 - ISC -->
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
`,p=`<!-- @license lucide-static v1.72.0 - ISC -->
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
`,m=`<!-- @license lucide-static v1.72.0 - ISC -->
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
`;function h(e){let t=Object.values(l).filter(t=>t.id!==e.id).slice(0,4);return`
    <section class="landing-section" aria-label="Tool Information and Guides">
      <!-- 3-Step How-To Guide -->
      <div class="landing-block">
        <div class="section-badge"><span class="badge-icon">${f}</span> Simple & Fast</div>
        <h3 class="section-title">How to ${e.title} in 3 Simple Steps</h3>
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

      <!-- Comparison: On-Device vs Traditional Cloud Tools -->
      <div class="landing-block">
        <div class="section-badge"><span class="badge-icon">${p}</span> Privacy Benchmark</div>
        <h3 class="section-title">Why docSpace is Superior to Cloud PDF Converters</h3>
        <div class="comparison-card">
          <div class="comparison-table-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th class="highlight-col">docSpace (Client-Side)</th>
                  <th>Traditional Cloud Tools</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>File Privacy</strong></td>
                  <td class="highlight-col"><span class="table-badge good">${d} 100% on device</span></td>
                  <td><span class="table-badge bad">Uploaded to remote servers</span></td>
                </tr>
                <tr>
                  <td><strong>Processing Speed</strong></td>
                  <td class="highlight-col"><span class="table-badge good">${d} Instant WebAssembly</span></td>
                  <td><span class="table-badge bad">Slow upload & download queues</span></td>
                </tr>
                <tr>
                  <td><strong>Server Data Retention</strong></td>
                  <td class="highlight-col"><span class="table-badge good">${d} Zero retention</span></td>
                  <td><span class="table-badge bad">Files stored in remote disks</span></td>
                </tr>
                <tr>
                  <td><strong>Security Compliance</strong></td>
                  <td class="highlight-col"><span class="table-badge good">${d} Safe for NDA/Tax/Medical</span></td>
                  <td><span class="table-badge bad">Risk of data breaches</span></td>
                </tr>
                <tr>
                  <td><strong>Cost & Limits</strong></td>
                  <td class="highlight-col"><span class="table-badge good">${d} Completely Free</span></td>
                  <td><span class="table-badge bad">Paywalls & credit limits</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Specifications & Key Features -->
      <div class="landing-block">
        <div class="section-badge"><span class="badge-icon">${m}</span> Built for Scale</div>
        <h3 class="section-title">Key Specifications & Capabilities</h3>
        <div class="specs-grid">
          <div class="spec-card">
            <span class="spec-label">Capacity Limit</span>
            <span class="spec-val">Up to 50 files / 100 MB</span>
            <p class="spec-desc">Optimized memory management for desktop & mobile devices.</p>
          </div>
          <div class="spec-card">
            <span class="spec-label">Engine Technology</span>
            <span class="spec-val">pdf-lib • PDF.js • docx</span>
            <p class="spec-desc">Standard-compliant WebAssembly and Web Worker pipelines.</p>
          </div>
          <div class="spec-card">
            <span class="spec-label">Identity & Sync</span>
            <span class="spec-val">Supabase PostgreSQL RLS</span>
            <p class="spec-desc">Strict cryptographic row-level security for user preferences.</p>
          </div>
        </div>
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
        <h3 class="section-title">Explore More PDF Tools</h3>
        <div class="related-grid">
          ${t.map(e=>`
            <a href="/${e.slug}" class="related-card" data-switch-tool="${e.id}">
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
  `}var g={BASE_URL:`/`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1},_=/^ca-pub-\d+$/.test(g.VITE_ADSENSE_CLIENT_ID??``)?g.VITE_ADSENSE_CLIENT_ID:``,ee=g.VITE_ADSENSE_SLOT_TOP;g.VITE_ADSENSE_SLOT_BOTTOM;var v=!1;function te(){if(_&&!v)try{let e=document.createElement(`script`);e.async=!0,e.src=`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(_)}`,e.crossOrigin=`anonymous`,document.head.appendChild(e),v=!0}catch{}}function ne({position:e=`top`,slotId:t=ee,format:n=`auto`}={}){return!_||!/^\d+$/.test(t??``)?``:`
    <div class="ad-container ad-${e}" aria-label="Advertisement">
      <span class="ad-badge">Advertisement</span>
      <div class="ad-wrapper">
        <ins class="adsbygoogle" style="display:block"
             data-ad-client="${_}" data-ad-slot="${t}"
             data-ad-format="${n}" data-full-width-responsive="true"></ins>
      </div>
    </div>
  `}function re(){if(_)try{window.adsbygoogle&&Array.isArray(window.adsbygoogle)&&window.adsbygoogle.push({})}catch{}}var y=`
  <h2>Privacy Policy</h2>
  <p class="legal-effective">Last updated: November 2026</p>

  <h3>1. 100% On-Device Processing Guarantee</h3>
  <p>At <strong>docSpace</strong>, we believe your personal, legal, and financial documents belong exclusively to you. Unlike traditional cloud-based document converters, <strong>docSpace processes all PDF and Word files entirely on your device</strong> using in-browser WebAssembly and JavaScript libraries (including pdf-lib, PDF.js, and docx).</p>
  <p><strong>Your files, filenames, text streams, and images are never transmitted to, uploaded to, or stored on any remote server.</strong> All operations execute locally in your computer or mobile device's transient memory.</p>

  <h3>2. Information We Collect</h3>
  <p>Because files are processed locally, we do not collect or log document contents. The only data processed externally includes:</p>
  <ul>
    <li><strong>Optional Account Data:</strong> If you choose to sign in via Supabase passwordless magic link, your email address, last-used tool preference, and per-tool usage counts are securely synced via Supabase Row Level Security (RLS). You can use docSpace completely anonymously without creating an account.</li>
    <li><strong>Browser Diagnostics:</strong> Standard technical information sent automatically by your browser (user agent, language, operating system) for rendering and responsive layout.</li>
  </ul>

  <h3>3. Advertising & Cookies (Google AdSense)</h3>
  <p>To keep docSpace free and scalable, we may display third-party advertisements served by Google AdSense:</p>
  <ul>
    <li>Google, as a third-party vendor, uses cookies to serve ads on docSpace based on your prior visits to this website or other websites on the Internet.</li>
    <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to docSpace and/or other sites on the Internet.</li>
    <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a> or by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener">www.aboutads.info</a>.</li>
  </ul>

  <h3>4. Data Security & Storage</h3>
  <p>All database interactions with Supabase are protected with PostgreSQL Row Level Security (RLS). Each authenticated user can access only their own row. Anonymous users have zero read or write access to database records.</p>

`,ie=`
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
`,b=`
  <h2>About docSpace</h2>
  <p class="legal-effective">Built for speed, security, and privacy.</p>

  <p><strong>docSpace</strong> was engineered to solve a fundamental problem on the modern web: <em>why do users have to upload confidential tax returns, legal contracts, medical forms, and bank statements to mysterious cloud servers just to merge two PDFs or rotate a single page?</em></p>

  <h3>Modern Web Architecture</h3>
  <p>Using modern WebAssembly, Web Workers, and standards-compliant browser APIs, docSpace delivers desktop-grade PDF and Word utilities directly in your browser tab:</p>
  <ul>
    <li><strong>Zero File Uploads:</strong> Document bytes remain isolated in local sandbox memory.</li>
    <li><strong>Instant Speed:</strong> No waiting for multi-megabyte uploads, server queue processing, or download links.</li>
    <li><strong>Infinite Scaling:</strong> Because computation occurs on client hardware, docSpace scales effortlessly to millions of daily users with zero server bottlenecks.</li>
    <li><strong>Enterprise-Grade Row Level Security:</strong> User preferences and sessions are guarded by PostgreSQL RLS in Supabase.</li>
  </ul>
`;function x(){let e=location.hash.replace(/^#\/?/,``),t=location.pathname.replace(/^\/|\/$/g,``);return u(e)?.id??u(t)?.id??`merge`}function S(e,t=!1){let n=l[e];if(document.title=n.seoTitle||n.title+` — docSpace`,document.querySelector(`meta[name="description"]`).content=n.seoDescription||n.hint,t){let t=new URL(`/`,location.origin);t.hash=e===`merge`?``:`/`+n.slug,t.href!==location.href&&history.pushState(null,``,t)}}var ae=`<!-- @license lucide-static v1.72.0 - ISC -->
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
`,C={BASE_URL:`/`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1},w=!!(C.VITE_SUPABASE_URL&&C.VITE_SUPABASE_PUBLISHABLE_KEY);te();var T=x(),E=[],D,O,k,A,j,M=!1,N,oe=document.querySelector(`#app`);oe.innerHTML=`
<header class="top">
  <div class="shell top-inner">
    <a class="brand" href="/" aria-label="docSpace Home">
      <span class="brand-icon">${c}</span>
      <span>docSpace</span>
    </a>
    <nav class="top-nav" aria-label="Main Navigation">
      <a class="nav-link" href="#tools-section">Tools</a>
      <a href="#privacy" class="nav-link" id="nav-privacy">Privacy</a>
      <a href="#about" class="nav-link" id="nav-about">About</a>
    </nav>
    <div class="top-actions">
      <span class="private" title="Files processed 100% locally in browser">${p} On-device processing</span>
      ${w?`<button id="account" class="outline">Sign in</button>`:``}
    </div>
  </div>
</header>

<section class="shell hero" id="tools-section">
  <div class="hero-pill">${f} Private Client-Side Document Studio</div>
  <h1>Fast, Private PDF & Word Tools <span class="hero-gradient">On Your Device</span></h1>
  <p>No file uploads. No server queues. Merge, split, organize, compress, and convert documents with on-device processing.</p>
  <div class="hero-badges">
    <span class="hero-badge-item">${p} 100% In-Browser Memory</span>
    <span class="hero-badge-item">${m} Zero Server Uploads</span>
    <span class="hero-badge-item">${f} Instant Local Processing</span>
  </div>
</section>

<main class="shell studio">
  <aside class="rail">
    <nav aria-label="PDF tools" class="tools">
      ${Object.entries(l).map(([e,t])=>`<button class="tool" data-mode="${e}" aria-pressed="${String(e===T)}">
          <span class="tool-icon">${t.icon}</span>
          <span><strong>${t.title}</strong><small>${t.summary}</small></span>
        </button>`).join(``)}
    </nav>
    <p class="rail-note">${p} Files stay on your device</p>
  </aside>

  <section class="workbench" aria-labelledby="tool-title">
    <div class="tool-head">
      <h2 id="tool-title">${l[T].title}</h2>
      <p id="tool-hint">${l[T].hint}</p>
    </div>

    <div class="drop" id="drop" role="region" aria-label="File upload area">
      <span class="upload-icon">${ae}</span>
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

    <p id="page-feedback" aria-live="polite"></p>
    <ol id="page-grid" aria-label="PDF pages" hidden></ol>

    <div class="result">
      <p id="status" role="status" aria-live="polite"></p>
      <button class="outline" id="reload-tool" hidden>Reload docSpace</button>
      <button class="primary" id="process" hidden></button>
      <button class="outline" id="cancel" hidden>Cancel</button>
      <a class="primary" id="download" hidden>Download</a>
    </div>
  </section>
</main>

<div class="shell" id="ad-slot-container">
  ${ne({position:`top`})}
</div>

<div class="shell" id="landing-content">
  ${h(l[T])}
</div>

<footer class="footer">
  <div class="shell">
    <div class="footer-grid">
      <div class="footer-col">
        <a class="brand" href="/" style="margin-bottom: 12px; display:inline-flex;">
          <span class="brand-icon">${c}</span>
          <span>docSpace</span>
        </a>
        <p>A fast, 100% private, client-side web application for local PDF and Word workflows. Your confidential files never leave your device.</p>
        <span class="private" style="display:inline-flex;">${p} 100% Client-Side Privacy Guaranteed</span>
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
          <li><a href="#about" class="footer-link" id="link-about">About Architecture</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} docSpace. All rights reserved.</span>
      <span>Engineered with WebAssembly & PostgreSQL RLS</span>
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
`;var P=e=>document.getElementById(e),F=P(`picker`),I=P(`status`),L=P(`download`),R=P(`queue`),z=P(`legal-dialog`),se=P(`legal-body`),B=s({grid:P(`page-grid`),feedback:P(`page-feedback`),range:P(`pages`),onEdit(e){!D&&!e&&W(),U()}});function V(e){se.innerHTML=e,z.showModal()}P(`close-legal`).onclick=()=>z.close(),P(`nav-privacy`)?.addEventListener(`click`,e=>{e.preventDefault(),V(y)}),P(`nav-about`)?.addEventListener(`click`,e=>{e.preventDefault(),V(b)}),P(`link-privacy`)?.addEventListener(`click`,e=>{e.preventDefault(),V(y)}),P(`link-terms`)?.addEventListener(`click`,e=>{e.preventDefault(),V(ie)}),P(`link-about`)?.addEventListener(`click`,e=>{e.preventDefault(),V(b)});function H(){let e=[`split`,`organize`,`export`].includes(T);B.load(e?E[0]:void 0,T===`organize`)}function U(){P(`process`).disabled=T===`merge`&&E.length<2||T===`organize`&&B.getEdits().length===0}function W(){k&&URL.revokeObjectURL(k),k=void 0,L.removeAttribute(`href`),L.hidden=!0,P(`reload-tool`).hidden=!0,I.textContent=``,I.classList.remove(`error`)}function G(e,t=!1){I.textContent=e,I.classList.toggle(`error`,t)}function K(e,t=!0){Object.hasOwn(l,e)&&e!==T&&!D&&(l[T].kind!==l[e].kind&&(E=[]),T=e,l[T].multiple||(E=E.slice(0,1)),P(`pages`).value=``,P(`separate`).checked=!1,H(),W(),S(T,t),J(),q(),re())}function q(){let e=P(`landing-content`);e&&(e.innerHTML=h(l[T]),e.querySelectorAll(`[data-switch-tool]`).forEach(e=>{e.onclick=t=>{t.preventDefault(),M=!0,K(e.dataset.switchTool),window.scrollTo({top:P(`tools-section`).offsetTop-80,behavior:`smooth`})}}))}document.querySelectorAll(`.footer [data-switch-tool]`).forEach(e=>{e.onclick=t=>{t.preventDefault(),M=!0,K(e.dataset.switchTool),window.scrollTo({top:P(`tools-section`).offsetTop-80,behavior:`smooth`})}}),window.addEventListener(`popstate`,()=>{let e=x();e&&e!==T&&!D&&K(e,!1)});function J(e,t){let n=l[T];P(`tool-title`).textContent=n.title,P(`tool-hint`).textContent=n.hint,F.multiple=!!n.multiple,F.accept=n.accept??`.pdf,application/pdf`;let r=n.kind??(n.multiple?`PDFs`:`PDF`);P(`browse`).textContent=`Choose `+r,P(`drop-title`).textContent=`Drop `+r+` here`,P(`browse`).disabled=!!D,P(`process`).textContent=T===`word`?`Export editable text`:n.title,P(`process`).hidden=!E.length||!!D,U(),P(`cancel`).hidden=!D,P(`split-options`).hidden=![`split`,`export`].includes(T)||!E.length,P(`zip-option`).hidden=T!==`split`,P(`image-options`).hidden=T!==`export`||!E.length,P(`pages`).disabled=P(`separate`).disabled=P(`image-format`).disabled=!!D,B.setDisabled(!!D);for(let e of document.querySelectorAll(`[data-mode]`))e.setAttribute(`aria-pressed`,String(e.dataset.mode===T)),e.disabled=!!D;if(R.hidden=!E.length,R.replaceChildren(),E.forEach((e,t)=>{let r=document.createElement(`li`),i=document.createElement(`span`);i.className=`filename`,i.textContent=e.name,r.append(i);let a=document.createElement(`div`);a.className=`actions`,n.multiple&&E.length>1&&!D&&(r.draggable=!0,r.ondragstart=n=>{N=t,n.dataTransfer.setData(`text/plain`,e.name)},r.ondragend=()=>{N=void 0},r.ondragover=e=>{N!==void 0&&e.preventDefault()},r.ondrop=e=>{if(N===void 0)return;e.preventDefault();let[n]=E.splice(N,1);E.splice(t,0,n),N=void 0,W(),J(t)});let o=n.multiple?[[`↑`,`Move up`,-1],[`↓`,`Move down`,1]]:[];o.push([`×`,`Remove`,0]);for(let[r,i,s]of o){let o=document.createElement(`button`);o.className=`icon-button`,o.textContent=r,o.dataset.action=i,o.setAttribute(`aria-label`,`${i} ${e.name}`),o.disabled=!!D||t+s<0||t+s>=E.length,o.onclick=()=>{s?[E[t],E[t+s]]=[E[t+s],E[t]]:(E.splice(t,1),n.multiple||H()),W(),J(Math.min(t+s,E.length-1),i)},a.append(o)}r.append(a),R.append(r)}),e!==void 0){let n=R.children[e];([...n?.querySelectorAll(`button:enabled`)??[]].find(e=>e.dataset.action===t)??n?.querySelector(`button:enabled`)??P(`browse`)).focus()}}function Y(e){if(D||!e.length)return;W();let t=l[T];if(!t.multiple&&e.length!==1){G(`Choose one `+(t.kind??`PDF`)+` for this tool.`,!0);return}let n=t.multiple?[...E,...e]:e;n.length>50||n.reduce((e,t)=>e+t.size,0)>104857600?G(`Choose up to 50 files totaling 100 MB or less.`,!0):(E=n,H(),J())}function X(){D?.cancel(),D=void 0,clearTimeout(O),J()}function Z(e){X(),e.error?(G(e.error,!0),P(`reload-tool`).hidden=!e.reload,(e.reload?P(`reload-tool`):P(`process`)).focus()):(k=URL.createObjectURL(e.blob),L.href=k,L.download=e.filename,L.textContent=`Download `+e.filename,L.hidden=!1,G(`Your download is ready.`),L.focus(),j&&A&&ue(j.user.id,T).catch(()=>{}))}P(`reload-tool`).onclick=()=>location.reload(),P(`browse`).onclick=()=>F.click(),F.onchange=()=>{Y([...F.files]),F.value=``};var Q=P(`drop`);Q.ondragover=e=>{e.preventDefault(),Q.classList.add(`dragging`)},Q.ondragleave=()=>Q.classList.remove(`dragging`),Q.ondrop=e=>{e.preventDefault(),Q.classList.remove(`dragging`),Y([...e.dataTransfer.files])},window.addEventListener(`dragover`,e=>{e.dataTransfer.types.includes(`Files`)&&e.preventDefault()}),window.addEventListener(`drop`,e=>{e.dataTransfer.types.includes(`Files`)&&e.preventDefault()}),P(`cancel`).onclick=()=>{X(),G(`Processing canceled.`),P(`process`).focus()},P(`pages`).oninput=()=>{W(),B.updateRange()},P(`image-format`).onchange=W,P(`separate`).onchange=W;function $(e){let t=new Worker(new URL(`/assets/processor-kIsCvhge.js`,``+import.meta.url),{type:`module`}),n=D,r=n.cancel;n.cancel=()=>{r(),t.terminate()},t.onmessage=({data:e})=>{D===n&&Z(e)},t.onerror=()=>{D===n&&Z({error:`Processing failed. Try a smaller file.`})},t.postMessage(e)}async function ce(e,t,n){let{mode:r,files:i,selection:a,imageFormat:s}=t;if(![`word`,`export`,`compress`,`docx`].includes(r)){$(t);return}let c=await i[0].arrayBuffer();if(n.throwIfAborted(),r===`docx`){let{readDocx:r}=await o(async()=>{let{readDocx:e}=await import(`./docx-text-DscCvB_s.js`);return{readDocx:e}},__vite__mapDeps([0,1])),i=await r(c,n);D===e&&$({...t,lines:i});return}let l;if(r===`word`){let{toWord:e}=await o(async()=>{let{toWord:e}=await import(`./word-DahZlceG.js`);return{toWord:e}},__vite__mapDeps([2,3]));l={blob:await e(c,n),filename:`converted.docx`}}else{let{pdfToImages:e,compressScan:t}=await o(async()=>{let{pdfToImages:e,compressScan:t}=await import(`./pdf-images-Dwt5GX3o.js`);return{pdfToImages:e,compressScan:t}},__vite__mapDeps([4,1,3]));l=r===`export`?{blob:await e(c,n,a,s),filename:`page-images.zip`}:{blob:await t(c,n,i[0].size),filename:`compressed-scan.pdf`}}D===e&&Z(l)}P(`process`).onclick=()=>{W();let e=new AbortController,t={cancel:()=>e.abort()};D=t,ce(t,{files:E,mode:T,selection:P(`pages`).value.trim(),separate:P(`separate`).checked,pageEdits:B.getEdits(),imageFormat:P(`image-format`).value},e.signal).catch(e=>{D===t&&(/failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|unable to preload css/i.test(e.message)?Z({error:`This tool could not load. Reload docSpace, then select your file again.`,reload:!0}):Z({error:([`InvalidPDFException`,`PasswordException`].includes(e.name)?`This PDF is damaged or encrypted. Try an unlocked copy.`:e.message)||`Processing failed.`}))}),O=setTimeout(()=>Z({error:`Processing timed out. Try a smaller set of pages or files.`}),12e4),J(),G(`Processing your files…`),P(`cancel`).focus()};var le=Promise.resolve();document.querySelector(`.tools`).onclick=e=>{let t=e.target.closest(`[data-mode]`);if(t&&(M=!0,K(t.dataset.mode),j)){let e={user_id:j.user.id,last_tool:T};le=le.then(async()=>{let{error:t}=await A.from(`tool_preferences`).upsert(e);t&&j?.user.id===e.user_id&&G(`Could not sync your tool preference.`,!0)}).catch(()=>G(`Could not sync your tool preference.`,!0))}};async function ue(e,t){if(A&&e)try{await A.rpc(`increment_tool_usage`,{tool_name:t})}catch{}}async function de(){let{createClient:e}=await o(async()=>{let{createClient:e}=await import(`./dist-CVPAM7_G.js`);return{createClient:e}},[]);A=e(C.VITE_SUPABASE_URL,C.VITE_SUPABASE_PUBLISHABLE_KEY,{auth:{flowType:`pkce`}});let t=P(`account`),n=P(`sign-in`),r=P(`account-status`);P(`close-dialog`).onclick=()=>n.close(),t.onclick=async()=>{if(!j)n.showModal();else{t.disabled=!0;try{let{error:e}=await A.auth.signOut();e&&G(`Could not sign out. Try again.`,!0)}finally{t.disabled=!1}}},P(`sign-in-form`).onsubmit=async e=>{e.preventDefault(),P(`send-link`).disabled=!0,r.textContent=`Sending your link…`;try{let{error:e}=await A.auth.signInWithOtp({email:P(`email`).value.trim(),options:{emailRedirectTo:location.origin+`/`}});r.textContent=e?`Could not send the link. Check your address and try again.`:`Open the sign-in link in this browser.`}catch{r.textContent=`Could not send the link. Check your connection and try again.`}finally{P(`send-link`).disabled=!1}},A.auth.onAuthStateChange((e,n)=>{let r=j?.user.id!==n?.user.id;if(j=n,t.textContent=n?`Sign out`:`Sign in`,!n||!r)return;let i=n.user.id;setTimeout(async()=>{let{data:e}=await A.from(`tool_preferences`).select(`last_tool`).eq(`user_id`,i).maybeSingle();j?.user.id===i&&!M&&!E.length&&e&&K(e.last_tool,!1)})})}J(),q(),S(T),w&&de().catch(()=>{P(`account`).disabled=!0,P(`account`).textContent=`Sign-in unavailable`});export{e as n,o as t};