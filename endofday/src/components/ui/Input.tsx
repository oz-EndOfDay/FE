type InputProps = {
    label: string;
    type: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    placeholder: string;
    className?: string;
    id: string;
    isWhite?: boolean;
};

const Input: React.FC<InputProps> = ({id, label, type, value, onChange, onClick, placeholder, className, isWhite = false}) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label
                className={`mb-2 text-sm text-gray" ${isWhite ? "!text-base text-black mb-2" : ""}`}
                htmlFor={id}
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onClick={onClick}
                placeholder={placeholder}
                className={`relative p-3 rounded-lg bg-[#F2F4F8] placeholder:text-gray text-black focus:outline-none ${isWhite ? "bg-white border-lightgray border rounded-xl" : ""}`}
            />
        </div>
    );
};

export default Input;
