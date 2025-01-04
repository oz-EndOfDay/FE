import Image from "next/image";
import React from "react";

type MoodItem = {
    id: number;
    path: string;
    value: string;
};
type MoodRadioProps = {
    onChange: (value: string) => void;
    value: string;
    error?: string;
};
const MoodItems: MoodItem[] = [
    {
        id: 1,
        path: "/icons/joy_mood.png",
        value: "기쁨",
    },
    {
        id: 2,
        path: "/icons/good_mood.png",
        value: "좋음",
    },
    {
        id: 3,
        path: "/icons/neutral_mood.png",
        value: "보통",
    },
    {
        id: 4,
        path: "/icons/tired_mood.png",
        value: "지침",
    },
    {
        id: 5,
        path: "/icons/sad_mood.png",
        value: "슬픔",
    },
];

const MoodRadio: React.FC<MoodRadioProps> = ({onChange, value, error}) => {
    console.log("MoodRadio 컴포넌트 value 상태:", value);
    return (
        <div>
            <p className="mb-2">오늘의 기분</p>
            <div className="mood-radio flex w-full justify-evenly bg-white p-5 rounded-xl border-lightgray border">
                {MoodItems.map(item => (
                    <label
                        key={item.id}
                        className="flex flex-col justify-center items-center cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="mood"
                            className="hidden"
                            checked={value === item.value}
                            value={item.value}
                            onChange={() => {
                                console.log("item.value:", item.value);
                                console.log("value:", value, "item.value:", item.value);
                                console.log("값 비교:", value === item.value);
                                onChange(item.value); // 상태 변경
                            }}
                        />
                        <div className="flex items-center justify-center flex-col">
                            <div className="relative md:w-[4rem] md:h-[4rem] w-[3rem] h-[3rem]">
                                <Image
                                    src={item.path}
                                    alt={item.value}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="mt-2">{item.value}</span>
                        </div>
                    </label>
                ))}
            </div>
            {error && <p className="text-[#e63946] text-sm !mt-2">{error}</p>}
        </div>
    );
};

export default MoodRadio;
