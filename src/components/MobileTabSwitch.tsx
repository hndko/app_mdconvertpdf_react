import { Code2, Eye } from 'lucide-react';
import type { MobileTab } from '../types';
import './MobileTabSwitch.css';

interface MobileTabSwitchProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
}

export function MobileTabSwitch({ activeTab, onTabChange }: MobileTabSwitchProps) {
  return (
    <div className="mobile-tabs" id="mobile-tab-switch">
      <button
        className={`mobile-tabs__tab ${activeTab === 'editor' ? 'mobile-tabs__tab--active' : ''}`}
        onClick={() => onTabChange('editor')}
        aria-selected={activeTab === 'editor'}
        role="tab"
        id="tab-editor"
      >
        <Code2 className="mobile-tabs__tab-icon" />
        Editor
      </button>
      <button
        className={`mobile-tabs__tab ${activeTab === 'preview' ? 'mobile-tabs__tab--active' : ''}`}
        onClick={() => onTabChange('preview')}
        aria-selected={activeTab === 'preview'}
        role="tab"
        id="tab-preview"
      >
        <Eye className="mobile-tabs__tab-icon" />
        Preview
      </button>
      <div
        className={`mobile-tabs__indicator ${
          activeTab === 'preview' ? 'mobile-tabs__indicator--preview' : ''
        }`}
      />
    </div>
  );
}
