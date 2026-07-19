import { useCallback } from 'react';
import type { AppSettings } from '../types';
import { generatePrintStyles } from '../utils/printStyles';

interface UsePdfExportOptions {
  settings: AppSettings;
}

/**
 * Ekstrak heading H1 pertama dari konten HTML untuk dijadikan nama file.
 */
function extractTitle(html: string): string {
  const match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (match && match[1]) {
    // Strip tag HTML dari dalam heading
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    // Bersihkan karakter yang tidak valid untuk nama file
    return text.replace(/[<>:"/\\|?*]/g, '').substring(0, 80) || 'document';
  }
  return 'document';
}

export function usePdfExport({ settings }: UsePdfExportOptions) {
  const exportPdf = useCallback(
    (previewHtml: string) => {
      const title = extractTitle(previewHtml);
      const printCss = generatePrintStyles(settings);

      // Buat iframe tersembunyi
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      iframe.style.opacity = '0';
      document.body.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) {
        document.body.removeChild(iframe);
        return;
      }

      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8" />
          <title>${title}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
          <style>${printCss}</style>
        </head>
        <body>
          ${previewHtml}
        </body>
        </html>
      `);
      doc.close();

      // Tunggu font dan gambar loading selesai sebelum print
      iframe.onload = () => {
        const images = doc.getElementsByTagName('img');
        const imagePromises = Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve; // Ignore errors, just proceed
          });
        });

        Promise.all(imagePromises).then(() => {
          setTimeout(() => {
            iframe.contentWindow?.print();
            // Bersihkan setelah print dialog ditutup
            setTimeout(() => {
              document.body.removeChild(iframe);
            }, 1000);
          }, 500);
        });
      };
    },
    [settings]
  );

  return { exportPdf };
}
