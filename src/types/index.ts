export interface AppSettings {
  paperSize: 'A4' | 'Letter';
  printTheme: 'default' | 'github' | 'minimal';
  showPageNumbers: boolean;
  fontFamily: 'Inter' | 'Merriweather' | 'JetBrains Mono';
  marginSize: 'compact' | 'normal' | 'spacious';
  headerText: string;
  footerText: string;
}

export type MobileTab = 'editor' | 'preview';

export interface HistoryItem {
  id: string;
  title: string;
  markdown: string;
  updatedAt: string;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  markdown: string;
}
