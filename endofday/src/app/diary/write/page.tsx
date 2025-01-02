"use client";
import React, {useState} from "react";
import dynamic from "next/dynamic";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import MoodRadio from "@/components/ui/MoodRadio";
import WeatherRadio from "@/components/ui/WeatherRadio";
import Modal from "@/components/ui/Modal";

const TipTapEditor = dynamic(() => import("@/components/ui/TipTapEditor"), {ssr: false});

interface DiaryFormData {
    title: string;
    write_date: string;
    emotion: string;
    weather: string;
    content: string;
    image?: File | null;
}

const WritePage = () => {
    // 작성 모달 상태
    const [isWriteModalOpen, setWriteModalOpen] = useState(false);
    // 완료 모달 상태
    const [isCompleteModalOpen, setCompleteModalOpen] = useState(false);

    const closeModal = () => {
        setWriteModalOpen(false);
        setCompleteModalOpen(false);
    };

    const validateAndShowModal = (e: React.FormEvent) => {
        e.preventDefault();

        // 모든 필수 필드가 입력되었는지 확인 (image 제외)
        const isValid = Object.entries(formData).every(([key, value]) => {
            if (key === "image") return true; // 이미지 필드는 제외
            return value !== "" && value !== null;
        });

        if (!isValid) {
            alert("모든 값을 입력해주세요.");
            return;
        }

        setWriteModalOpen(true);
    };

    const submitDiaryEntry = () => {
        setWriteModalOpen(false);
        console.log("폼 데이터 제출:", formData);

        const form = new FormData();
        form.append("title", formData.title);
        form.append("write_date", formData.write_date);
        form.append("emotion", formData.emotion);
        form.append("weather", formData.weather);
        form.append("content", formData.content);

        if (formData.image) {
            form.append("image", formData.image);
        }

        setCompleteModalOpen(true);
    };

    const [formData, setFormData] = useState<DiaryFormData>({
        title: "",
        write_date: "",
        emotion: "",
        weather: "",
        content: "",
        image: null,
    });

    const [selectedDate, setSelectedDate] = useState<string>("");
    const [placeholder, setPlaceholder] = useState<string>("날짜를 선택하세요");

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, title: e.target.value}));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isoDate = e.target.value;
        if (isoDate) {
            setSelectedDate(isoDate);
            setPlaceholder(isoDate);
            setFormData(prev => ({...prev, write_date: isoDate}));
        }
    };

    const handleMoodChange = (emotion: string) => {
        setFormData(prev => ({...prev, emotion}));
    };

    const handleWeatherChange = (weather: string) => {
        setFormData(prev => ({...prev, weather}));
    };

    const handleEditorUpdate = (htmlContent: string) => {
        setFormData(prev => ({...prev, content: htmlContent}));
    };

    const handleImageAdd = (file: File | null) => {
        setFormData(prev => ({...prev, image: file}));
    };

    return (
        <div>
            <div className="text-center">
                <Heading tag="h2">오늘의 일기</Heading>
                <Heading
                    tag="p"
                    className="mt-2"
                >
                    오늘의 기분은 어떠셨나요? <br />
                    하루를 정리하며 기록해보세요.
                </Heading>
            </div>
            <form
                className="space-y-4"
                onSubmit={validateAndShowModal}
            >
                <Input
                    id="title"
                    label="제목"
                    type="text"
                    placeholder="제목을 입력해주세요"
                    isWhite={true}
                    onChange={handleTitleChange}
                    value={formData.title}
                />
                <Input
                    id="date"
                    label="날짜"
                    type="date"
                    value={selectedDate ? selectedDate : ""}
                    placeholder={placeholder}
                    onChange={handleDateChange}
                    className={`${selectedDate ? "has-value" : ""}`}
                    isWhite={true}
                />
                <MoodRadio
                    onChange={handleMoodChange}
                    value={formData.emotion}
                />
                <WeatherRadio
                    onChange={handleWeatherChange}
                    value={formData.weather}
                />
                <TipTapEditor
                    onChange={handleEditorUpdate}
                    onImageAdd={handleImageAdd}
                />
                <div className="flex !mt-[3.25rem] items-center">
                    <Button
                        type="submit"
                        variant="sand"
                    >
                        작성
                    </Button>
                </div>
                {isWriteModalOpen && (
                    <Modal
                        title="일기를 작성하시겠습니까?"
                        description="일기를 작성하시면 수정이 불가능합니다."
                        onCancel={closeModal}
                        onConfirm={submitDiaryEntry}
                        cancelText="취소"
                        confirmText="확인"
                    />
                )}
                {isCompleteModalOpen && (
                    <Modal
                        title="일기 작성을 완료하였습니다."
                        description="내 일기 목록에서 확인해보세요."
                        onConfirm={closeModal}
                        confirmText="확인"
                        confirmType={true}
                    />
                )}
            </form>
        </div>
    );
};

export default WritePage;
