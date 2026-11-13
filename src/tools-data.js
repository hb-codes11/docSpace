import mergeIcon from 'lucide-static/icons/layers-2.svg?raw';
import splitIcon from 'lucide-static/icons/scissors.svg?raw';
import organizeIcon from 'lucide-static/icons/layout-grid.svg?raw';
import imagesIcon from 'lucide-static/icons/images.svg?raw';
import exportIcon from 'lucide-static/icons/image-down.svg?raw';
import compressIcon from 'lucide-static/icons/minimize-2.svg?raw';
import docxIcon from 'lucide-static/icons/file-up.svg?raw';
import wordIcon from 'lucide-static/icons/file-text.svg?raw';

import stampIcon from 'lucide-static/icons/stamp.svg?raw';
import numbersIcon from 'lucide-static/icons/list-ordered.svg?raw';

export const tools = {
  merge: {
    id: 'merge',
    slug: 'merge-pdf',
    title: 'Merge PDFs',
    actionText: 'Merge PDFs',
    summary: 'Combine documents in any order',
    hint: 'Add at least two PDFs, then arrange them in the order you want.',
    icon: mergeIcon,
    multiple: true,
    seoTitle: 'Merge PDF Files Online — Free, Fast & 100% Private | docSpace',
    seoDescription: 'Combine multiple PDF documents into one unified file directly in your browser. 100% client-side privacy with zero file uploads or server queues.',
    steps: [
      { title: 'Upload PDFs', desc: 'Select or drag & drop two or more PDF documents into the queue.' },
      { title: 'Arrange Order', desc: 'Drag files or click arrow buttons to arrange pages in your exact preferred sequence.' },
      { title: 'Download Merged PDF', desc: 'Click Merge PDFs to combine documents locally and download immediately.' }
    ],
    features: [
      'Preserves original vector clarity, embedded typography, and crisp resolution.',
      'Supports merging up to 50 individual PDF files totaling up to 100 MB.',
      'Complete privacy: files are merged in your local browser memory using browser processing.'
    ],
    faqs: [
      { q: 'Are my uploaded PDFs stored on your servers?', a: 'No. docSpace processes every document directly inside your web browser using browser processing. Your files never leave your device.' },
      { q: 'Is there a limit on how many PDFs I can merge?', a: 'You can merge up to 50 documents totaling up to 100 MB and 500 total pages per batch.' },
      { q: 'Can I reorder the files before merging?', a: 'Yes. Simply drag files up or down in the list, or use the handy arrow controls to set the precise ordering.' }
    ]
  },
  split: {
    id: 'split',
    slug: 'split-pdf',
    title: 'Split PDF',
    actionText: 'Split PDF',
    summary: 'Extract pages or split into files',
    hint: 'Select the pages you want to keep or save each page as a separate PDF.',
    icon: splitIcon,
    multiple: false,
    seoTitle: 'Split PDF Online Free — Extract Pages & Split Files | docSpace',
    seoDescription: 'Extract specific pages or separate entire PDF files into individual documents securely on your computer or phone.',
    steps: [
      { title: 'Select Document', desc: 'Pick the PDF document you want to extract or split.' },
      { title: 'Specify Pages', desc: 'Enter page ranges (e.g., 1-3, 5) or click thumbnail previews to choose pages.' },
      { title: 'Export PDF or ZIP', desc: 'Download as a single extracted PDF or check ZIP to get each page as an individual file.' }
    ],
    features: [
      'Flexible range syntax: easily extract non-consecutive pages and page intervals.',
      'Instant interactive thumbnail preview with visual page selector.',
      'One-click ZIP bundling for bulk single-page extraction.'
    ],
    faqs: [
      { q: 'How do I specify multiple pages?', a: 'Type comma-separated numbers and ranges, such as "1, 3-5, 8". You can also click the page previews directly.' },
      { q: 'Can I export every page as a separate PDF?', a: 'Yes. Simply check the "Save each selected page separately in a ZIP" option before processing.' }
    ]
  },
  organize: {
    id: 'organize',
    slug: 'organize-pdf',
    title: 'Organize PDF',
    actionText: 'Organize PDF',
    summary: 'Reorder, rotate, or remove pages',
    hint: 'Arrange the page thumbnails, then save a new PDF.',
    icon: organizeIcon,
    multiple: false,
    seoTitle: 'Organize PDF Pages Online — Rotate, Reorder & Delete | docSpace',
    seoDescription: 'Visual page organizer for PDF files. Rearrange pages with drag and drop, rotate orientations, and remove unwanted pages with live previews.',
    steps: [
      { title: 'Upload Document', desc: 'Choose your PDF to instantly render visual thumbnail cards.' },
      { title: 'Organize Visually', desc: 'Drag thumbnails to reorder, click rotate (↻) to turn pages 90°, or click (×) to delete.' },
      { title: 'Save New PDF', desc: 'Click Organize PDF to generate your updated document in seconds.' }
    ],
    features: [
      'Visual drag-and-drop page canvas with fluid reordering.',
      'Per-page 90° clockwise rotation for correcting misaligned scans.',
      'Instantly remove unwanted or blank pages before finalizing.'
    ],
    faqs: [
      { q: 'Does rotating a page affect its quality?', a: 'No, page rotation modifies standard PDF viewport metadata losslessly without recompressing images.' },
      { q: 'Can I undo deleted pages?', a: 'Before clicking Organize PDF, you can reload the original file at any time to start fresh.' }
    ]
  },
  images: {
    id: 'images',
    slug: 'images-to-pdf',
    title: 'Images to PDF',
    actionText: 'Images to PDF',
    summary: 'Combine JPG and PNG files',
    hint: 'Arrange your images. Each image becomes one PDF page.',
    icon: imagesIcon,
    accept: '.jpg,.jpeg,.png,image/jpeg,image/png',
    kind: 'images',
    multiple: true,
    seoTitle: 'Convert JPG & PNG Images to PDF Online Free | docSpace',
    seoDescription: 'Transform photos, receipts, scans, and graphic images into a consolidated PDF file. Fast, free, and completely confidential.',
    steps: [
      { title: 'Select Images', desc: 'Upload JPG, JPEG, or PNG images from your device.' },
      { title: 'Sequence Images', desc: 'Rearrange image cards in the order you want them to appear in the PDF.' },
      { title: 'Build Document', desc: 'Generate your multi-page PDF document and download instantly.' }
    ],
    features: [
      'Supports all standard JPEG and PNG formats.',
      'Automatically matches each page dimension to the source image dimensions.',
      'Batch conversion of up to 50 photos or documents in one operation.'
    ],
    faqs: [
      { q: 'Are my images compressed when converted?', a: 'Original image byte clarity is preserved without unnecessary downsampling.' },
      { q: 'Can I mix PNG and JPG files together?', a: 'Yes! You can add both formats into a single batch.' }
    ]
  },
  export: {
    id: 'export',
    slug: 'pdf-to-images',
    title: 'PDF to images',
    actionText: 'PDF to images',
    summary: 'Save pages as JPG or PNG',
    hint: 'Export up to 50 selected pages at a time in a ZIP file.',
    icon: exportIcon,
    multiple: false,
    seoTitle: 'Convert PDF to Images Online — Export JPG or PNG | docSpace',
    seoDescription: 'Turn PDF document pages into high-resolution JPG or PNG image files. Download all rendered pages in a clean, organized ZIP.',
    steps: [
      { title: 'Upload PDF', desc: 'Choose the PDF you wish to convert into image files.' },
      { title: 'Select Format & Pages', desc: 'Choose PNG or JPG format, and specify which pages to render.' },
      { title: 'Download ZIP', desc: 'Receive a structured ZIP archive containing every rendered page image.' }
    ],
    features: [
      'High-fidelity canvas rasterization powered by PDF.js.',
      'Choice between lossless PNG or lightweight JPG compression.',
      'Selective page export allows targeting only the graphics you need.'
    ],
    faqs: [
      { q: 'Which format should I choose: PNG or JPG?', a: 'Choose PNG for clean vector text, logos, and diagrams; choose JPG for photographs and complex scanned pages.' },
      { q: 'Is there a limit on how many pages I can export?', a: 'Up to 50 pages can be exported per batch to guarantee high performance on device memory.' }
    ]
  },
  compress: {
    id: 'compress',
    slug: 'compress-pdf',
    title: 'Compress scan',
    actionText: 'Compress scan',
    summary: 'Reduce the size of scanned PDFs',
    hint: 'Re-encode up to 50 pages as lower-resolution images. The new PDF loses selectable text, links, forms, and annotations.',
    icon: compressIcon,
    multiple: false,
    seoTitle: 'Compress Scanned PDF Online Free — Reduce PDF Size | docSpace',
    seoDescription: 'Significantly reduce the file size of heavy scanned PDF documents locally on your device. Downloads only if the file size is reduced.',
    steps: [
      { title: 'Select Scanned PDF', desc: 'Choose a large scanned document that exceeds your email or portal limit.' },
      { title: 'Optimize In-Browser', desc: 'docSpace re-encodes scanned bitmap pages with efficient compression.' },
      { title: 'Download Smaller PDF', desc: 'Compare sizes and download your lightweight PDF file.' }
    ],
    features: [
      'Intelligent compression safeguard: downloads only if the output is genuinely smaller than the original.',
      'Ideal for heavy receipts, contracts, government forms, and archival scans.',
      'No cloud processing: your sensitive legal and personal records remain strictly on your machine.'
    ],
    faqs: [
      { q: 'Why did compression report no smaller file?', a: 'If your PDF is already heavily optimized, compressing further might increase size. docSpace guarantees it never delivers a larger file.' },
      { q: 'Does compression preserve selectable text?', a: 'Scanned compression re-encodes pages as optimized raster images, so interactive form fields and selectable text are omitted in this mode.' }
    ]
  },
  docx: {
    id: 'docx',
    slug: 'word-to-pdf',
    title: 'Word to PDF',
    actionText: 'Word to PDF',
    summary: 'Export DOCX text as PDF',
    hint: 'Create a plain-text PDF from a DOCX file. Formatting and images are omitted. Supports Western European characters.',
    icon: docxIcon,
    accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    kind: 'DOCX',
    multiple: false,
    seoTitle: 'Convert Word DOCX to PDF Online Free — Private & Fast | docSpace',
    seoDescription: 'Convert Microsoft Word DOCX files to clean, searchable PDF documents directly in your browser with zero document uploads.',
    steps: [
      { title: 'Select Word Document', desc: 'Pick your .docx file from your device.' },
      { title: 'Extract & Typeset', desc: 'docSpace parses XML paragraphs and renders crisp PDF pages locally.' },
      { title: 'Download PDF', desc: 'Save your freshly created PDF document instantly.' }
    ],
    features: [
      'Pure client-side XML extraction: zero transmission of proprietary corporate or personal Word files.',
      'Automatic page budgeting and clean typography formatting.',
      'Instant processing with zero wait times.'
    ],
    faqs: [
      { q: 'Does Word to PDF preserve images and tables?', a: 'This tool extracts clean text and paragraph structures. Complex tables and embedded images are omitted for reliable browser typesetting.' },
      { q: 'Are older .doc files supported?', a: 'Standard modern .docx files (Office 2007+) are supported.' }
    ]
  },
  word: {
    id: 'word',
    slug: 'pdf-to-word',
    title: 'PDF to Word',
    actionText: 'Export editable text',
    summary: 'Export editable text to DOCX',
    hint: 'Convert selectable text into a Word document. Scanned pages and original layout are outside this conversion.',
    icon: wordIcon,
    multiple: false,
    seoTitle: 'Convert PDF to Word DOCX Online — Extract Editable Text | docSpace',
    seoDescription: 'Transform selectable PDF document text into an editable Microsoft Word .docx file with paragraph breaks intact.',
    steps: [
      { title: 'Upload PDF', desc: 'Select the PDF containing selectable text that you need to edit.' },
      { title: 'Extract Text Stream', desc: 'PDF.js extracts textual characters, font baselines, and page breaks in-memory.' },
      { title: 'Download DOCX', desc: 'Open your generated .docx document in Microsoft Word, Google Docs, or LibreOffice.' }
    ],
    features: [
      'Generates fully editable Microsoft Word .docx files compatible with all modern office suites.',
      'Preserves multi-page structural page breaks and paragraph flows.',
      '100% private: ideal for confidential contracts, NDAs, and manuscripts.'
    ],
    faqs: [
      { q: 'Can this convert scanned images of text to Word?', a: 'The document must contain selectable text characters. Scanned image-only PDFs require OCR first.' },
      { q: 'Can I edit the output in Google Docs?', a: 'Yes! The generated DOCX file can be opened directly in Google Docs, Word, or Pages.' }
    ]
  },
  watermark: {
    id: 'watermark', slug: 'watermark-pdf', title: 'Watermark PDF',
    summary: 'Mark selected pages with text', icon: stampIcon,
    hint: 'Add a translucent centered watermark to selected pages. Supports unrotated PDFs and Western European text.',
    steps: [
      { title: 'Choose a PDF', desc: 'Your document stays on this device.' },
      { title: 'Enter your watermark', desc: 'Choose the text and page range.' },
      { title: 'Save your PDF', desc: 'Download the marked copy or continue in another tool.' }
    ],
    faqs: [{ q: 'Does a watermark protect the document?', a: 'It adds a visible label. It does not restrict copying or editing.' }]
  },
  numbers: {
    id: 'numbers', slug: 'page-numbers', title: 'Page numbers',
    summary: 'Number selected PDF pages', icon: numbersIcon,
    hint: 'Place page numbers at the bottom center. Choose a range and a starting number. Supports unrotated PDFs.',
    steps: [
      { title: 'Choose a PDF', desc: 'Open an unrotated PDF.' },
      { title: 'Set the numbering', desc: 'Enter a starting number and optionally choose pages.' },
      { title: 'Save the numbered copy', desc: 'Download or continue with another PDF tool.' }
    ],
    faqs: [{ q: 'How are selected pages numbered?', a: 'Numbers increment in the order of your selected range, starting at the number you enter.' }]
  }
};

export const defaultToolId = 'merge';

export function getToolBySlugOrId(key) {
  if (!key) return undefined;
  if (Object.hasOwn(tools, key)) return tools[key];
  const found = Object.values(tools).find(t => t.slug === key);
  return found;
}

