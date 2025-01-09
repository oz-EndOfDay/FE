"use client";
import "@/styles/diary.css";
import {useParams} from "next/navigation";
import Image from "next/image";
import {useState, useEffect} from "react";
import Loading from "@/components/ui/Loading";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import SmallButton from "@/components/ui/SmallButton";
import Modal from "@/components/ui/Modal";
import CloseModal from "@/components/ui/CloseModal";
import {DiaryDetailEntry, MoodItem, MoodItems, WeatherItem, WeatherItems} from "@/types/diary";

// 더미데이터
const diaryEntries: DiaryDetailEntry[] = [
    {
        id: 1,
        title: "12월 25일 일기",
        write_date: "2024-12-25",
        weather: "비",
        mood: "보통",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        img_url: "image1.png",
    },
    {
        weather: "눈",
        id: 2,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        mood: "기쁨",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        img_url: "image2.png",
    },
    {
        id: 3,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        weather: "흐림",
        mood: "좋음",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        img_url: "image2.png",
    },
    {
        id: 4,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        weather: "흐림",
        mood: "지침",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        img_url: "image2.png",
    },
    {
        id: 5,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        weather: "구름조금",
        mood: "슬픔",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        img_url: "image2.png",
    },
    {
        id: 6,
        title: "1월 2일 일기",
        write_date: "2025-01-02",
        weather: "비",
        mood: "보통",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        img_url: "image2.png",
    },
    {
        id: 7,
        title: "1월 2일 일기",
        write_date: "2025-01-02",
        weather: "맑음",
        mood: "보통",
        content: "<h1>오늘의 일기..... 재밋다.. 벌써 2025년이다. 새해에도 화팅.</h1><p><strong><em>야호 ~~ 테스트 테스트</em></strong></p><ul><li><p><strong><em>리스트도 테스트 해보자</em></strong></p></li><li><p><strong><em>ㅋㅋㅋㅋul ul </em></strong></p></li></ul><ol><li><p>번호있는 리스트 ol</p></li><li><p>야호야호</p></li></ol><pre><code>이건 코드 </code></pre><blockquote><p>이건 머지</p><p></p></blockquote>",
        img_url: "image2.png",
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
const getWeatherItem = (weather: string): WeatherItem => {
    return (
        WeatherItems.find(item => item.value === weather) || {
            id: 0,
            path: "/icons/joy_mood.png",
            value: "기쁨",
        }
    );
};
const DiaryDetail = () => {
    const {id} = useParams();
    const [diary, setDiary] = useState<DiaryDetailEntry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [modalState, setModalState] = useState<"confirm" | "success" | "mood" | "">("");

    useEffect(() => {
        if (id) {
            const entry = diaryEntries.find(entry => entry.id === Number(id));
            if (entry) {
                setDiary(entry);
            } else {
                alert("일기를 찾을 수 없습니다.");
            }
            setIsLoading(true);
        }
    }, [id]);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (!diary) {
        return <div>일기를 찾을 수 없습니다.</div>;
    }
    const moodItem = getMoodItem(diary.mood);
    const weatherItem = getWeatherItem(diary.weather);

    const openDeleteConfirmModal = () => setModalState("confirm");
    const closeModal = () => setModalState("");
    const handleDeleteSuccess = () => {
        console.log("삭제 처리 로직 실행 (예: API DELETE 호출)");
        setModalState("success");
    };
    const handleEmotionAnalysis = () => {
        console.log("API 호출로직");
        setModalState("mood");
    };
    return (
        <div className="diary-detail">
            <div className="space-y-4">
                <div className="text-center flex justify-center items-center gap-2 border-b border-gray pb-3 md:pb-6">
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
                    <p className="mb-2">내용</p>
                    <div
                        className="p-3 text-black bg-white border-lightgray border rounded-xl"
                        dangerouslySetInnerHTML={{__html: diary.content}}
                    />
                </div>
                <div>
                    <p className="mb-2">사진</p>
                    {diary.img_url ? (
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
                <div className="flex items-center !mt-[3.25rem]">
                    <Button
                        type="submit"
                        variant="sand"
                        onClick={handleEmotionAnalysis}
                    >
                        조언 받기 및 감정 분석
                    </Button>
                </div>
            </div>
            {modalState === "confirm" && (
                <Modal
                    title="일기를 삭제하시겠습니까?"
                    description="작성하신 일기는 7일 동안 보관 후 삭제됩니다."
                    onCancel={closeModal}
                    onConfirm={handleDeleteSuccess}
                    cancelText="취소"
                    confirmText="확인"
                />
            )}
            {modalState === "success" && (
                <Modal
                    title="일기가 삭제되었습니다"
                    description="삭제하신 일기는 내 정보 > 휴지통에서 보실 수 있으며, 7일 안에 복구 가능합니다."
                    onConfirm={closeModal}
                    confirmText="확인"
                    confirmType={true}
                />
            )}
            {modalState === "mood" && (
                <CloseModal
                    title="'따봉맨'님의 감정분석"
                    subTitle="'따봉맨'님에게 해주고싶은 말"
                    subContent="조언"
                    onClose={closeModal}
                >
                    팝업내용
                </CloseModal>
            )}
        </div>
    );
};

export default DiaryDetail;
