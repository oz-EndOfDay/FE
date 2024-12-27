import SmallButton from "@/components/ui/SmallButton";
import Image from "next/image";
import React from "react";

type WriteButtonProps = {
    disabled?: boolean;
};

const WriteButton: React.FC<WriteButtonProps> = ({disabled = false}) => {
    return (
        <div className="fixed md:bottom-5 md:right-5 bottom-[6rem] right-[2rem]">
            <SmallButton
                disabled={disabled}
                variant="icon"
                className="bg-white w-[3.5rem] h-[3.5rem] md:w-[5rem] md:h-[5rem] border border-lightgray shadow-md rounded-full !static !top-0 !right-0 flex justify-center items-center disabled:bg-gray disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="relative w-[2rem] h-[2rem]">
                    <Image
                        src="/icons/pencil.svg"
                        alt="연필버튼"
                        layout="fill"
                        objectFit="contain"
                        priority
                    />
                </div>
            </SmallButton>
        </div>
    );
};

export default WriteButton;
