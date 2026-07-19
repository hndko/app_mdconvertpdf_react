import { useState, useRef, useCallback, useEffect } from 'react';
import { Code2, Eye, Upload, X } from 'lucide-react';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { MobileTabSwitch } from './components/MobileTabSwitch';
import { SettingsPanel } from './components/SettingsPanel';
import { useDebounce } from './hooks/useDebounce';
import { useFileUpload } from './hooks/useFileUpload';
import { usePdfExport } from './hooks/usePdfExport';
import { DEFAULT_MARKDOWN } from './utils/defaultMarkdown';
import type { AppSettings, MobileTab } from './types';
import './App.css';

function App() {
  // ===== State =====
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [activeTab, setActiveTab] = useState<MobileTab>('editor');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({
    paperSize: 'A4',
    printTheme: 'default',
    showPageNumbers: false,
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const debouncedMarkdown = useDebounce(markdown, 300);

  // ===== Responsive Detection =====
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ===== File Upload =====
  const handleFileLoad = useCallback((content: string, _fileName: string) => {
    setMarkdown(content);
    // Pada mobile, switch ke preview setelah upload
    setActiveTab('preview');
  }, []);

  const {
    isDragging,
    error: uploadError,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileInput,
    clearError,
  } = useFileUpload({ onFileLoad: handleFileLoad });

  // ===== PDF Export =====
  const { exportPdf } = usePdfExport({ settings });

  const handleExportPdf = useCallback(() => {
    if (previewRef.current) {
      exportPdf(previewRef.current.innerHTML);
    }
  }, [exportPdf]);

  // ===== Clear Editor =====
  const handleClear = useCallback(() => {
    setMarkdown('');
  }, []);

  return (
    <div
      className="app"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Header />
      <Toolbar
        onUploadFile={handleFileInput}
        onClear={handleClear}
        onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
        onExportPdf={handleExportPdf}
        isSettingsOpen={isSettingsOpen}
      />

      {/* Mobile Tabs */}
      {isMobile && (
        <MobileTabSwitch activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      {/* Content Area */}
      <div className={`app-content ${!isMobile ? 'app-content--split' : ''}`}>
        {/* Editor Panel */}
        {(!isMobile || activeTab === 'editor') && (
          <div className="panel panel--editor">
            {!isMobile && (
              <div className="panel-label">
                <Code2 className="panel-label__icon" />
                <span>Markdown</span>
                <span className="panel-label__dot" />
              </div>
            )}
            <Editor value={markdown} onChange={setMarkdown} />
          </div>
        )}

        {/* Preview Panel */}
        {(!isMobile || activeTab === 'preview') && (
          <div className="panel">
            {!isMobile && (
              <div className="panel-label">
                <Eye className="panel-label__icon" />
                <span>Preview</span>
              </div>
            )}
            <Preview ref={previewRef} markdown={debouncedMarkdown} />
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* Drag & Drop Overlay */}
      {isDragging && (
        <div className="upload-overlay">
          <div className="upload-overlay__content">
            <Upload className="upload-overlay__icon" />
            <p className="upload-overlay__text">Drop file .md di sini</p>
            <p className="upload-overlay__hint">.md, .markdown, atau .txt</p>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {uploadError && (
        <div className="toast" role="alert">
          <span>{uploadError}</span>
          <button className="toast__close" onClick={clearError} aria-label="Tutup">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
