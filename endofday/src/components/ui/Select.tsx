interface SelectProps {
    options: {value: string; label: string}[];
    onChange: (value: string) => void;
    value: string;
    className?: string;
}

const Select: React.FC<SelectProps> = ({options, onChange, value, className}) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="relative inline-flex">
            <select
                value={value}
                onChange={handleChange}
                className={`bg-transparent px-4 py-2 focus:outline-none appearance-none ${className}`}
            >
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none text-xs">▼</div>
        </div>
    );
};

export default Select;
