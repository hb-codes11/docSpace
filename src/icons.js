import arrowUp from 'lucide-static/icons/arrow-up.svg?raw';
import arrowDown from 'lucide-static/icons/arrow-down.svg?raw';
import rotate from 'lucide-static/icons/rotate-cw.svg?raw';
import remove from 'lucide-static/icons/x.svg?raw';
import edit from 'lucide-static/icons/crop.svg?raw';
import check from 'lucide-static/icons/check.svg?raw';
import download from 'lucide-static/icons/download.svg?raw';
import share from 'lucide-static/icons/share-2.svg?raw';
import file from 'lucide-static/icons/file-text.svg?raw';
import image from 'lucide-static/icons/image.svg?raw';
import reset from 'lucide-static/icons/undo-2.svg?raw';
import preview from 'lucide-static/icons/eye.svg?raw';
import smartphone from 'lucide-static/icons/smartphone.svg?raw';
import arrowRight from 'lucide-static/icons/arrow-right.svg?raw';
import save from 'lucide-static/icons/folder-down.svg?raw';
import archive from 'lucide-static/icons/file-archive.svg?raw';
import plus from 'lucide-static/icons/plus.svg?raw';
import chevron from 'lucide-static/icons/chevron-down.svg?raw';

export const icons = {
  arrowUp, arrowDown, rotate, remove, edit, check, download, share,
  file, image, reset, preview, smartphone, arrowRight, plus, chevron, save, archive,
};

// Icons repeat a control's visible or accessible label, so keep them decorative.
export function iconMarkup(svg) {
  return svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');
}
