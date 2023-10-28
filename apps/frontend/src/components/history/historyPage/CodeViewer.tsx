import React from 'react';
import { Editor } from "@monaco-editor/react";
import { useTheme } from '@/hook/ThemeContext';

type CodeViewerProps = {
    answer: string;
};

const CodeViewer: React.FC<CodeViewerProps> = ({ answer }) => {
    
    const { isDarkMode } = useTheme();
    
    return (
      <div className=" overflow-y-hidden dark:bg-neutral-800">
        <Editor
          height="100%"
          value={answer}
          theme={isDarkMode ? "vs-dark" : "light"}
          defaultLanguage="javascript"
          options={{ readOnly: true }}
        />
      </div>
    );
}
export default CodeViewer;