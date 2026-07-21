import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileText, Copy, Check } from 'lucide-react';
import './Preview.css';

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
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const codeString = String(children).replace(/\n$/, '');

              if (match) {
                return (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
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
