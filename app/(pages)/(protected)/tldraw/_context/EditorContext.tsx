"use client";

import { createContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Editor } from "tldraw";

type EditorContextType = {
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
};

export const EditorContext = createContext<EditorContextType | null>(null);


export function EditorProvider({ children }: { children: ReactNode }) {
    const [editor, setEditor] = useState<Editor | null>(null);

    const handleSetEditor = (editor: Editor | null) => {
        setEditor(editor);
    }
    
    const value = useMemo(() => ({
        editor,
        setEditor: handleSetEditor,
    }), [editor]);
    
    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
}
