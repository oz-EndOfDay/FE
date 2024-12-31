import React from "react";
import {useState, useEffect} from "react";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import ToolBar from "./Toolbar";

const TipTapEditor = () => {
    const editor = useEditor({
        extensions: [StarterKit, Image],
        content: "<p>파일 첨부 기능을 테스트하세요.</p>",
        editorProps: {
            attributes: {
                class: "prose prose-sm m-5 focus:outline-none",
            },
        },
        // SSR 관련 설정 추가
        editable: true,
        immediatelyRender: false,
    });
    // 클라이언트 사이드에서만 렌더링되도록 처리
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <div className="p-4">
            <ToolBar editor={editor} />
            <EditorContent
                editor={editor}
                className="border p-4"
            />
        </div>
    );
};

export default TipTapEditor;
