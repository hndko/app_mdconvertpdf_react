import { useState } from 'react';
import { Link2, X, Download, AlertCircle } from 'lucide-react';
import './ImportUrlModal.css';

interface ImportUrlModalProps {
  onImport: (markdown: string) => void;
  onClose: () => void;
}

export function ImportUrlModal({ onImport, onClose }: ImportUrlModalProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Direct fetch or convert github URL to raw URL if needed
      let fetchUrl = url.trim();
      if (fetchUrl.includes('github.com') && !fetchUrl.includes('raw.githubusercontent.com')) {
        fetchUrl = fetchUrl
          .replace('github.com', 'raw.githubusercontent.com')
          .replace('/blob/', '/');
      }

      const res = await fetch(fetchUrl);
      if (!res.ok) {
        throw new Error(`Gagal mengambil data (HTTP ${res.status})`);
      }

      const text = await res.text();
      if (!text.trim()) {
        throw new Error('Konten dari URL tersebut kosong.');
      }

      onImport(text);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengimpor dari URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="import-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header__title">
            <Link2 className="modal-header__icon" />
            <h3>Impor dari URL Publik</h3>
          </div>
          <button className="modal-header__close" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleFetch} className="import-form">
          <p className="import-form__hint">
            Masukkan URL publik file <code>.md</code> (misalnya Raw GitHub, Gist, atau server publik).
          </p>

          <input
            type="url"
            placeholder="https://raw.githubusercontent.com/user/repo/main/README.md"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="import-form__input"
            required
          />

          {error && (
            <div className="import-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="import-form__actions">
            <button type="button" className="import-btn import-btn--cancel" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="import-btn import-btn--submit" disabled={loading}>
              {loading ? 'Mengambil...' : <><Download size={14} /> Impor Teks</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
