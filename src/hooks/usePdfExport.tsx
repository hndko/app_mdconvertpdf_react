import { useCallback } from 'react';
import type { AppSettings } from '../types';
import { registerPdfFonts } from '../utils/pdfFonts';

interface UsePdfExportOptions {
  settings: AppSettings;
}

/**
 * Ekstrak heading H1 pertama dari markdown untuk dijadikan nama file PDF.
 */
function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  const text = match?.[1]?.trim().replace(/[<>:"/\\|?*]/g, '').substring(0, 80);
  return text || 'document';
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function usePdfExport({ settings }: UsePdfExportOptions) {
  const exportPdf = useCallback(
    async (markdown: string) => {
      registerPdfFonts();
      const fileName = `${extractTitle(markdown)}.pdf`;
      const [{ pdf }, { PdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../components/PdfDocument'),
      ]);
      const blob = await pdf(
        <PdfDocument markdown={markdown} settings={settings} fileName={fileName} />
      ).toBlob();
      downloadBlob(blob, fileName);
    },
    [settings]
  );

  return { exportPdf };
}
