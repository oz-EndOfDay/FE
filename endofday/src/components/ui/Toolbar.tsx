import React from "react";
import Image from "next/image";
import {Editor} from "@tiptap/react";
import UploadPhoto from "./UploadPhoto";
interface ToolBarProps {
    editor: Editor | null;
    handleUploadPhoto: (files: FileList | null) => Promise<void>;
}

const ToolBar: React.FC<ToolBarProps> = ({editor, handleUploadPhoto}) => {
    if (!editor) return null;

    return (
        <div className="flex bg-warmgray items-center border-lightgray rounded-tl-lg rounded-tr-lg border justify-center gap-2 p-6 py-3 sm:gap-8">
            <div className="flex items-center justify-center gap-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                >
                    <Image
                        src="/icons/h1_icon.svg"
                        alt="h1"
                        width={24}
                        height={24}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                >
                    <Image
                        src="/icons/h2_icon.svg"
                        alt="h2"
                        width={24}
                        height={24}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                >
                    <Image
                        src="/icons/h3_icon.svg"
                        alt="h3"
                        width={24}
                        height={24}
                    />
                </button>
            </div>
            <div className="flex items-center justify-center gap-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Image
                        src="/icons/bold_icon.svg"
                        alt="bold"
                        width={24}
                        height={24}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Image
                        src="/icons/italic_icon.svg"
                        alt="italic"
                        width={24}
                        height={24}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                    <Image
                        src="/icons/code_icon.svg"
                        alt="code"
                        width={24}
                        height={24}
                    />
                </button>
            </div>

            <div className="flex items-center justify-center gap-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    <Image
                        src="/icons/quote_icon.svg"
                        alt="quote"
                        width={24}
                        height={24}
                    />
                </button>
                <UploadPhoto
                    editor={editor}
                    handleUploadPhoto={handleUploadPhoto}
                />
            </div>
        </div>
    );
};

export default ToolBar;
