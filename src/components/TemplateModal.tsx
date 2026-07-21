import { LayoutTemplate, X, Check } from 'lucide-react';
import { DOCUMENT_TEMPLATES } from '../utils/templates';
import './TemplateModal.css';

interface TemplateModalProps {
  onSelectTemplate: (markdown: string) => void;
  onClose: () => void;
}

export function TemplateModal({ onSelectTemplate, onClose }: TemplateModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="template-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header__title">
            <LayoutTemplate className="modal-header__icon" />
            <h3>Pilih Template Dokumen</h3>
          </div>
          <button className="modal-header__close" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        <div className="template-grid">
          {DOCUMENT_TEMPLATES.map((tmpl) => (
            <div key={tmpl.id} className="template-card">
              <div className="template-card__header">
                <span className="template-card__category">{tmpl.category}</span>
                <h4 className="template-card__title">{tmpl.title}</h4>
              </div>
              <p className="template-card__desc">{tmpl.description}</p>
              <button
                className="template-card__btn"
                onClick={() => {
                  onSelectTemplate(tmpl.markdown);
                  onClose();
                }}
              >
                <Check size={14} /> Gunakan Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
