import { useCallback } from 'react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import type { AppSettings } from '../types';

interface UsePdfExportOptions {
  settings: AppSettings;
}

function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  const text = match?.[1]?.trim().replace(/[<>:"/\\|?*]/g, '').substring(0, 80);
  return text || 'document';
}

export function usePdfExport({ settings }: UsePdfExportOptions) {
  const exportPdf = useCallback(
    async (markdown: string) => {
      const element = document.querySelector('.markdown-body') as HTMLElement | null;
      if (!element) return;

      const fileName = `${extractTitle(markdown)}.pdf`;
      const isDark = settings.printTheme === 'default';
      const exportClass = isDark ? 'export-pdf-dark' : 'export-pdf-light';
      const bgColor = isDark ? '#0a0f14' : '#ffffff';

      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: fileName,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false,
          backgroundColor: bgColor
        },
        jsPDF: { 
          unit: 'mm', 
          format: settings.paperSize.toLowerCase(), 
          orientation: 'portrait' as const 
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      element.classList.add(exportClass);
      try {
        await html2pdf().set(opt).from(element).save();
      } finally {
        element.classList.remove(exportClass);
      }
    },
    [settings]
  );

  return { exportPdf };
}

