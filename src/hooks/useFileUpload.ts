import { useCallback, useRef, useState } from 'react';

interface UseFileUploadOptions {
  onFileLoad: (content: string, fileName: string) => void;
  acceptedExtensions?: string[];
}

export function useFileUpload({
  onFileLoad,
  acceptedExtensions = ['.md', '.markdown', '.txt'],
}: UseFileUploadOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dragCounterRef = useRef(0);

  const isValidFile = useCallback(
    (fileName: string) => {
      const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
      return acceptedExtensions.includes(ext);
    },
    [acceptedExtensions]
  );

  const readFile = useCallback(
    (file: File) => {
      if (!isValidFile(file.name)) {
        setError(`Format file tidak didukung. Gunakan: ${acceptedExtensions.join(', ')}`);
        return;
      }

      setError(null);
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          onFileLoad(content, file.name);
        }
      };

      reader.onerror = () => {
        setError('Gagal membaca file. Silakan coba lagi.');
      };

      reader.readAsText(file);
    },
    [isValidFile, acceptedExtensions, onFileLoad]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounterRef.current = 0;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        readFile(files[0]);
      }
    },
    [readFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        readFile(files[0]);
      }
      // Reset input agar file yang sama bisa di-upload ulang
      e.target.value = '';
    },
    [readFile]
  );

  return {
    isDragging,
    error,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileInput,
    clearError: () => setError(null),
  };
}
