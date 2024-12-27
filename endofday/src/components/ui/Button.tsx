type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    variant?: "navy" | "sand" | "gray";
};

const Button: React.FC<ButtonProps> = ({onClick, children, className, type = "button", variant = "navy"}) => {
    const buttonStyles = {
        navy: "bg-navy text-white hover:shadow-lg", // 네이비
        sand: "bg-sand text-brown hover:shadow-lg", // 갈색
        gray: "bg-coolgray text-gray", // 모달버튼용
    };
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${buttonStyles[variant]} font-bold py-3 rounded-lg w-full transition duration-300 ease-in-out ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
