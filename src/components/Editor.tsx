import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';
import './Editor.css';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const darkTheme = EditorView.theme({
  '&': {
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
  },
  '.cm-content': {
    caretColor: 'var(--color-accent-light)',
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: 'var(--color-accent-light)',
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    backgroundColor: 'rgba(124, 58, 237, 0.25)',
  },
  '.cm-gutters': {
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text-muted)',
    border: 'none',
    borderRight: '1px solid var(--color-border)',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'var(--color-surface-hover)',
    color: 'var(--color-text-secondary)',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(124, 58, 237, 0.04)',
  },
});

export function Editor({ value, onChange }: EditorProps) {
  return (
    <div className="editor-wrapper" id="markdown-editor">
      <CodeMirror
        value={value}
        onChange={onChange}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
          EditorView.lineWrapping,
          darkTheme,
        ]}
        placeholder="Ketik Markdown di sini, atau upload file .md..."
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          foldGutter: true,
          bracketMatching: true,
          indentOnInput: true,
          autocompletion: false,
        }}
        height="100%"
        style={{ height: '100%' }}
      />
    </div>
  );
}
