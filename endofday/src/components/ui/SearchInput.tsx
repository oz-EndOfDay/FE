import React from "react";
import Image from "next/image";

interface SearchInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: () => void;
    className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({placeholder = "제목으로 검색해 보세요", value = "", onChange, onSearch, className = ""}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSearch?.();
        }
    };

    const handleClickSearch = () => {
        onSearch?.();
    };

    return (
        <div className={`w-full max-w-[37.5rem] mx-auto px-4 ${className}`}>
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    className="h-[3rem] w-full pl-4 pr-8 border placeholder:text-gray border-lightgray rounded-3xl focus:outline-none"
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="absolute right-[1rem] top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={handleClickSearch}
                >
                    <Image
                        src="/icons/search.svg"
                        alt="검색버튼"
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </div>
    );
};

export default SearchInput;
