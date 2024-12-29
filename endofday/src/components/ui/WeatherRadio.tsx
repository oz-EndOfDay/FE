import Image from "next/image";
import React from "react";

type WeatherItem = {
    id: number;
    path: string;
    value: string;
};

const WeatherItems: WeatherItem[] = [
    {
        id: 1,
        path: "/icons/sunny.svg",
        value: "맑음",
    },
    {
        id: 2,
        path: "/icons/cloud_sun.svg",
        value: "구름조금",
    },
    {
        id: 3,
        path: "/icons/cloud.svg",
        value: "흐림",
    },
    {
        id: 4,
        path: "/icons/rain.svg",
        value: "비",
    },
    {
        id: 5,
        path: "/icons/snow.svg",
        value: "눈",
    },
];

const WeatherRadio: React.FC = () => {
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
                            name="weather"
                            className="hidden"
                        />
                        <div className="flex items-center justify-center flex-col">
                            <div className="relative w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem]">
                                <Image
                                    src={item.path}
                                    alt={item.value}
                                    layout="fill"
                                    objectFit="contain"
                                    priority
                                />
                            </div>
                            <span className="mt-3">{item.value}</span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default WeatherRadio;
