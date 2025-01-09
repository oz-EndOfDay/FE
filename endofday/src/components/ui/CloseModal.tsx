import SmallButton from "./SmallButton";
import Heading from "./Heading";
import Image from "next/image";

interface CloseModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    subTitle?: string;
    subContent?: React.ReactNode;
}

const CloseModal: React.FC<CloseModalProps> = ({title, onClose, children, subTitle, subContent}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity">
            <div className="bg-white min-h-[18.75rem] max-h-[80%] text-center overflow-y-auto p-6 rounded-lg shadow-md w-96 transform opacity-100 transition-all duration-300 ease-in-out">
                <Heading
                    tag="h2"
                    className="mb-4"
                >
                    {title}
                </Heading>
                <div className="mb-6">{children}</div>
                <Heading
                    tag="h2"
                    className="mb-4"
                >
                    {subTitle}
                </Heading>
                <div className="mb-6">{subContent}</div>
                <div className="flex justify-center">
                    <SmallButton
                        onClick={onClose}
                        variant="icon"
                    >
                        <Image
                            src="/icons/cancel.svg"
                            alt="닫기버튼"
                            width={24}
                            height={24}
                        />
                    </SmallButton>
                </div>
            </div>
        </div>
    );
};

export default CloseModal;
