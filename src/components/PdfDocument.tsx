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

// Hapus node teks whitespace-only di level HAST (final tree sebelum render).
// remark plugin tidak cukup karena remark-rehype bisa memasukkan ulang whitespace.
function rehypeStripWhitespace() {
  const strip = (node: any) => {
    if (!node || !Array.isArray(node.children)) return;
    node.children = node.children.filter(
      (n: any) => !(n.type === 'text' && (!n.value || n.value.trim() === ''))
    );
    node.children.forEach(strip);
  };
  return (tree: any) => strip(tree);
}

// EMOJI REGEX & TWEMOJI INLINE RENDERER
// Converts all UTF-8 emojis into high-resolution Twemoji PNG images so they render clearly in @react-pdf
const EMOJI_REGEX = /([\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|\u2699\uFE0F|\u2699|\u26A1|\u2705|\u2139|\u2714)/gu;

function getEmojiHex(emoji: string): string {
  const codePoints: string[] = [];
  for (const char of emoji) {
    const cp = char.codePointAt(0);
    if (cp && cp !== 0xfe0f) {
      codePoints.push(cp.toString(16));
    }
  }
  return codePoints.join('-');
}

function renderTextWithEmojis(text: string, fontSize: number = 11): any {
  if (!text) return text;

  const parts: any[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  EMOJI_REGEX.lastIndex = 0;
  while ((match = EMOJI_REGEX.exec(text)) !== null) {
    const emoji = match[0];
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    const hex = getEmojiHex(emoji);
    const iconSize = Math.max(10, Math.round(fontSize * 1.05));
    const imageUrl = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${hex}.png`;

    parts.push(
      <Image
        key={`emoji-${matchIndex}-${hex}`}
        src={imageUrl}
        style={{
          width: iconSize,
          height: iconSize,
          marginHorizontal: 1,
        }}
      />
    );

    lastIndex = EMOJI_REGEX.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length === 0 ? text : parts.length === 1 ? parts[0] : parts;
}

function processPdfChildren(children: any, fontSize: number = 11): any {
  if (typeof children === 'string') {
    return renderTextWithEmojis(children, fontSize);
  }
  if (Array.isArray(children)) {
    return children.map((c) => processPdfChildren(c, fontSize));
  }
  if (children && typeof children === 'object' && children.props && children.props.children) {
    return {
      ...children,
      props: {
        ...children.props,
        children: processPdfChildren(children.props.children, fontSize),
      },
    };
  }
  return children;
}

const PAPER_SIZE: Record<AppSettings['paperSize'], 'A4' | 'LETTER'> = {
  A4: 'A4',
  Letter: 'LETTER',
};

export function PdfDocument({ markdown, settings, fileName }: PdfDocumentProps) {
  const theme = getPdfTheme(settings.printTheme);
  const paper = PAPER_SIZE[settings.paperSize];

  const components = {
    h1: ({ children }: any) => <Text style={theme.h1}>{processPdfChildren(children, 22)}</Text>,
    h2: ({ children }: any) => <Text style={theme.h2}>{processPdfChildren(children, 18)}</Text>,
    h3: ({ children }: any) => <Text style={theme.h3}>{processPdfChildren(children, 15)}</Text>,
    h4: ({ children }: any) => <Text style={theme.h4}>{processPdfChildren(children, 13)}</Text>,
    h5: ({ children }: any) => <Text style={theme.h5}>{processPdfChildren(children, 12)}</Text>,
    h6: ({ children }: any) => <Text style={theme.h6}>{processPdfChildren(children, 11)}</Text>,
    p: ({ children }: any) => <Text style={theme.p}>{processPdfChildren(children, 11)}</Text>,
    a: ({ children, href }: any) => (
      <Link src={href} style={theme.a}>
        {processPdfChildren(children, 11)}
      </Link>
    ),
    strong: ({ children }: any) => <Text style={theme.strong}>{processPdfChildren(children, 11)}</Text>,
    em: ({ children }: any) => <Text style={theme.em}>{processPdfChildren(children, 11)}</Text>,
    del: ({ children }: any) => <Text style={theme.del}>{processPdfChildren(children, 11)}</Text>,
    ul: ({ children }: any) => <View style={theme.ul}>{children}</View>,
    ol: ({ children }: any) => <View style={theme.ol}>{children}</View>,
    li: ({ children, index }: any) => {
      const isOrdered = typeof index === 'number';
      const bulletText = isOrdered ? `${index + 1}.` : '•';
      return (
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <Text style={{ width: isOrdered ? 20 : 14, color: '#00838f', fontWeight: 600 }}>
            {bulletText}
          </Text>
          <Text style={[theme.li, { flex: 1 }]} wrap>
            {processPdfChildren(children, 11)}
          </Text>
        </View>
      );
    },
    blockquote: ({ children }: any) => (
      <View style={theme.blockquote}>{processPdfChildren(children, 11)}</View>
    ),
    hr: () => <View style={theme.hr} />,
    code: ({ children, className }: any) => {
      const isBlock = /language-/.test(className || '');
      if (isBlock) {
        return <Text style={theme.pre}>{processPdfChildren(String(children).replace(/\n$/, ''), 10)}</Text>;
      }
      return <Text style={theme.codeInline}>{processPdfChildren(String(children), 10)}</Text>;
    },
    pre: ({ children }: any) => <View>{children}</View>,
    table: ({ children }: any) => <View style={theme.table}>{children}</View>,
    thead: ({ children }: any) => <View>{children}</View>,
    tbody: ({ children }: any) => <View>{children}</View>,
    tr: ({ children }: any) => <View style={{ flexDirection: 'row' }}>{children}</View>,
    th: ({ children }: any) => (
      <View style={[theme.th, { flex: 1 }]}>
        <Text style={{ fontWeight: 600 }}>{processPdfChildren(children)}</Text>
      </View>
    ),
    td: ({ children }: any) => (
      <View style={[theme.td, { flex: 1 }]}>
        <Text>{processPdfChildren(children)}</Text>
      </View>
    ),
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
        size={paper}
        style={{ paddingTop: 24, paddingBottom: 28, paddingHorizontal: 24, ...theme.body }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeStripWhitespace, rehypeSanitize]}
          components={components as any}
        >
          {markdown.trim()}
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
