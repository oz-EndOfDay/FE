"use client";
import "@/styles/diary.css";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {diarySchema, DiaryFormData} from "@/utils/diarySchema";
import Image from "next/image";
import dynamic from "next/dynamic";
import {DayPicker} from "react-day-picker";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import MoodRadio from "@/components/ui/MoodRadio";
import WeatherRadio from "@/components/ui/WeatherRadio";
import Modal from "@/components/ui/Modal";

const TipTapEditor = dynamic(() => import("@/components/ui/TipTapEditor"), {ssr: false});

const WritePage = () => {
    // 작성 모달 상태
    const [isWriteModalOpen, setWriteModalOpen] = useState(false);
    // 완료 모달 상태
    const [isCompleteModalOpen, setCompleteModalOpen] = useState(false);

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
            emotion: "",
            weather: "",
            content: "",
            image: null,
        },
    });
    // 필요한 폼 필드들을 모두 watch
    const currentEmotion = watch("emotion");
    const currentWeather = watch("weather");

    // 폼 제출
    const onSubmit = (data: DiaryFormData) => {
        // 작성모달
        setWriteModalOpen(true);
        const formData = new FormData();

        // 폼 데이터 추가
        formData.append("title", data.title);
        formData.append("write_date", data.write_date);
        formData.append("emotion", data.emotion);
        formData.append("weather", data.weather);
        formData.append("content", data.content);

        if (data.image) {
            formData.append("image", data.image);
        }
        // 서버에 데이터전송 함수 추가해야함(리액트쿼리)
    };
    const handleConfirm = () => {
        setCompleteModalOpen(true);
    };
    // 날짜
    const [isOpenDayPicker, setOpenDayPicker] = useState(false);

    return (
        <div>
            <div className="text-center">
                <Heading tag="h2">친구이름님과의 소중한 교환일기</Heading>
                <Heading
                    tag="p"
                    className="mt-2"
                >
                    ✅ 내 차례입니다! 작성 완료 후 수정이 불가능합니다.
                </Heading>
                {/* 교환일기 처음으로 작성했을때 */}
                <Heading
                    tag="p"
                    className="mt-2"
                >
                    교환일기의 첫 페이지를 장식해 보세요.
                    <br />
                    친구와의 소중한 기록이 시작됩니다!
                </Heading>
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
                            onSelect={date => {
                                if (date) {
                                    setValue("write_date", date.toISOString().split("T")[0]);
                                }
                                setOpenDayPicker(false);
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
                        setValue("emotion", value);
                    }}
                    value={currentEmotion}
                    error={errors.emotion?.message}
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
                    title="작성 완료! 친구이름님 차례로 변경되었습니다"
                    onConfirm={closeModal}
                    confirmText="확인"
                    confirmType={true}
                    Isdescription={false}
                />
            )}
        </div>
    );
};

export default WritePage;
