import SmallButton from "./SmallButton";
import Image from "next/image";

interface SearchInputProps {
    placeholder: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({placeholder = "제목으로 검색해 보세요", value, onChange, className = ""}) => {
    return (
        <div className={`w-full max-w-[37.5rem] mx-auto px-4 ${className}`}>
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    className="h-[3rem] w-full pl-4 pr-8 border placeholder:text-gray border-lightgray rounded-3xl focus:outline-none"
                />
                <div className="absolute right-2 top-1 -translate-y-1/2">
                    <SmallButton
                        variant="icon"
                        className="flex items-center justify-center h-[1.5rem] w-[1.5rem]"
                    >
                        <Image
                            src="/icons/search.svg"
                            alt="검색버튼"
                            width={24}
                            height={24}
                        />
                    </SmallButton>
                </div>
            </div>
        </div>
    );
};

export default SearchInput;
