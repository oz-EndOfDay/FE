import React from "react";
import Image from "next/image";
import {Editor} from "@tiptap/react";

interface ToolBarProps {
    editor: Editor | null;
}

const ToolBar: React.FC<ToolBarProps> = ({editor}) => {
    if (!editor) return null;

    return (
        <div className="flex items-center justify-center gap-2 p-6 py-3 border-b-2 sm:gap-8">
            <div className="flex items-center justify-center gap-2">
                <button onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}>
                    <Image
                        src="/icons/h1_icon.svg"
                        alt="h1"
                        width={24}
                        height={24}
                    />
                </button>
                <button onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}>
                    <Image
                        src="/icons/h2_icon.svg"
                        alt="h2"
                        width={24}
                        height={24}
                    />
                </button>
                <button onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}>
                    <Image
                        src="/icons/h3_icon.svg"
                        alt="h3"
                        width={24}
                        height={24}
                    />
                </button>
            </div>
            <div className="flex items-center justify-center gap-2">
                <button onClick={() => editor.chain().focus().toggleBold().run()}>
                    <Image
                        src="/icons/bold_icon.svg"
                        alt="bold"
                        width={24}
                        height={24}
                    />
                </button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <Image
                        src="/icons/italic_icon.svg"
                        alt="italic"
                        width={24}
                        height={24}
                    />
                </button>
                <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                    <Image
                        src="/icons/code_icon.svg"
                        alt="code"
                        width={24}
                        height={24}
                    />
                </button>
            </div>

            <div className="flex items-center justify-center gap-2">
                <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                    <Image
                        src="/icons/quote_icon.svg"
                        alt="quote"
                        width={24}
                        height={24}
                    />
                </button>
                <button onClick={() => editor.chain().focus().setImage({src: "/example-image-url.jpg"}).run()}>
                    <Image
                        src="/icons/photo_icon.svg"
                        alt="photo"
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </div>
    );
};

export default ToolBar;
