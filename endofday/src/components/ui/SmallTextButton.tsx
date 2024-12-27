type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    variant?: "navy" | "sand" | "text";
};

const SmallTextButton: React.FC<ButtonProps> = ({onClick, children, className, type = "button", variant = "navy"}) => {
    const buttonStyles = {
        navy: "bg-navy text-white hover:shadow-sm", // 네이비
        sand: "bg-sand text-brown hover:shadow-sm", // 갈색
        text: "bg-transparent text-base hover:underline !font-normal !text-base", // 텍스트버튼
    };
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${buttonStyles[variant]} px-2 py-1 text-sm rounded-lg w-auto transition duration-300 ease-in-out ${className}`}
        >
            {children}
        </button>
    );
};

export default SmallTextButton;
