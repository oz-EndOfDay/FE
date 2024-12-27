import React from "react";

type InputProps = {
  label: string;
  type: string;
  placeholder: string;
  className?: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, type, placeholder, className, ...rest }, ref) => {
    return (
      <div className={`flex flex-col ${className}`}>
        <label className="mb-2 text-sm text-gray" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="p-3 rounded-lg bg-[#F2F4F8] placeholder:text-gray text-black focus:outline-none"
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);
export default Input;
