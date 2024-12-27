type InputProps = {
  label: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  id: string;
  required: boolean;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  className,
  required,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-2 text-sm text-gray" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-3 rounded-lg bg-[#F2F4F8] placeholder:text-gray text-black focus:outline-none"
        required={required}
      />
    </div>
  );
};

export default Input;
