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

    function findClosestWrapper(
        node: Node,
        predicate: (el: HTMLElement) => boolean
    ): HTMLElement | null {
        let current: Node | null = node;

        while (current) {
            if (
                current.nodeType === Node.ELEMENT_NODE &&
                predicate(current as HTMLElement)
            ) {
                return current as HTMLElement;
            }
            current = current.parentNode;
        }

        return null;
    }

    function normalize(root: HTMLElement) {
        root.normalize(); // scala text nodes

        root.querySelectorAll('b b').forEach(el => unwrap(el as HTMLElement));
        root.querySelectorAll('i i').forEach(el => unwrap(el as HTMLElement));
    }

    const wrapSelection = (tag: 'b' | 'i' | 'div', attrs?: Record<string, string>) => () => {

        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;

        const range = sel.getRangeAt(0);
        if (range.collapsed) return;

        if (isSelectionInTag(tag)) {

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

    const toggleCustomDiv = (attrs: {
        className: string;
        [key: string]: string;
    }) => () => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
            console.log('no selection');
            return;
        }

        const range = sel.getRangeAt(0);
        if (range.collapsed) {
            console.log('collapsed');
            //return;
        }

        const wrapper = findClosestWrapper(
            sel.anchorNode!,
            el =>
                el.tagName === 'DIV' &&
                el.classList.contains(attrs.className)
        );


        if (wrapper) {
            unwrap(wrapper);
            return;
        }

        const div = document.createElement('div');

        Object.entries(attrs).forEach(([k, v]) => {
            if (k === 'className') div.className = v;
            else div.setAttribute(k, v);
        });

        //div.contentEditable = 'false';
        div.innerHTML = '&nbsp;';

        if (range.collapsed) {
            //div.appendChild(range.commonAncestorContainer);
            range.insertNode(div);
        } else {

            div.appendChild(range.extractContents());
            range.insertNode(div);
        }

        // const p = document.createElement('p');
        // p.innerHTML = '&nbsp;';
        // div.after(p);

        // const newRange = document.createRange();
        // newRange.setStart(p, 0);
        // newRange.collapse(true);

        sel.removeAllRanges();
        // sel.addRange(newRange);
        normalize(contentRef.current!)
    }

    return (
        <div className="html-editor">
            <h5 className='html-editor__header'>Edytor treści</h5>

            <div>
                <ButtonGroup>
                    <Button type="button" onClick={wrapSelection('b')}>Bold</Button>
                    <Button type="button" onClick={wrapSelection('i')}>Italic</Button>
                    <Button type="button" onClick={toggleCustomDiv({
                        className: 'placeholder',
                        'data-type': 'invoice_number',
                    })}>Custom</Button>
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