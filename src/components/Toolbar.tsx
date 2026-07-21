import { useRef, useState } from 'react';
import {
  Upload,
  Trash2,
  Settings,
  Download,
  History,
  LayoutTemplate,
  Link2,
  ChevronDown,
  FileCode,
  Globe,
  FileText,
} from 'lucide-react';
import './Toolbar.css';

interface ToolbarProps {
  onUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onToggleSettings: () => void;
  onExportPdf: () => void;
  onExportMarkdown: () => void;
  onExportHtml: () => void;
  onOpenHistory: () => void;
  onOpenTemplates: () => void;
  onOpenImportUrl: () => void;
  isSettingsOpen: boolean;
}

export function Toolbar({
  onUploadFile,
  onClear,
  onToggleSettings,
  onExportPdf,
  onExportMarkdown,
  onExportHtml,
  onOpenHistory,
  onOpenTemplates,
  onOpenImportUrl,
  isSettingsOpen,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

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
          onClick={onOpenImportUrl}
          title="Impor dari URL publik"
          id="btn-import-url"
        >
          <Link2 className="toolbar-btn__icon" />
          <span className="toolbar-btn__label">Impor URL</span>
        </button>

        <button
          className="toolbar-btn"
          onClick={onOpenTemplates}
          title="Pilih Preset Template"
          id="btn-templates"
        >
          <LayoutTemplate className="toolbar-btn__icon" />
          <span className="toolbar-btn__label">Template</span>
        </button>

        <button
          className="toolbar-btn"
          onClick={onOpenHistory}
          title="Riwayat Dokumen Saya"
          id="btn-history"
        >
          <History className="toolbar-btn__icon" />
          <span className="toolbar-btn__label">Riwayat</span>
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

      {/* Multi-Format Export Dropdown */}
      <div className="export-dropdown-container">
        <button
          className="toolbar-btn toolbar-btn--primary"
          onClick={onExportPdf}
          title="Unduh sebagai PDF"
          id="btn-export-pdf"
        >
          <Download className="toolbar-btn__icon" />
          <span className="toolbar-btn__label">Unduh PDF</span>
        </button>
        <button
          className="toolbar-btn toolbar-btn--primary toolbar-btn--dropdown-trigger"
          onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
          title="Opsi Ekspor Lainnya"
        >
          <ChevronDown size={14} />
        </button>

        {isExportMenuOpen && (
          <div className="export-menu">
            <button
              className="export-menu__item"
              onClick={() => {
                onExportPdf();
                setIsExportMenuOpen(false);
              }}
            >
              <FileText size={14} /> Dokument PDF (.pdf)
            </button>
            <button
              className="export-menu__item"
              onClick={() => {
                onExportMarkdown();
                setIsExportMenuOpen(false);
              }}
            >
              <FileCode size={14} /> Raw Markdown (.md)
            </button>
            <button
              className="export-menu__item"
              onClick={() => {
                onExportHtml();
                setIsExportMenuOpen(false);
              }}
            >
              <Globe size={14} /> Webpage HTML (.html)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
