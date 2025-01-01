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
    image: File | null;
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

        const isValid = Object.values(formData).every(value => value !== "" && value !== null);

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
                    id="sender"
                    label="작성자"
                    type="text"
                    placeholder="제목을 입력해주세요"
                    value="나"
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
                <div className="flex flex-col !mt-[3.25rem] space-y-4 items-center">
                    <Button
                        type="submit"
                        variant="sand"
                    >
                        작성
                    </Button>
                </div>
                {isWriteModalOpen && (
                    <Modal
                        title="교환일기를 작성하시겠습니까?"
                        description="교환일기를 작성하시면 수정이 불가능합니다."
                        onCancel={closeModal}
                        onConfirm={submitDiaryEntry}
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
            </form>
        </div>
    );
};

export default WritePage;
