"use client";
import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {diarySchema, DiaryFormData} from "@/utils/diarySchema";
import Image from "next/image";
import dynamic from "next/dynamic";
import {DayPicker} from "react-day-picker";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import MoodRadio from "@/components/diary/MoodRadio";
import WeatherRadio from "@/components/diary/WeatherRadio";
import Modal from "@/components/ui/Modal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {useParams} from "next/navigation";
import {useExGetFriend, useExSendDiary} from "@/hooks/useExDiary";
import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
const TipTapEditor = dynamic(() => import("@/components/diary/TipTapEditor"), {ssr: false});

const WritePage = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    // url 파라미터 값 갖고오기
    const params = useParams();
    const id = params?.friendId;
    const friendId = Number(id);
    // API 호출
    const {data} = useExGetFriend();
    // 친구 상태
    const [friendName, setFriendName] = useState<string | null>(null);
    const [isFirstExDiary, setIsFirstExDiary] = useState<boolean>(false);

    useEffect(() => {
        if (data && data.friends) {
            const friendData = data.friends.find(el => el.id === friendId);

            if (friendData) {
                setFriendName(friendData.friend_nickname);
                setIsFirstExDiary(friendData.ex_diary_cnt === 0);
            } else {
                setFriendName(null);
            }
        }
    }, [data, friendId]);
    // 일기 전송 함수
    const {mutate, isPending} = useExSendDiary();
    // 폼 데이터 저장
    const [formData, setFormData] = useState<FormData | null>(null);
    // 작성 모달 상태
    const [isWriteModalOpen, setWriteModalOpen] = useState(false);
    // 완료 모달 상태
    const [isCompleteModalOpen, setCompleteModalOpen] = useState(false);
    // 날짜
    const [isOpenDayPicker, setOpenDayPicker] = useState(false);

    const closeModal = () => {
        setWriteModalOpen(false);
        setCompleteModalOpen(false);
    };
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: {errors},
    } = useForm<DiaryFormData>({
        resolver: zodResolver(diarySchema),
        defaultValues: {
            title: "",
            write_date: "",
            weather: "",
            mood: "",
            content: "",
            image: null,
        },
    });
    // 필요한 폼 필드들을 모두 watch
    const currentMood = watch("mood");
    const currentWeather = watch("weather");

    // 폼 제출
    const onSubmit = (data: DiaryFormData) => {
        console.log("폼 데이터 제출됨:", data);
        // 작성모달
        setWriteModalOpen(true);
        const formData = new FormData();

        // 폼 데이터 추가
        formData.append("title", data.title);
        formData.append("write_date", data.write_date);
        formData.append("mood", data.mood);
        formData.append("weather", data.weather);
        formData.append("content", data.content);

        if (data.image) {
            formData.append("image", data.image);
        }
        console.log("폼데이터 확인:", formData);
        setFormData(formData);
    };
    const handleConfirm = () => {
        if (formData) {
            mutate(
                {formData, friendId},
                {
                    onSuccess: () => {
                        setCompleteModalOpen(true);
                        setWriteModalOpen(false);
                        setFormData(null);
                        // ✅ 기존 데이터를 무효화 → 최신 데이터 강제 새로고침
                        queryClient.invalidateQueries({queryKey: ["diaries"]});
                    },
                    onError: error => {
                        console.error("작성 실패:", error);
                        alert("교환일기 작성에 실패했습니다.");
                    },
                }
            );
        }
    };

    //  "작성 완료" 모달의 확인 버튼을 눌렀을 때 이동
    const handleCompleteConfirm = () => {
        setCompleteModalOpen(false);
        //  작성 후 교환일기 리스트로 이동
        router.push(`/exchange/${friendId}/list`);
    };
    console.log(formData, friendId);
    // 로딩
    if (isPending) {
        return <LoadingSpinner />;
    }
    return (
        <div>
            <div className="text-center">
                <Heading tag="h2">{friendName}님과의 소중한 교환일기</Heading>

                {isFirstExDiary ? (
                    <Heading
                        tag="p"
                        className="mt-2"
                    >
                        교환일기의 첫 페이지를 장식해 보세요.
                        <br />
                        친구와의 소중한 기록이 시작됩니다!
                    </Heading>
                ) : (
                    <Heading
                        tag="p"
                        className="mt-2"
                    >
                        ✅ 내 차례입니다! 작성 완료 후 수정이 불가능합니다.
                    </Heading>
                )}
            </div>
            <form
                className="space-y-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* 제목 */}
                <Input
                    id="title"
                    label="제목"
                    type="text"
                    placeholder="제목을 입력해주세요"
                    isWhite={true}
                    {...register("title")}
                />
                {errors.title && <p className="text-red-500 text-sm !mt-2">{errors.title.message}</p>}
                {/* 작성자 */}
                <Input
                    id="sender"
                    label="작성자"
                    type="text"
                    placeholder="제목을 입력해주세요"
                    value="나"
                    readOnly={true}
                    isWhite={true}
                />
                {/* 날짜 */}
                <div className="relative">
                    <p className="mb-2">날짜</p>
                    <button
                        type="button"
                        className="justify-between p-3 text-black bg-white border-lightgray border rounded-xl flex w-full"
                        onClick={() => setOpenDayPicker(prev => !prev)}
                    >
                        <span className={`${getValues("write_date") ? "text-black" : "text-gray"}`}>
                            {getValues("write_date")
                                ? new Date(getValues("write_date")).toLocaleDateString("ko-KR", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                  })
                                : "날짜를 선택해주세요"}
                        </span>
                        <Image
                            src="/icons/calendar.svg"
                            alt="달력아이콘"
                            width={24}
                            height={24}
                        />
                    </button>
                    {isOpenDayPicker && (
                        <DayPicker
                            mode="single"
                            selected={getValues("write_date") ? new Date(getValues("write_date")) : undefined}
                            onSelect={(date: Date | undefined) => {
                                if (date) {
                                    // UTC 날짜를 로컬 시간으로 변환
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, "0");
                                    const day = String(date.getDate()).padStart(2, "0");
                                    const localDate = `${year}-${month}-${day}`;

                                    setValue("write_date", localDate);
                                    setOpenDayPicker(false); // 선택 후 달력 닫기
                                }
                            }}
                            fixedWeeks
                            className="absolute z-50 w-[18.75rem] mt-[0.7rem]"
                        />
                    )}
                    {errors.write_date && <p className="text-red-500 text-sm !mt-2">{errors.write_date.message}</p>}
                </div>

                {/* 기분 */}
                <MoodRadio
                    onChange={value => {
                        setValue("mood", value);
                    }}
                    value={currentMood}
                    error={errors.mood?.message}
                />

                {/* 날씨 */}
                <WeatherRadio
                    onChange={value => setValue("weather", value)}
                    value={currentWeather}
                    error={errors.weather?.message}
                />

                {/* 내용 */}
                <TipTapEditor
                    value={getValues("content")}
                    onChange={value => setValue("content", value)}
                    onImageAdd={file => setValue("image", file)}
                />
                {errors.content && <p className="text-red-500 text-sm !mt-2">{errors.content.message}</p>}

                <div className="flex !mt-[3.25rem] items-center">
                    <Button
                        type="submit"
                        variant="sand"
                    >
                        작성
                    </Button>
                </div>
            </form>

            {isWriteModalOpen && (
                <Modal
                    title="교환일기를 작성하시겠습니까?"
                    description="교환일기를 작성하시면 수정이 불가능합니다."
                    onCancel={closeModal}
                    onConfirm={handleConfirm}
                    cancelText="취소"
                    confirmText="확인"
                />
            )}
            {isCompleteModalOpen && (
                <Modal
                    title={`작성 완료! ${friendName}님 차례로 변경되었습니다`}
                    onConfirm={handleCompleteConfirm}
                    confirmText="확인"
                    confirmType={true}
                    Isdescription={false}
                />
            )}
        </div>
    );
};

export default WritePage;
