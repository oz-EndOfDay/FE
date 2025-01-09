import Image from "next/image";
import React from "react";
import {WeatherItems} from "@/types/diary";

type WeatherRadioProps = {
    onChange: (value: string) => void;
    value: string;
    error?: string;
};

const WeatherRadio: React.FC<WeatherRadioProps> = ({onChange, value, error}) => {
    return (
        <div>
            <p className="mb-2">오늘의 날씨</p>
            <div className="weather-radio flex w-full justify-evenly bg-white p-5 rounded-xl border-lightgray border">
                {WeatherItems.map(item => (
                    <label
                        key={item.id}
                        className="flex flex-col justify-center items-center cursor-pointer"
                    >
                        <input
                            type="radio"
                            value={item.value}
                            onChange={() => {
                                onChange(item.value);
                            }}
                            checked={value === item.value}
                            name="weather"
                            className="hidden"
                        />
                        <div className="flex items-center justify-center flex-col">
                            <div className="relative w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem]">
                                <Image
                                    src={item.path}
                                    alt={item.value}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="mt-3">{item.value}</span>
                        </div>
                    </label>
                ))}
            </div>
            {error && <p className="text-red-500 text-sm !mt-2">{error}</p>}
        </div>
    );
};

export default WeatherRadio;
