// post
export type DiaryEntry = {
    title: string;
    write_date: string;
    weather: string;
    mood: string;
    content: string;
    image: string;
};
// get
export type DiaryListEntry = {
    id: number;
    title: string;
    write_date: string;
    content: string;
    img_url?: string; // 교환일기
};

export type DiaryDetailEntry = {
    id: number;
    title: string;
    sender?: string; // 교환일기
    write_date: string;
    weather: string;
    mood: string;
    content: string;
    img_url: string;
};
// 기분
export type MoodItem = {
    id: number;
    path: string;
    value: string;
};

export const MoodItems: MoodItem[] = [
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
// 날씨
export type WeatherItem = {
    id: number;
    path: string;
    value: string;
};

export const WeatherItems: WeatherItem[] = [
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
