"use client";
import {useParams} from "next/navigation";
import Image from "next/image";
import {useState, useEffect} from "react";
import Heading from "@/components/ui/Heading";
import SmallButton from "@/components/ui/SmallButton";
import Modal from "@/components/ui/Modal";

type DiaryEntry = {
    id: number;
    title: string;
    write_date: string;
    emotion: string;
    content: string;
    image: string;
    weather: string;
    sender: string;
};
// 더미데이터
const diaryEntries: DiaryEntry[] = [
    {
        id: 1,
        title: "12월 25일 일기",
        write_date: "2024-12-25",
        emotion: "보통",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        image: "image1.png",
        weather: "비",
        sender: "나",
    },
    {
        id: 2,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        emotion: "기쁨",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        image: "image2.png",
        weather: "눈",
        sender: "친구",
    },
    {
        id: 3,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        emotion: "좋음",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        image: "image2.png",
        weather: "흐림",
        sender: "친구",
    },
    {
        id: 4,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        emotion: "지침",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        image: "image2.png",
        weather: "흐림",
        sender: "친구",
    },
    {
        id: 5,
        title: "1월 2일 일기",
        write_date: "2025-01-02",
        emotion: "슬픔",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        image: "image2.png",
        weather: "구름조금",
        sender: "나",
    },
    {
        id: 6,
        title: "1월 2일 일기",
        write_date: "2025-01-02",
        emotion: "보통",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        image: "image2.png",
        weather: "비",
        sender: "나",
    },
    {
        id: 7,
        title: "1월 2일 일기",
        write_date: "2025-01-02",
        emotion: "보통",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        image: "image2.png",
        weather: "맑음",
        sender: "친구",
    },
];
// 날짜 변환
const formatDate = (dateString: string): string => {
    const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}`;
};
// 기분 맵핑
type MoodItem = {
    id: number;
    path: string;
    value: string;
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
const getMoodItem = (mood: string): MoodItem => {
    return (
        MoodItems.find(item => item.value === mood) || {
            id: 0,
            path: "/icons/default_mood.png", // 기본 경로
            value: "기본 감정",
        }
    );
};
// 날씨 맵핑
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
const getWeatherItem = (weather: string): WeatherItem => {
    return (
        WeatherItems.find(item => item.value === weather) || {
            id: 0,
            path: "/icons/joy_mood.png",
            value: "기쁨",
        }
    );
};
const ExchangeDiaryDetail = () => {
    const {id} = useParams();
    const [diary, setDiary] = useState<DiaryEntry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [modalState, setModalState] = useState<"confirm" | "success" | "">("");

    useEffect(() => {
        if (id) {
            const entry = diaryEntries.find(entry => entry.id === Number(id));
            if (entry) {
                setDiary(entry);
            } else {
                alert("일기를 찾을 수 없습니다.");
            }
            setIsLoading(false);
        }
    }, [id]);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }
    if (!diary) {
        return <div>일기를 찾을 수 없습니다.</div>;
    }
    const moodItem = getMoodItem(diary.emotion);
    const weatherItem = getWeatherItem(diary.weather);

    const openDeleteConfirmModal = () => setModalState("confirm");
    const closeModal = () => setModalState("");
    const handleDeleteSuccess = () => {
        console.log("삭제 처리 로직 실행 (예: API DELETE 호출)");
        setModalState("success");
    };

    return (
        <div className="diary-detail space-y-4">
            <div className="text-center flex justify-center items-center gap-2 border-b border-gray pb-6">
                <Heading tag="h2">{formatDate(diary.write_date)}</Heading>
                {moodItem && (
                    <div className="w-[3rem] h-[3rem] relative">
                        <Image
                            src={moodItem.path}
                            alt={moodItem.value}
                            fill
                            className="object-contain"
                        />
                    </div>
                )}

                {weatherItem && (
                    <div className="w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] relative">
                        <Image
                            src={weatherItem.path}
                            alt={weatherItem.value}
                            fill
                            className="object-contain"
                        />
                    </div>
                )}
            </div>
            <div className="text-right">
                <SmallButton
                    type="submit"
                    onClick={openDeleteConfirmModal}
                >
                    삭제
                </SmallButton>
            </div>
            <div>
                <p className="mb-2">제목</p>
                <div className="p-3 text-black bg-white border-lightgray border rounded-xl">{diary.title}</div>
            </div>
            <div>
                <p className="mb-2">작성자</p>
                <div className="p-3 text-black bg-white border-lightgray border rounded-xl">{diary.sender}</div>
            </div>
            <div>
                <p className="mb-2">내용</p>
                <div
                    className="p-3 text-black bg-white border-lightgray border rounded-xl"
                    dangerouslySetInnerHTML={{__html: diary.content}}
                />
            </div>
            <div>
                <p className="mb-2">사진</p>
                {diary.image ? (
                    <div
                        className="relative w-full aspect-w-16 aspect-h-9 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto"
                        style={{
                            paddingTop: "56.25%", // 16:9 비율
                        }}
                    >
                        <Image
                            src="/icons/moka.jpeg"
                            alt="dummyImage"
                            fill
                            className="object-cover rounded-xl"
                        />
                    </div>
                ) : (
                    <div className="relative w-full h-[15rem] flex justify-center items-center">
                        <p className="text-gray-500">첨부하신 사진이 없습니다.</p>
                    </div>
                )}
            </div>

            {modalState === "confirm" && (
                <Modal
                    title="교환일기를 삭제하시겠습니까?"
                    description="작성하신 일기는 7일 동안 보관 후 삭제됩니다."
                    onCancel={closeModal}
                    onConfirm={handleDeleteSuccess}
                    cancelText="취소"
                    confirmText="확인"
                />
            )}
            {modalState === "success" && (
                <Modal
                    title="교환일기가 삭제되었습니다"
                    description="삭제하신 일기는 내 정보 > 휴지통에서 보실 수 있으며, 7일 안에 복구 가능합니다."
                    onConfirm={closeModal}
                    confirmText="확인"
                    confirmType={true}
                />
            )}
        </div>
    );
};

export default ExchangeDiaryDetail;
