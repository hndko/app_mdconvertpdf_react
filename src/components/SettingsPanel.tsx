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

          {/* Print Theme */}
          <div className="setting-group">
            <span className="setting-group__label">Tema Cetak</span>
            <p className="setting-group__description">
              Mempengaruhi tampilan font, warna, dan style di output PDF.
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
