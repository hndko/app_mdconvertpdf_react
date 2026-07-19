import { useRef } from 'react';
import { Upload, Trash2, Settings, Download } from 'lucide-react';
import './Toolbar.css';

interface ToolbarProps {
  onUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onToggleSettings: () => void;
  onExportPdf: () => void;
  isSettingsOpen: boolean;
}

export function Toolbar({
  onUploadFile,
  onClear,
  onToggleSettings,
  onExportPdf,
  isSettingsOpen,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="toolbar" id="app-toolbar">
      <div className="toolbar__group">
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.markdown,.txt"
          onChange={onUploadFile}
          className="toolbar__file-input"
          id="file-upload-input"
          aria-label="Upload file markdown"
        />
        <button
          className="toolbar-btn"
          onClick={() => fileInputRef.current?.click()}
          title="Upload file .md"
          id="btn-upload"
        >
          <Upload className="toolbar-btn__icon" />
          <span className="toolbar-btn__label">Upload .md</span>
        </button>

        <button
          className="toolbar-btn"
          onClick={onClear}
          title="Bersihkan editor"
          id="btn-clear"
        >
          <Trash2 className="toolbar-btn__icon" />
          <span className="toolbar-btn__label">Clear</span>
        </button>
      </div>

      <div className="toolbar__separator" />

      <button
        className={`toolbar-btn ${isSettingsOpen ? 'toolbar-btn--active' : ''}`}
        onClick={onToggleSettings}
        title="Pengaturan PDF"
        id="btn-settings"
      >
        <Settings className="toolbar-btn__icon" />
        <span className="toolbar-btn__label">Settings</span>
      </button>

      <div className="toolbar__spacer" />

      <button
        className="toolbar-btn toolbar-btn--primary"
        onClick={onExportPdf}
        title="Unduh sebagai PDF"
        id="btn-export-pdf"
      >
        <Download className="toolbar-btn__icon" />
        <span className="toolbar-btn__label">Unduh PDF</span>
      </button>
    </div>
  );
}
