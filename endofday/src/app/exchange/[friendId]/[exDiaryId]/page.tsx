"use client";
import "@/styles/diary.css";
import {useParams, useRouter} from "next/navigation";
import Image from "next/image";
import {useState} from "react";
import Heading from "@/components/ui/Heading";
import SmallButton from "@/components/ui/SmallButton";
import Modal from "@/components/ui/Modal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {MoodItem, MoodItems, WeatherItem, WeatherItems} from "@/types/diary";
import {useDeleteDiary, useDiaryById} from "@/hooks/useExDiary";

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
const ExchangeDiaryDetail = () => {
    const router = useRouter();
    // 삭제 api 호출
    const {mutate: deleteDiaryById} = useDeleteDiary();
    // 모달
    const [modalState, setModalState] = useState<"confirm" | "success" | "">("");

    // url 파라미터 갖고오기(id값)
    const params = useParams();
    const friendId = Array.isArray(params.friendId) ? Number(params.friendId[0]) : Number(params.friendId);
    const exDiaryId = Array.isArray(params.exDiaryId) ? Number(params.exDiaryId[0]) : Number(params.exDiaryId);

    // 상세 api 호출
    const {data: diary, isPending, isError} = useDiaryById(Number(friendId), Number(exDiaryId));
    console.log(diary);
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
        deleteDiaryById(
            {
                friend_id: friendId,
                ex_diary_id: exDiaryId,
            },
            {
                onSuccess: () => {
                    setModalState("success");
                    // 삭제 후 다이어리 리스트로 이동
                    router.push(`/exchange/${friendId}/list`);
                },
                onError: (error: Error) => {
                    console.error("일기 삭제 실패 ❌:", error.message);
                },
            }
        );
    };

    return (
        <>
            <div className="diary-detail">
                <div className="space-y-4">
                    <div className="text-center flex justify-center items-center gap-2 border-b border-gray pb-3 md:pb-6">
                        <Heading
                            tag="h2"
                            className="!font-semibold !text-2xl"
                        >
                            {formatDate(diary.write_date)}
                        </Heading>
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
                        <div className="p-3 text-black bg-white border-lightgray border rounded-xl">{diary.author}</div>
                    </div>
                    <div>
                        <p className="mb-2">내용</p>
                        <div
                            className="p-3 text-black bg-white border-lightgray border rounded-xl"
                            dangerouslySetInnerHTML={{__html: diary.content}}
                        />
                    </div>
                    <div className="pb-[2rem] md:pb-[3.125rem]">
                        <p className="mb-2">사진</p>
                        {diary.img_url ? (
                            <div className="relative w-full max-w-2xl mx-auto aspect-[10/9]">
                                <Image
                                    src={diary.img_url}
                                    alt="이미지"
                                    fill
                                    className="object-contain rounded-xl"
                                />
                            </div>
                        ) : (
                            <div className="relative w-full h-[15rem] flex justify-center items-center">
                                <p className="text-gray-500">첨부하신 사진이 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {modalState === "confirm" && (
                <Modal
                    title="교환일기를 삭제하시겠습니까?"
                    description="작성하신 일기는 영구적으로 삭제됩니다."
                    onCancel={closeModal}
                    onConfirm={handleDeleteSuccess}
                    cancelText="취소"
                    confirmText="확인"
                />
            )}
            {modalState === "success" && (
                <Modal
                    title="교환일기가 삭제되었습니다"
                    Isdescription={false}
                    onConfirm={closeModal}
                    confirmText="확인"
                    confirmType={true}
                />
            )}
        </>
    );
};

export default ExchangeDiaryDetail;
