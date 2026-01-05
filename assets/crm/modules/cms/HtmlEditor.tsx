import React, { useState, useRef, useEffect } from 'react';
import './HtmlEditor.scss';
import { Button, ButtonGroup } from '../../components/SimpleUi';
import DOMPurify from 'dompurify';

interface HtmlEditorProps {
    initialContent?: string;
    onSave?: (content: string) => void;
}

const HtmlEditor = ({
    initialContent = '',
    onSave = (content: string) => { },
}: HtmlEditorProps) => {

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.innerHTML = DOMPurify.sanitize(initialContent);
        }
    }, [initialContent]);

    const handleSave = async () => {

        if (onSave) {
            onSave(contentRef.current?.innerHTML || '');
        }

    };

    const handleUndo = () => {
        document.execCommand('undo', false, undefined);
    };

    function isSelectionInTag(tag: string) {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return false;

        let node = sel.anchorNode as Node | null;

        while (node) {
            if (
                node.nodeType === Node.ELEMENT_NODE &&
                (node as HTMLElement).tagName.toLowerCase() === tag
            ) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    }

    function unwrap(el: HTMLElement) {
        const parent = el.parentNode;
        if (!parent) return;

        while (el.firstChild) {
            parent.insertBefore(el.firstChild, el);
        }

        parent.removeChild(el);
    }

    function normalize(root: HTMLElement) {
        root.normalize(); // scala text nodes

        root.querySelectorAll('b b').forEach(el => unwrap(el as HTMLElement));
        root.querySelectorAll('i i').forEach(el => unwrap(el as HTMLElement));
    }

    const wrapSelection = (tag: 'b' | 'i') => () => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;

        const range = sel.getRangeAt(0);
        if (range.collapsed) return;

        if (isSelectionInTag(tag)) {
            // USUŃ FORMAT
            const nodes: HTMLElement[] = [];
            let node = sel.anchorNode as Node | null;

            while (node) {
                if (
                    node.nodeType === Node.ELEMENT_NODE &&
                    (node as HTMLElement).tagName.toLowerCase() === tag
                ) {
                    nodes.push(node as HTMLElement);
                }
                node = node.parentNode;
            }

            nodes.forEach(unwrap);
            return;
        }


        const wrapper = document.createElement(tag);
        wrapper.appendChild(range.extractContents());
        range.insertNode(wrapper);

        sel.removeAllRanges();
        normalize(contentRef.current!)
    }

    return (
        <div className="html-editor">
            <h5 className='html-editor__header'>Edytor treści</h5>

            <div>
                <ButtonGroup>
                    <Button type="button" onClick={wrapSelection('b')}>Bold</Button>
                    <Button type="button" onClick={wrapSelection('i')}>Italic</Button>
                </ButtonGroup>

                <div className="html-editor__content"
                    ref={contentRef}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                ></div>
            </div>
            <ButtonGroup>
                <Button type="button" onClick={handleUndo}>Cofnij</Button>
                <Button type="button" onClick={handleSave}>Zapisz zmiany</Button>
            </ButtonGroup>
        </div>
    );
};

export { HtmlEditor };