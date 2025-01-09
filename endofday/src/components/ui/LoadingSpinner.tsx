import React from "react";
import Image from "next/image";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <Image
                src="/icons/loading_spinner.gif"
                alt="로딩스피너"
                width={200}
                height={200}
            />
        </div>
    );
};

export default LoadingSpinner;
