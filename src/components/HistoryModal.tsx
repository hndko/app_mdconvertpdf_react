import { useState } from 'react';
import { History, X, Trash2, FileText, Download } from 'lucide-react';
import type { HistoryItem } from '../types';
import { getHistory, deleteHistoryItem, clearHistory } from '../utils/storage';
import './HistoryModal.css';

interface HistoryModalProps {
  onSelectHistory: (markdown: string) => void;
  onClose: () => void;
}

export function HistoryModal({ onSelectHistory, onClose }: HistoryModalProps) {
  const [items, setItems] = useState<HistoryItem[]>(getHistory());
  const [search, setSearch] = useState('');

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(deleteHistoryItem(id));
  };

  const handleClearAll = () => {
    if (window.confirm('Hapus seluruh riwayat dokumen lokal?')) {
      setItems(clearHistory());
    }
  };

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.markdown.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="history-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header__title">
            <History className="modal-header__icon" />
            <h3>Riwayat Dokumen</h3>
          </div>
          <button className="modal-header__close" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        <div className="history-search">
          <input
            type="text"
            placeholder="Cari riwayat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="history-search__input"
          />
          {items.length > 0 && (
            <button className="history-clear-btn" onClick={handleClearAll}>
              <Trash2 size={14} /> Bersihkan
            </button>
          )}
        </div>

        <div className="history-list">
          {filtered.length === 0 ? (
            <div className="history-empty">
              <FileText size={36} className="history-empty__icon" />
              <p>Belum ada riwayat dokumen tersimpan.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="history-item"
                onClick={() => {
                  onSelectHistory(item.markdown);
                  onClose();
                }}
              >
                <div className="history-item__info">
                  <h4 className="history-item__title">{item.title}</h4>
                  <span className="history-item__date">{item.updatedAt}</span>
                </div>
                <div className="history-item__actions">
                  <button
                    className="history-action-btn history-action-btn--load"
                    title="Buka Dokumen"
                  >
                    <Download size={14} /> Buka
                  </button>
                  <button
                    className="history-action-btn history-action-btn--delete"
                    onClick={(e) => handleDelete(item.id, e)}
                    title="Hapus Riwayat"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
