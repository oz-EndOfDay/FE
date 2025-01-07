import {BounceDot} from "basic-loading";

const Loading = () => {
    const isMobile = window.innerWidth < 640;
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
