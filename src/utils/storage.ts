import type { HistoryItem } from '../types';

const DRAFT_KEY = 'maridocs_draft';
const HISTORY_KEY = 'maridocs_history';
const MAX_HISTORY = 10;

export function getSavedDraft(defaultText: string): string {
  try {
    const saved = localStorage.getItem(DRAFT_KEY);
    return saved !== null ? saved : defaultText;
  } catch {
    return defaultText;
  }
}

export function saveDraft(markdown: string): void {
  try {
    localStorage.setItem(DRAFT_KEY, markdown);
  } catch (err) {
    console.error('Gagal menyimpan draf:', err);
  }
}

export function getHistory(): HistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || 'Dokumen Tanpa Judul';
}

export function saveToHistory(markdown: string): HistoryItem[] {
  if (!markdown.trim()) return getHistory();

  const history = getHistory();
  const title = extractTitle(markdown);
  const newItem: HistoryItem = {
    id: Date.now().toString(),
    title,
    markdown,
    updatedAt: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  // Filter duplikat judul persis
  const filtered = history.filter((item) => item.title !== title);
  const updated = [newItem, ...filtered].slice(0, MAX_HISTORY);

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Gagal menyimpan riwayat:', err);
  }

  return updated;
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  const history = getHistory().filter((item) => item.id !== id);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (err) {
    console.error('Gagal menghapus riwayat:', err);
  }
  return history;
}

export function clearHistory(): HistoryItem[] {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (err) {
    console.error('Gagal membersihkan riwayat:', err);
  }
  return [];
}
