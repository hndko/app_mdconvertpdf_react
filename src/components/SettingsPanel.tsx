import { X } from 'lucide-react';
import type { AppSettings } from '../types';
import './SettingsPanel.css';

interface SettingsPanelProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  onClose: () => void;
}

export function SettingsPanel({ settings, onSettingsChange, onClose }: SettingsPanelProps) {
  const themes: { value: AppSettings['printTheme']; label: string }[] = [
    { value: 'default', label: 'Default (Modern)' },
    { value: 'github', label: 'GitHub Style' },
    { value: 'minimal', label: 'Minimal (Serif)' },
  ];

  return (
    <>
      <div className="settings-overlay" onClick={onClose} />
      <aside className="settings-panel" id="settings-panel" role="dialog" aria-label="Pengaturan PDF">
        <div className="settings-panel__header">
          <h2 className="settings-panel__title">⚙️ Pengaturan PDF</h2>
          <button
            className="settings-panel__close"
            onClick={onClose}
            aria-label="Tutup pengaturan"
            id="btn-close-settings"
          >
            <X size={16} />
          </button>
        </div>

        <div className="settings-panel__body">
          {/* Paper Size */}
          <div className="setting-group">
            <label className="setting-group__label" htmlFor="select-paper-size">
              Ukuran Kertas
            </label>
            <select
              className="setting-select"
              id="select-paper-size"
              value={settings.paperSize}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  paperSize: e.target.value as AppSettings['paperSize'],
                })
              }
            >
              <option value="A4">A4 (210 × 297 mm)</option>
              <option value="Letter">Letter (8.5 × 11 in)</option>
            </select>
          </div>

          {/* Font Family */}
          <div className="setting-group">
            <label className="setting-group__label" htmlFor="select-font-family">
              Font Dokumen
            </label>
            <select
              className="setting-select"
              id="select-font-family"
              value={settings.fontFamily || 'Inter'}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  fontFamily: e.target.value as AppSettings['fontFamily'],
                })
              }
            >
              <option value="Inter">Inter (Sans-Serif Modern)</option>
              <option value="Merriweather">Helvetica / Georgia (Classic Serif)</option>
              <option value="JetBrains Mono">JetBrains Mono (Monospace Code)</option>
            </select>
          </div>

          {/* Margin Size */}
          <div className="setting-group">
            <label className="setting-group__label" htmlFor="select-margin-size">
              Ukuran Margin Kertas
            </label>
            <select
              className="setting-select"
              id="select-margin-size"
              value={settings.marginSize || 'normal'}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  marginSize: e.target.value as AppSettings['marginSize'],
                })
              }
            >
              <option value="compact">Tipis / Compact (15mm)</option>
              <option value="normal">Normal (24mm)</option>
              <option value="spacious">Lebar / Spacious (32mm)</option>
            </select>
          </div>

          {/* Custom Header */}
          <div className="setting-group">
            <label className="setting-group__label" htmlFor="input-header-text">
              Header Custom (Bagian Atas)
            </label>
            <input
              type="text"
              id="input-header-text"
              className="setting-select"
              placeholder="Contoh: Draf Rahasia / Dokumen Resmi"
              value={settings.headerText || ''}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  headerText: e.target.value,
                })
              }
            />
          </div>

          {/* Custom Footer */}
          <div className="setting-group">
            <label className="setting-group__label" htmlFor="input-footer-text">
              Footer Custom (Bagian Bawah)
            </label>
            <input
              type="text"
              id="input-footer-text"
              className="setting-select"
              placeholder="Contoh: Hak Cipta © MariDocs 2026"
              value={settings.footerText || ''}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  footerText: e.target.value,
                })
              }
            />
          </div>

          {/* Print Theme */}
          <div className="setting-group">
            <span className="setting-group__label">Tema Cetak</span>
            <p className="setting-group__description">
              Mempengaruhi warna dan gaya aksen di PDF.
            </p>
            <div className="setting-radio-group">
              {themes.map((theme) => (
                <label
                  key={theme.value}
                  className={`setting-radio ${
                    settings.printTheme === theme.value ? 'setting-radio--active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="printTheme"
                    value={theme.value}
                    checked={settings.printTheme === theme.value}
                    onChange={() =>
                      onSettingsChange({ ...settings, printTheme: theme.value })
                    }
                  />
                  <span className="setting-radio__indicator" />
                  <span className="setting-radio__text">{theme.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Page Numbers */}
          <div className="setting-group">
            <span className="setting-group__label">Nomor Halaman</span>
            <div
              className={`setting-toggle ${settings.showPageNumbers ? 'setting-toggle--active' : ''}`}
              onClick={() =>
                onSettingsChange({
                  ...settings,
                  showPageNumbers: !settings.showPageNumbers,
                })
              }
              role="switch"
              aria-checked={settings.showPageNumbers}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onSettingsChange({
                    ...settings,
                    showPageNumbers: !settings.showPageNumbers,
                  });
                }
              }}
              id="toggle-page-numbers"
            >
              <span className="setting-toggle__label">
                Tampilkan nomor halaman di footer
              </span>
              <span className="setting-toggle__switch" />
            </div>
          </div>
        </div>

        <div className="settings-panel__footer">
          <p className="settings-panel__footer-text">
            Pengaturan diterapkan saat mengunduh PDF.
          </p>
        </div>
      </aside>
    </>
  );
}
