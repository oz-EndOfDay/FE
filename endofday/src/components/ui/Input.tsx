type InputProps = {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
};

const Input: React.FC<InputProps> = ({label, type, value, onChange, placeholder, className}) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label className="mb-2 text-sm text-gray">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="p-3 rounded-lg bg-[#F2F4F8] text-gray focus:outline-none"
            />
        </div>
    );
};

export default Input;
