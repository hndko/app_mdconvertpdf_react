import { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileText } from 'lucide-react';
import './Preview.css';

interface PreviewProps {
  markdown: string;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  function Preview({ markdown }, ref) {
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
        <div className="markdown-body" ref={ref}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const codeString = String(children).replace(/\n$/, '');

                if (match) {
                  return (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
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
);
