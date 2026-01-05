import React, { useState, useRef } from 'react';


interface HtmlEditorProps {
    initialContent?: string;
    onSave?: (content: string) => void;
}

const HtmlEditor = ({
    initialContent = '',
    onSave = (content: string) => { },
}: HtmlEditorProps) => {
    const [content, setContent] = useState(initialContent);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleInput = () => {
        setContent(contentRef.current?.innerHTML || '');
    };

    const handleSave = async () => {

        if (onSave) {
            onSave(content);
        }

    };

    const handleUndo = () => {
        document.execCommand('undo', false, undefined);
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            <h5>Edytor treści</h5>

            <div
                ref={contentRef}
                contentEditable={true}
                onInput={handleInput}
                suppressContentEditableWarning={true}
                style={{
                    minHeight: '200px',
                    border: '1px solid #eee',
                    padding: '10px',
                    outline: 'none'
                }}
            >
                {initialContent}
            </div>

            <button onClick={handleUndo}>Cofnij (Ctrl+Z)</button>
            <button onClick={handleSave} style={{ marginTop: '10px' }}>
                Zapisz zmiany
            </button>
        </div>
    );
};

export { HtmlEditor };