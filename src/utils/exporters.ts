function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  const text = match?.[1]?.trim().replace(/[<>:"/\\|?*]/g, '').substring(0, 80);
  return text || 'document';
}

export function exportAsMarkdown(markdown: string) {
  const title = extractTitle(markdown);
  downloadFile(markdown, `${title}.md`, 'text/markdown;charset=utf-8');
}

export function exportAsText(markdown: string) {
  const title = extractTitle(markdown);
  downloadFile(markdown, `${title}.txt`, 'text/plain;charset=utf-8');
}

export function exportAsHtml(markdown: string) {
  const title = extractTitle(markdown);
  const previewDom = document.querySelector('.markdown-body');
  const innerHtml = previewDom ? previewDom.innerHTML : '';

  const fullHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.7;
      color: #1e293b;
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
      background-color: #ffffff;
    }
    h1, h2, h3, h4, h5, h6 { color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
    code { background: #f1f5f9; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
    pre { background: #1e1e2e; color: #cdd6f4; padding: 16px; border-radius: 8px; overflow-x: auto; }
    pre code { background: transparent; color: inherit; padding: 0; }
    blockquote { border-left: 4px solid #0284c7; background: #f0f9ff; margin: 0 0 16px 0; padding: 12px 18px; color: #334155; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    th, td { border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; }
    th { background: #f1f5f9; color: #0f172a; }
    tr:nth-child(even) { background: #f8fafc; }
    a { color: #0284c7; text-decoration: none; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="markdown-body">
    ${innerHtml}
  </div>
</body>
</html>`;

  downloadFile(fullHtml, `${title}.html`, 'text/html;charset=utf-8');
}
