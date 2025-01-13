"use client";
import "@/styles/diary.css";
import Image from "next/image";
import {useState} from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SmallButton from "@/components/ui/SmallButton";
import Modal from "@/components/ui/Modal";
import CloseModal from "@/components/ui/CloseModal";
import {MoodItem, MoodItems, WeatherItem, WeatherItems, EmotionAnalysisResponse} from "@/types/diary";
import {useDiaryById, useDeleteDiary, useAnalyzeDiary} from "@/hooks/useDiary";
import {useParams} from "next/navigation";

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
    // 삭제 api 호출
    const {mutate: deleteDiaryById} = useDeleteDiary();
    // 분석 api 호출
    const {mutate: analyzeDiaryById} = useAnalyzeDiary();
    // 모달 상태
    const [modalState, setModalState] = useState<"confirm" | "success" | "mood" | "">("");
    // 일기 분석 데이터
    const [analysisResult, setAnalysisResult] = useState<EmotionAnalysisResponse | null>(null);

    // url 파라미터 갖고오기(id값)
    const params = useParams();
    const id = params?.id;
    const diaryId = Number(id);

    // 상세 api 호출
    const {data: diary, isPending, isError} = useDiaryById(Number(diaryId));
    // 로딩
    if (isPending) {
        return <LoadingSpinner />;
    }
    // 에러
    if (isError) {
        return <div>일기를 찾을 수 없습니다.</div>;
    }

    const moodItem = getMoodItem(diary.mood);
    const weatherItem = getWeatherItem(diary.weather);

    const openDeleteConfirmModal = () => setModalState("confirm");
    const closeModal = () => setModalState("");
    // 삭제
    const handleDeleteSuccess = () => {
        deleteDiaryById(diaryId, {
            onSuccess: () => {
                setModalState("success");
                // ✅ 삭제 후 목록 새로고침, 페이지 이동 등 처리
            },
            onError: (error: Error) => {
                console.error("일기 삭제 실패 ❌:", error.message);
            },
        });
    };
    const handleEmotionAnalysis = () => {
        console.log("API 호출로직");
        analyzeDiaryById(diaryId, {
            onSuccess: data => {
                setAnalysisResult(data);
                setModalState("mood");
            },
            onError: (error: Error) => {
                console.error("일기 분석 실패 ❌:", error.message);
            },
        });
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
                            <p>다이어리 url {diary.img_url}</p>
                            <Image
                                src={diary.img_url}
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
                    subContent={analysisResult?.analysis_result || "분석 결과가 없습니다."}
                    onClose={closeModal}
                >
                    {analysisResult?.diary_content || "분석 결과가 없습니다."}
                </CloseModal>
            )}
        </div>
    );
};

export default DiaryDetail;
