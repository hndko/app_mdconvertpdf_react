import type { AppSettings } from '../types';

function getPageSize(paperSize: AppSettings['paperSize']): string {
  return paperSize === 'A4' ? 'A4' : 'letter';
}

function getPageNumberStyles(show: boolean): string {
  if (!show) return '';
  return `
    @page {
      @bottom-center {
        content: counter(page);
        font-size: 10px;
        color: #666;
      }
    }
  `;
}

function getThemeStyles(theme: AppSettings['printTheme']): string {
  switch (theme) {
    case 'github':
      return `
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif; color: #1f2328; }
        h1 { padding-bottom: 0.3em; border-bottom: 1px solid #d1d9e0; }
        h2 { padding-bottom: 0.3em; border-bottom: 1px solid #d1d9e0; }
        code { background: #eff1f3; padding: 0.2em 0.4em; border-radius: 6px; font-size: 85%; }
        pre { background: #f6f8fa; border: 1px solid #d1d9e0; border-radius: 6px; }
        pre code { background: transparent; padding: 0; border-radius: 0; font-size: 85%; }
        blockquote { border-left: 4px solid #d1d9e0; color: #636c76; }
        table th { background: #f6f8fa; }
        table td, table th { border: 1px solid #d1d9e0; }
        hr { border: none; border-top: 1px solid #d1d9e0; }
        a { color: #0969da; }
      `;
    case 'minimal':
      return `
        body { font-family: 'Georgia', 'Times New Roman', serif; color: #333; line-height: 1.8; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Helvetica Neue', Arial, sans-serif; font-weight: 600; }
        h1 { font-size: 28px; }
        h2 { font-size: 22px; }
        code { font-family: 'Courier New', monospace; background: #f5f5f5; padding: 0.15em 0.3em; border-radius: 3px; font-size: 90%; }
        pre { background: #f9f9f9; border-left: 3px solid #ddd; border-radius: 0; }
        pre code { background: transparent; padding: 0; border-radius: 0; }
        blockquote { border-left: 3px solid #ccc; color: #666; font-style: italic; }
        table td, table th { border: 1px solid #ddd; }
        table th { font-weight: 600; }
        hr { border: none; border-top: 1px solid #eee; }
        a { color: #333; text-decoration: underline; }
      `;
    default:
      return `
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0a1018; }
        h1, h2, h3, h4, h5, h6 { color: #0a1018; }
        code { background: #e8f8fa; padding: 0.2em 0.4em; border-radius: 4px; font-size: 87%; color: #00838f; }
        pre { background: #0f1920; color: #cdd6f4; border-radius: 8px; }
        pre code { background: transparent; padding: 0; color: inherit; border-radius: 0; }
        blockquote { border-left: 4px solid #00acc1; background: #e8f8fa; color: #3a5a6a; }
        table th { background: #e8f8fa; }
        table td, table th { border: 1px solid #d0e8f0; }
        hr { border: none; border-top: 2px solid #d0e8f0; }
        a { color: #00838f; }
      `;
  }
}

export function generatePrintStyles(settings: AppSettings): string {
  const pageSize = getPageSize(settings.paperSize);

  return `
    @page {
      size: ${pageSize};
      margin: 20mm 18mm;
    }

    ${getPageNumberStyles(settings.showPageNumbers)}

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-size: 14px;
      line-height: 1.7;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    ${getThemeStyles(settings.printTheme)}

    /* Headings */
    h1 { font-size: 26px; margin-top: 0; margin-bottom: 16px; font-weight: 700; line-height: 1.25; }
    h2 { font-size: 22px; margin-top: 28px; margin-bottom: 14px; font-weight: 650; line-height: 1.3; }
    h3 { font-size: 18px; margin-top: 24px; margin-bottom: 12px; font-weight: 600; line-height: 1.35; }
    h4 { font-size: 16px; margin-top: 20px; margin-bottom: 10px; font-weight: 600; line-height: 1.4; }
    h5 { font-size: 14px; margin-top: 18px; margin-bottom: 8px; font-weight: 600; }
    h6 { font-size: 13px; margin-top: 16px; margin-bottom: 8px; font-weight: 600; color: #666; }

    /* Paragraphs */
    p { margin-bottom: 14px; }

    /* Lists */
    ul, ol { margin-bottom: 14px; padding-left: 2em; }
    li { margin-bottom: 4px; }
    li > p { margin-bottom: 4px; }

    /* Code */
    code { font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace; }
    pre { padding: 16px; margin-bottom: 16px; overflow-x: auto; line-height: 1.5; }

    /* Blockquote */
    blockquote { padding: 12px 16px; margin-bottom: 14px; }
    blockquote > p:last-child { margin-bottom: 0; }

    /* Table */
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px; }
    th, td { padding: 8px 12px; text-align: left; }
    th { font-weight: 600; }

    /* Horizontal Rule */
    hr { margin: 24px 0; }

    /* Images */
    img { max-width: 100%; height: auto; margin: 12px 0; }

    /* Links */
    a { text-decoration: none; }

    /* Strong & Emphasis */
    strong { font-weight: 650; }

    /* Strikethrough */
    del { text-decoration: line-through; color: #999; }

    /* Page break control */
    h1, h2, h3, h4, h5, h6 {
      break-after: avoid;
      page-break-after: avoid;
    }

    pre, blockquote, table, img, figure {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    p {
      orphans: 3;
      widows: 3;
    }
  `;
}
