export interface AppSettings {
  paperSize: 'A4' | 'Letter';
  printTheme: 'default' | 'github' | 'minimal';
  showPageNumbers: boolean;
}

export type MobileTab = 'editor' | 'preview';
