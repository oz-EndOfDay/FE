import React from "react";
import Image from "next/image";
import {Editor} from "@tiptap/react";

interface UploadPhotoProps {
    editor: Editor | null;
    handleUploadPhoto: (files: FileList | null) => Promise<void>;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({handleUploadPhoto}) => {
    return (
        <>
            <button
                type="button"
                className="relative"
            >
                <input
                    type="file"
                    className="absolute top-0 left-0 w-8 h-8 outline-none opacity-0 file:cursor-pointer"
                    accept="image/*"
                    onChange={e => {
                        handleUploadPhoto(e.target.files);
                        e.target.value = "";
                    }}
                />
                <Image
                    src="/icons/photo_icon.svg"
                    alt="photo"
                    width={24}
                    height={24}
                />
            </button>
        </>
    );
};

export default UploadPhoto;
