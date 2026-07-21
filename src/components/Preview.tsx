import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileText, Copy, Check } from 'lucide-react';
import mermaid from 'mermaid';
import 'katex/dist/katex.min.css';
import './Preview.css';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif',
});

function MermaidDiagram({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    if (containerRef.current) {
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
      mermaid
        .render(id, code)
        .then(({ svg }) => {
          if (isMounted && containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        })
        .catch(() => {
          if (isMounted && containerRef.current) {
            containerRef.current.innerHTML = `<pre class="mermaid-error">${code}</pre>`;
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [code]);

  return <div ref={containerRef} className="mermaid-container" />;
}

// Custom rehype sanitize schema to allow KaTeX classes and inline styles
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': ['className', 'style', 'span', 'math'],
    span: ['className', 'style', 'aria-hidden'],
  },
};

interface PreviewProps {
  markdown: string;
}

export function Preview({ markdown }: PreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!markdown.trim()) {
    return (
      <div className="preview" id="markdown-preview">
        <div className="preview__empty">
          <FileText className="preview__empty-icon" />
          <p className="preview__empty-text">
            Ketik Markdown di editor untuk melihat preview...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="preview" id="markdown-preview">
      <button onClick={handleCopy} className="preview__copy-btn" title="Copy Markdown">
        {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
        <span>{copied ? 'Copied!' : 'Copy'}</span>
      </button>
      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[[rehypeSanitize, sanitizeSchema], rehypeKatex]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const codeString = String(children).replace(/\n$/, '');

              if (match) {
                const lang = match[1];
                if (lang === 'mermaid') {
                  return <MermaidDiagram code={codeString} />;
                }

                return (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={lang}
                    PreTag="pre"
                    customStyle={{
                      margin: 0,
                      padding: '16px 20px',
                      background: '#1e1e2e',
                      fontSize: '13px',
                      lineHeight: '1.6',
                      borderRadius: 0,
                    }}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                );
              }

              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            a({ children, href, ...props }) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
