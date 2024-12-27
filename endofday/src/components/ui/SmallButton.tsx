type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    variant?: "navy" | "sand" | "text" | "icon";
};

const SmallButton: React.FC<ButtonProps> = ({onClick, children, className, type = "button", variant = "navy"}) => {
    const buttonStyles = {
        navy: "bg-navy text-white hover:shadow-sm", // 네이비
        sand: "bg-sand text-brown hover:shadow-sm", // 갈색
        text: "bg-transparent text-base hover:underline !font-normal !text-base", // 텍스트버튼
        icon: "bg-transparent", // 아이콘버튼
    };
    return variant === "icon" ? (
        // `variant`가 `icon`일 경우
        <button
            onClick={onClick}
            type={type}
            className={`absolute top-2 right-2 ${className}`}
        >
            {children}
        </button>
    ) : (
        // 일반 버튼
        <button
            onClick={onClick}
            type={type}
            className={`${buttonStyles[variant]} px-2 py-1 text-sm rounded-lg w-auto transition duration-300 ease-in-out ${className}`}
        >
            {children}
        </button>
    );
};

export default SmallButton;
