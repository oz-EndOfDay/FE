import React, {useState} from "react";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import ToolBar from "./Toolbar";
import Image from "next/image";
import Modal from "@/components/ui/Modal";

interface TipTapEditorProps {
    value: string;
    onChange: (content: string) => void;
    onImageAdd: (file: File | null) => void;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({value, onChange, onImageAdd}) => {
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null); // 미리보기 이미지 URL

    const editor = useEditor({
        content: value,
        extensions: [
            StarterKit.configure({
                heading: false,
            }),
            Heading.configure({
                levels: [1, 2, 3],
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
        onUpdate: ({editor}) => {
            const htmlContent = editor.getHTML();
            onChange(htmlContent);
        },
        // SSR 관련 설정 추가
        editable: true,
        immediatelyRender: false,
    });

    const handleUploadPhoto = async (files: FileList | null) => {
        if (files === null || !editor) return;

        const file = files[0];
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

        if (files.length > 1) {
            alert("하나의 파일만 업로드할 수 있습니다.");
            return;
        }
        if (file.size > MAX_SIZE) {
            alert("파일크기는 5MB를 초과할 수 없습니다");
            return;
        }
        if (!ALLOWED_TYPES.includes(file.type)) {
            alert("이미지 파일만 업로드할 수 있습니다.");
            return;
        }

        // 미리보기 URL 생성
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result as string); // 미리보기 URL 저장
        };
        reader.readAsDataURL(file);
        onImageAdd(file);
    };
    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 이벤트 전파 차단
        setConfirmModalOpen(true);
    };
    const confirmDelete = () => {
        setPreview(null);
        onImageAdd(null);
        setConfirmModalOpen(false);
    };
    const cancelDelete = () => {
        setConfirmModalOpen(false);
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
                    <div className="relative inline-flex">
                        <Image
                            src={preview}
                            alt="미리보기"
                            className="max-w-full h-auto border rounded"
                            width={200}
                            height={200}
                        />
                        <button
                            type="button"
                            className="bg-white border absolute top-0 right-0"
                            onClick={e => {
                                handleDeleteClick(e);
                            }}
                        >
                            <Image
                                src="/icons/cancel.svg"
                                alt="닫기버튼"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                    <p className="mt-2 text-sm">사진은 1장만 첨부 가능합니다</p>
                </div>
            )}
            {/* 사진 취소 확인 모달 */}
            {isConfirmModalOpen && (
                <Modal
                    title="파일 첨부를 취소하시겠습니까?"
                    description="이미첨부하신 파일이 삭제됩니다"
                    onCancel={cancelDelete}
                    onConfirm={confirmDelete}
                    cancelText="취소"
                    confirmText="확인"
                />
            )}
        </div>
    );
};

export default TipTapEditor;
