import Button from "./Button";
import Heading from "./Heading";

interface ModalProps {
    title: string;
    description?: string;
    onCancel: () => void;
    onConfirm: () => void;
    cancelText: string;
    confirmText: string;
    confirmType?: boolean;
    Isdescription?: boolean;
}

const Modal: React.FC<ModalProps> = ({title, onCancel, onConfirm, description, cancelText, confirmText, confirmType = false, Isdescription = true}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 transform opacity-100 transition-all duration-300 ease-in-out">
                <Heading
                    tag="h2"
                    className="mb-2 text-xl text-navy"
                >
                    {title}
                </Heading>
                {Isdescription && (
                    <Heading
                        tag="p"
                        className="text-navy mb-6"
                    >
                        {description}
                    </Heading>
                )}
                <div className={`flex justify-between gap-3 ${!Isdescription ? "pt-12" : ""}`}>
                    {confirmType ? (
                        <Button
                            onClick={onConfirm}
                            variant="navy"
                        >
                            {confirmText}
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={onCancel}
                                variant="gray"
                            >
                                {cancelText}
                            </Button>
                            <Button
                                onClick={onConfirm}
                                variant="navy"
                            >
                                {confirmText}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
