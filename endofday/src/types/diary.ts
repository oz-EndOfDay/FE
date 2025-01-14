// 조회
export type DiaryQueryParams = {
    word?: string;
    year?: number;
    month?: number;
    page?: number;
    size?: number;
};
export type DiaryResponse = {
    items: DiaryListEntry[];
    total: number;
    page: number;
    size: number;
    pages: number;
};

export type DiaryListEntry = {
    id: number;
    title: string;
    write_date: string;
    content: string;
    created_at?: string; // 교환일기
    author?: string; // 교환일기
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

// 교환일기 조회
export type ExFriendList = {
    id: number;
    is_accept: boolean;
    ex_diary_cnt: number;
    last_ex_date: string; // ISO 형식의 날짜 문자열
    created_at: string; // ISO 형식의 날짜 문자열
    friend_nickname: string;
    friend_profile_img: string;
};
export type ExFriendListResponse = {
    friends: ExFriendList[];
};
export type ExDiaryListEntry = {
    id: number;
    author: string;
    title: string;
    write_date: string;
    content: string;
    created_at: string;
};
export type ExDiaryListResponse = {
    diaries: ExDiaryListEntry[];
};
export type ExDiaryDetailEntry = {
    id: number;
    title: string;
    write_date: string;
    content: string;
    img_url: string;
    created_at: string;
};
// post (일기감정분석, 조언)
export type EmotionAnalysisResponse = {
    diary_id: number;
    diary_analysis_result: string;
    advice_analysis_result: string;
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
        value: "구름 조금",
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
