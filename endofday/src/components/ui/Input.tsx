import React from "react";

type InputProps = {
  label: string;
  type: string;
  placeholder: string;
  className?: string;
  id: string;
  isWhite?: boolean;
  autocomplete?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      className,
      isWhite = false,
      autocomplete,
      ...rest
    },
    ref
  ) => {
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
          placeholder={placeholder}
          className={`relative p-3 rounded-lg bg-[#F2F4F8] placeholder:text-gray text-black focus:outline-none ${isWhite ? "bg-white border-lightgray border rounded-xl" : ""}`}
          autoComplete={autocomplete}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;
