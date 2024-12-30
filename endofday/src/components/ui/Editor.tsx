"use client";

import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import ReactQuill, {ReactQuillProps} from "react-quill";
import {ChangeEvent, useMemo, useRef} from "react";

interface ForwardedQuillComponent extends ReactQuillProps {
    forwardedRef: React.Ref<ReactQuill>;
}

const colors = ["transparent", "white", "red", "yellow", "green", "blue", "purple", "gray", "black"];
const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "link", "color", "image", "background", "align"];

const Editor = dynamic(async () => {
    const {default: QuillComponent} = await import("react-quill");
    const {QuillImageResize} = await import("./QuillImageResize");
    QuillComponent.Quill.register("modules/imageResize", QuillImageResize);

    function ReactQuillComponent({forwardedRef, ...props}: ForwardedQuillComponent) {
        const fileInput = useRef<HTMLInputElement | null>(null);

        async function changeHandler(event: ChangeEvent<HTMLInputElement>) {
            if (fileInput.current?.files) {
                const files: FileList = fileInput.current.files;
                const formData = new FormData();

                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    formData.append("file", file, file.name);
                }
            }

            return;
        }

        const modules = useMemo(
            () => ({
                toolbar: {
                    container: [[{header: [1, 2, 3, 4, 5, 6, false]}], ["bold", "italic", "underline", "strike", "blockquote"], [{align: ["right", "center", "justify"]}], [{list: "ordered"}, {list: "bullet"}], ["link", "image"], [{color: colors}], [{background: colors}]],
                    handlers: {
                        image: () => {
                            fileInput.current?.click();
                        },
                    },
                },
                imageResize: {
                    parchment: QuillComponent.Quill.import("parchment"),
                    modules: ["Resize", "DisplaySize"],
                },
            }),
            []
        );

        return (
            <div>
                <input
                    type="file"
                    ref={fileInput}
                    accept="image/*"
                    onChange={changeHandler}
                    multiple
                    hidden
                />
                <QuillComponent
                    ref={forwardedRef}
                    formats={formats}
                    modules={modules}
                    {...props}
                />
            </div>
        );
    }

    return ReactQuillComponent;
});

export default Editor;
