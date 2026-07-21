import { useCallback } from 'react';
import type { AppSettings } from '../types';

interface UsePdfExportOptions {
  settings: AppSettings;
}

export function usePdfExport({ settings }: UsePdfExportOptions) {
  const exportPdf = useCallback(
    async (_markdown: string) => {
      // Tunggu sebentar untuk memastikan DOM selesai update jika diperlukan
      setTimeout(() => {
        window.print();
      }, 100);
    },
    [settings]
  );

  return { exportPdf };
}
