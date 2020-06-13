import React from 'react';
import './style.scss';
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-json';

export enum ProgLang {
  graphql = 'graphql',
  json = 'json',
}

export interface ICodeEditorProps {
  className?: string;
  lang: ProgLang;
  value: string;
  onChange: (val: string) => void;
  readOnly?: boolean;
}
const CodeEditor: React.FC<ICodeEditorProps> = ({lang, value, onChange, readOnly}) => {
  return (
    <Editor
      value={value}
      onValueChange={onChange}
      highlight={(cd) => highlight(cd, languages[lang])}
      padding={10}
      readOnly={readOnly}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 13,
        lineHeight: '1.5em',
      }}
    />
  );
};

export default CodeEditor;
