import React, { useState, useRef } from 'react';
import { useApiService } from '../../hook/data';

const HtmlEditor = ({ initialContent, onSave }) => {
    const [content, setContent] = useState(initialContent);
    const contentRef = useRef(null);

    const handleInput = () => {
        setContent(contentRef.current.innerHTML);
    };

    const handleSave = async () => {

        if (onSave) {
            onSave(content);
        }

    };

    const handleUndo = () => {
        document.execCommand('undo', false, null);
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            <h3>Edytor treści</h3>

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

export default HtmlEditor;