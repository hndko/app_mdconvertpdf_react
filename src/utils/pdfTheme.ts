import type { AppSettings } from '../types';

export interface PdfTheme {
  body: any;
  h1: any;
  h2: any;
  h3: any;
  h4: any;
  h5: any;
  h6: any;
  p: any;
  a: any;
  strong: any;
  em: any;
  del: any;
  ul: any;
  ol: any;
  li: any;
  codeInline: any;
  pre: any;
  blockquote: any;
  hr: any;
  table: any;
  th: any;
  td: any;
  img: any;
  pageNumber: any;
}

const baseText = {
  fontFamily: 'Inter',
  fontSize: 11,
  lineHeight: 1.7,
};

export function getPdfTheme(theme: AppSettings['printTheme']): PdfTheme {
  if (theme === 'github') {
    return {
      body: { ...baseText, color: '#1f2328' },
      h1: { fontFamily: 'Inter', fontSize: 22, fontWeight: 700, marginBottom: 12, paddingBottom: 8, borderBottom: '1pt solid #d1d9e0', color: '#1f2328' },
      h2: { fontFamily: 'Inter', fontSize: 18, fontWeight: 600, marginTop: 22, marginBottom: 10, paddingBottom: 6, borderBottom: '1pt solid #d1d9e0', color: '#1f2328' },
      h3: { fontFamily: 'Inter', fontSize: 15, fontWeight: 600, marginTop: 18, marginBottom: 8, color: '#1f2328' },
      h4: { fontFamily: 'Inter', fontSize: 13, fontWeight: 600, marginTop: 16, marginBottom: 6, color: '#1f2328' },
      h5: { fontFamily: 'Inter', fontSize: 12, fontWeight: 600, marginTop: 14, marginBottom: 6, color: '#1f2328' },
      h6: { fontFamily: 'Inter', fontSize: 11, fontWeight: 600, marginTop: 12, marginBottom: 6, color: '#636c76' },
      p: { ...baseText, color: '#1f2328', marginBottom: 12 },
      a: { color: '#0969da', textDecoration: 'none' },
      strong: { fontWeight: 700, color: '#1f2328' },
      em: { fontStyle: 'italic', color: '#1f2328' },
      del: { textDecoration: 'line-through', color: '#636c76' },
      ul: { marginBottom: 12, paddingLeft: 18 },
      ol: { marginBottom: 12, paddingLeft: 18 },
      li: { ...baseText, marginBottom: 4 },
      codeInline: { fontFamily: 'JetBrains Mono', fontSize: 10, backgroundColor: '#eff1f3', color: '#1f2328', padding: '1pt 3pt', borderRadius: 3 },
      pre: { fontFamily: 'JetBrains Mono', backgroundColor: '#f6f8fa', border: '1pt solid #d1d9e0', borderRadius: 6, padding: 12, marginBottom: 14 },
      blockquote: { borderLeft: '3pt solid #d1d9e0', paddingLeft: 12, marginBottom: 12, color: '#636c76' },
      hr: { borderBottom: '1pt solid #d1d9e0', marginVertical: 16 },
      table: { width: 'auto', marginBottom: 14, fontSize: 10 },
      th: { fontFamily: 'Inter', fontWeight: 600, backgroundColor: '#f6f8fa', border: '1pt solid #d1d9e0', padding: 6, textAlign: 'left' },
      td: { border: '1pt solid #d1d9e0', padding: 6, color: '#1f2328' },
      img: { maxWidth: '100%', marginVertical: 10, borderRadius: 6 },
      pageNumber: { fontFamily: 'Inter', fontSize: 8, color: '#666' },
    };
  }

  if (theme === 'minimal') {
    return {
      body: { fontFamily: 'Georgia', fontSize: 11, lineHeight: 1.8, color: '#333' },
      h1: { fontFamily: 'Helvetica', fontSize: 22, fontWeight: 600, marginBottom: 12, color: '#333' },
      h2: { fontFamily: 'Helvetica', fontSize: 18, fontWeight: 600, marginTop: 22, marginBottom: 10, color: '#333' },
      h3: { fontFamily: 'Helvetica', fontSize: 15, fontWeight: 600, marginTop: 18, marginBottom: 8, color: '#333' },
      h4: { fontFamily: 'Helvetica', fontSize: 13, fontWeight: 600, marginTop: 16, marginBottom: 6, color: '#333' },
      h5: { fontFamily: 'Helvetica', fontSize: 12, fontWeight: 600, marginTop: 14, marginBottom: 6, color: '#333' },
      h6: { fontFamily: 'Helvetica', fontSize: 11, fontWeight: 600, marginTop: 12, marginBottom: 6, color: '#666' },
      p: { fontFamily: 'Georgia', fontSize: 11, lineHeight: 1.8, color: '#333', marginBottom: 12 },
      a: { color: '#333', textDecoration: 'underline' },
      strong: { fontWeight: 700, color: '#333' },
      em: { fontStyle: 'italic', color: '#333' },
      del: { textDecoration: 'line-through', color: '#666' },
      ul: { marginBottom: 12, paddingLeft: 18 },
      ol: { marginBottom: 12, paddingLeft: 18 },
      li: { fontFamily: 'Georgia', fontSize: 11, lineHeight: 1.8, marginBottom: 4 },
      codeInline: { fontFamily: 'JetBrains Mono', fontSize: 10, backgroundColor: '#f5f5f5', color: '#333', padding: '1pt 3pt', borderRadius: 3 },
      pre: { fontFamily: 'JetBrains Mono', borderLeft: '3pt solid #ddd', backgroundColor: '#f9f9f9', padding: 12, marginBottom: 14 },
      blockquote: { borderLeft: '3pt solid #ccc', paddingLeft: 12, marginBottom: 12, color: '#666', fontStyle: 'italic' },
      hr: { borderBottom: '1pt solid #eee', marginVertical: 16 },
      table: { width: 'auto', marginBottom: 14, fontSize: 10 },
      th: { fontFamily: 'Helvetica', fontWeight: 600, border: '1pt solid #ddd', padding: 6, textAlign: 'left' },
      td: { border: '1pt solid #ddd', padding: 6, color: '#333' },
      img: { maxWidth: '100%', marginVertical: 10 },
      pageNumber: { fontFamily: 'Helvetica', fontSize: 8, color: '#666' },
    };
  }

  // default (modern dark-on-light teal accent)
  return {
    body: { ...baseText, color: '#0a1018' },
    h1: { fontFamily: 'Inter', fontSize: 22, fontWeight: 700, marginBottom: 12, paddingBottom: 8, borderBottom: '1pt solid #d0e8f0', color: '#0a1018' },
    h2: { fontFamily: 'Inter', fontSize: 18, fontWeight: 600, marginTop: 22, marginBottom: 10, paddingBottom: 6, borderBottom: '1pt solid #d0e8f0', color: '#0a1018' },
    h3: { fontFamily: 'Inter', fontSize: 15, fontWeight: 600, marginTop: 18, marginBottom: 8, color: '#0a1018' },
    h4: { fontFamily: 'Inter', fontSize: 13, fontWeight: 600, marginTop: 16, marginBottom: 6, color: '#0a1018' },
    h5: { fontFamily: 'Inter', fontSize: 12, fontWeight: 600, marginTop: 14, marginBottom: 6, color: '#0a1018' },
    h6: { fontFamily: 'Inter', fontSize: 11, fontWeight: 600, marginTop: 12, marginBottom: 6, color: '#5e7d8f' },
    p: { ...baseText, color: '#0a1018', marginBottom: 12 },
    a: { color: '#00838f', textDecoration: 'none' },
    strong: { fontWeight: 600, color: '#0a1018' },
    em: { fontStyle: 'italic', color: '#3a5a6a' },
    del: { textDecoration: 'line-through', color: '#999' },
    ul: { marginBottom: 12, paddingLeft: 18 },
    ol: { marginBottom: 12, paddingLeft: 18 },
    li: { ...baseText, marginBottom: 4 },
    codeInline: { fontFamily: 'JetBrains Mono', fontSize: 10, backgroundColor: '#e8f8fa', color: '#00838f', padding: '1pt 3pt', borderRadius: 3 },
    pre: { fontFamily: 'JetBrains Mono', backgroundColor: '#0f1920', color: '#cdd6f4', borderRadius: 6, padding: 12, marginBottom: 14 },
    blockquote: { borderLeft: '3pt solid #00acc1', backgroundColor: '#e8f8fa', padding: 10, marginBottom: 12, color: '#3a5a6a' },
    hr: { borderBottom: '2pt solid #d0e8f0', marginVertical: 16 },
    table: { width: 'auto', marginBottom: 14, fontSize: 10 },
    th: { fontFamily: 'Inter', fontWeight: 600, backgroundColor: '#e8f8fa', border: '1pt solid #d0e8f0', padding: 6, textAlign: 'left' },
    td: { border: '1pt solid #d0e8f0', padding: 6, color: '#0a1018' },
    img: { maxWidth: '100%', marginVertical: 10, borderRadius: 6 },
    pageNumber: { fontFamily: 'Inter', fontSize: 8, color: '#666' },
  };
}
