'use client'
import {useEffect, useState} from "react";
import {BounceDot} from "basic-loading";

const Loading = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        handleResize(); 
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const option = {
        size: isMobile ? 16 : 22,
        color: "#545f71",
    };

    return (
        <div className="flex items-center justify-center h-full">
            <BounceDot option={option} />
        </div>
    );
};
export default Loading;
