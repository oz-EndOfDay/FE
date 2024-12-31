import React, {useState} from "react";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import ToolBar from "./Toolbar";
import Image from "next/image";
const TipTapEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false, // StarterKit의 기본 Heading 비활성화
            }),
            Heading.configure({
                levels: [1, 2, 3], // 지원할 Heading 레벨
            }),
            Placeholder.configure({
                placeholder: "내용을 입력해주세요",
            }),
        ],
        editorProps: {
            attributes: {
                class: "prose prose-sm m-5 focus:outline-none",
            },
        },
        // SSR 관련 설정 추가
        editable: true,
        immediatelyRender: false,
    });
    const [preview, setPreview] = useState<string | null>(null); // 미리보기 이미지 URL

    const handleUploadPhoto = async (files: FileList | null) => {
        if (files === null || !editor) return;

        const file = files[0];

        // 미리보기 URL 생성
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result as string); // 미리보기 URL 저장
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="editor">
            <p className="mb-2">내용</p>
            <ToolBar
                editor={editor}
                handleUploadPhoto={handleUploadPhoto}
            />
            <EditorContent
                editor={editor}
                className="border-lightgray rounded-bl-lg rounded-br-lg border bg-white min-h-[18.75rem]"
            />
            {/* 미리보기 이미지 */}
            {preview && (
                <div className="mt-4">
                    <p className="mb-2">미리보기</p>
                    <Image
                        src={preview}
                        alt="미리보기"
                        className="max-w-full h-auto border rounded"
                        width={200}
                        height={200}
                    />
                </div>
            )}
        </div>
    );
};

export default TipTapEditor;
