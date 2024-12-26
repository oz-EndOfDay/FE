type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    variant?: "navy" | "sand" | "text";
};

const Button: React.FC<ButtonProps> = ({onClick, children, className, type = "button", variant = "navy"}) => {
    const buttonStyles = {
        navy: "bg-navy text-white hover:shadow-lg",
        sand: "bg-sand text-brown hover:shadow-lg",
        text: "bg-transparent text-base hover:underline !font-normal",
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
