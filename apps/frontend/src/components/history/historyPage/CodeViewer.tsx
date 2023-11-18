import React from 'react';
import { Editor } from "@monaco-editor/react";
import { useTheme } from '@/hook/ThemeContext';

type CodeViewerProps = {
    answer: string;
};

const CodeViewer: React.FC<CodeViewerProps> = ({ answer }) => {
    
    const { isDarkMode } = useTheme();
    
    return (
      <div className="flex justify-center items-center overflow-y-hidden dark:bg-neutral-800 border border-gray-500 p-5">
        <Editor
          height="50vh"
          value={atob(answer)}
          theme={isDarkMode ? "vs-dark" : "light"}
          defaultLanguage="javascript"
          options={{ readOnly: true }}
        />
      </div>
    );
}
export default CodeViewer;