import { Document, Page, Text, View, Image, Link } from '@react-pdf/renderer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import type { AppSettings } from '../types';
import { getPdfTheme } from '../utils/pdfTheme';

interface PdfDocumentProps {
  markdown: string;
  settings: AppSettings;
  fileName: string;
}

// Hapus node teks yang hanya berisi whitespace agar react-pdf tidak error
// ("Invalid '\n' string child outside <Text>"). Tanpa dependency ekstra.
function remarkStripWhitespace() {
  const strip = (node: any) => {
    if (!node || !Array.isArray(node.children)) return;
    node.children = node.children.filter(
      (n: any) => !(n.type === 'text' && (!n.value || n.value.trim() === ''))
    );
    node.children.forEach(strip);
  };
  return (tree: any) => strip(tree);
}

const PAPER_SIZE: Record<AppSettings['paperSize'], { width: string; height: string }> = {
  A4: { width: '210mm', height: '297mm' },
  Letter: { width: '215.9mm', height: '279.4mm' },
};

export function PdfDocument({ markdown, settings, fileName }: PdfDocumentProps) {
  const theme = getPdfTheme(settings.printTheme);
  const paper = PAPER_SIZE[settings.paperSize];

  const components = {
    h1: ({ children }: any) => <Text style={theme.h1}>{children}</Text>,
    h2: ({ children }: any) => <Text style={theme.h2}>{children}</Text>,
    h3: ({ children }: any) => <Text style={theme.h3}>{children}</Text>,
    h4: ({ children }: any) => <Text style={theme.h4}>{children}</Text>,
    h5: ({ children }: any) => <Text style={theme.h5}>{children}</Text>,
    h6: ({ children }: any) => <Text style={theme.h6}>{children}</Text>,
    p: ({ children }: any) => <Text style={theme.p}>{children}</Text>,
    a: ({ children, href }: any) => (
      <Link src={href} style={theme.a}>
        {children}
      </Link>
    ),
    strong: ({ children }: any) => <Text style={theme.strong}>{children}</Text>,
    em: ({ children }: any) => <Text style={theme.em}>{children}</Text>,
    del: ({ children }: any) => <Text style={theme.del}>{children}</Text>,
    ul: ({ children }: any) => <View style={theme.ul}>{children}</View>,
    ol: ({ children }: any) => <View style={theme.ol}>{children}</View>,
    li: ({ children }: any) => (
      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        <Text style={{ width: 14 }}>•</Text>
        <Text style={theme.li} wrap>
          {children}
        </Text>
      </View>
    ),
    blockquote: ({ children }: any) => <View style={theme.blockquote}>{children}</View>,
    hr: () => <View style={theme.hr} />,
    code: ({ children, className }: any) => {
      const isBlock = /language-/.test(className || '');
      if (isBlock) {
        return <Text style={theme.pre}>{String(children).replace(/\n$/, '')}</Text>;
      }
      return <Text style={theme.codeInline}>{children}</Text>;
    },
    pre: ({ children }: any) => <View>{children}</View>,
    table: ({ children }: any) => (
      <View style={theme.table} wrap={false}>
        {children}
      </View>
    ),
    thead: ({ children }: any) => <View>{children}</View>,
    tbody: ({ children }: any) => <View>{children}</View>,
    tr: ({ children }: any) => <View style={{ flexDirection: 'row' }}>{children}</View>,
    th: ({ children }: any) => <View style={theme.th}><Text>{children}</Text></View>,
    td: ({ children }: any) => <View style={theme.td}><Text>{children}</Text></View>,
    img: ({ src, alt }: any) => {
      try {
        return <Image src={src} style={theme.img} />;
      } catch {
        return <Text style={theme.p}>[{alt || 'image'}]</Text>;
      }
    },
  };

  return (
    <Document title={fileName} author="MariDocs">
      <Page
        size={[paper.width, paper.height]}
        style={{ paddingTop: 20, paddingBottom: 20, paddingHorizontal: 18, ...theme.body }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkStripWhitespace]}
          rehypePlugins={[rehypeSanitize]}
          components={components as any}
        >
          {markdown}
        </ReactMarkdown>

        {settings.showPageNumbers && (
          <Text
            style={[theme.pageNumber, { position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center' }]}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
            fixed
          />
        )}
      </Page>
    </Document>
  );
}
