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
      const element = document.querySelector('.markdown-body');
      if (!element) return;

      const fileName = `${extractTitle(markdown)}.pdf`;
      const isLightTheme = settings.printTheme === 'github' || settings.printTheme === 'minimal';
      const bgColor = isLightTheme ? '#ffffff' : '#0a0f14';

      const opt = {
        margin: [12, 12, 12, 12],
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false,
          backgroundColor: bgColor
        },
        jsPDF: { 
          unit: 'mm', 
          format: settings.paperSize.toLowerCase(), 
          orientation: 'portrait' 
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      html2pdf().set(opt).from(element).save();
    },
    [settings]
  );

  return { exportPdf };
}

