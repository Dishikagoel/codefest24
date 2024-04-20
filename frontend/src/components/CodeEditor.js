import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

import { useWindowSize } from "../Hooks/windowSize";
import { handleEditorDidMount } from "../utils/codeEditor.utils";

const CodeEditor = ({ code, setCode }) => {
    const { width } = useWindowSize();
    const [editorHeight, setEditorHeight] = useState("100vh");

    useEffect(() => {
        if (width > 768) {
            setEditorHeight("58vh");
        } else {
            setEditorHeight("58vh");
        }
    }, [width]);
    

    return (
        <Editor
            height={editorHeight}
            width={`70%`}
            
            language="python"
            value={code}
            theme="vs-dark"
            className="text-3xl"
            defaultValue="//Write your code here"
            onMount={handleEditorDidMount}
            onChange={(value) => setCode(value)}
        />
    );
};

export default CodeEditor;
