"use client";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import {useState} from "react";
import SmallButton from "@/components/ui/SmallButton";
import CloseModal from "@/components/ui/CloseModal";
import Select from "@/components/ui/Select";
import SearchInput from "@/components/ui/SearchInput";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const ExamplePage = () => {
    // modal
    const [isModal, setModal] = useState(false);
    const [isModal2, setModal2] = useState(false);
    const [isModal3, setModal3] = useState(false);
    const [isModal4, setModal4] = useState(false);
    const handleCancel = () => {
        setModal(false);
        setModal2(false);
        setModal4(false);
    };

    const handleConfirm = () => {
        setModal(false);
        setModal2(false);
        setModal3(false);
    };

    // select
    const [value, setValue] = useState("년도");
    const handleSelectChange = (value: string) => {
        setValue(value);
    };

    const options = [
        {value: "년도", label: "년도"},
        {value: "2024", label: "2024"},
        {value: "2023", label: "2023"},
    ];

    return (
        <>
            <section>
                <Heading tag="h2">Button Component</Heading>

                <div className="flex gap-3 flex-col mt-10">
                    <Button type="submit">로그인</Button>
                    <Button
                        type="submit"
                        variant="sand"
                        className="w-full"
                    >
                        카카오로 로그인
                    </Button>
                </div>
            </section>

            <section className="mt-10">
                <Heading tag="h2">SmallButton Component</Heading>

                <div className="mt-10 space-x-2">
                    <SmallButton type="submit">로그인</SmallButton>
                    <SmallButton
                        type="submit"
                        variant="sand"
                    >
                        카카오로 로그인
                    </SmallButton>
                    <SmallButton
                        type="submit"
                        variant="text"
                    >
                        비밀번호 찾기
                    </SmallButton>
                </div>
            </section>
            <section className="mt-10">
                <Heading tag="h2">Heading Component</Heading>

                <div className="flex gap-3 flex-col mt-10">
                    <Heading>H1</Heading>
                    <Heading tag="h2">H2</Heading>
                    <Heading tag="h3">H3</Heading>
                    <Heading tag="p">P</Heading>
                </div>
            </section>

            <section className="mt-10">
                <Heading tag="h2">Input Component</Heading>

                <div className="flex gap-3 flex-col mt-10">
                    <Input
                        id="user_email"
                        label="Email"
                        type="email"
                        placeholder="이메일을 입력해주세요"
                    />
                </div>
            </section>

            <section className="mt-10">
                <Heading tag="h2">Modal Component</Heading>

                <div className="flex gap-3 flex-col mt-10">
                    <SmallButton
                        variant="text"
                        onClick={() => {
                            setModal(true);
                        }}
                    >
                        모달 오픈
                    </SmallButton>
                    {isModal && (
                        <Modal
                            title="정말로 회원을 탈퇴하시겠습니까?"
                            description="회원 탈퇴시 7일 후에 모든 데이터가 삭제됩니다."
                            onCancel={handleCancel}
                            onConfirm={handleConfirm}
                            cancelText="취소"
                            confirmText="확인"
                        />
                    )}
                    <SmallButton
                        variant="text"
                        onClick={() => {
                            setModal2(true);
                        }}
                    >
                        컨펌+ 설명글
                    </SmallButton>
                    {isModal2 && (
                        <Modal
                            title="회원이 탈퇴되었습니다"
                            description="회원 탈퇴시 7일 후에 모든 데이터가 삭제됩니다."
                            onConfirm={handleConfirm}
                            confirmText="확인"
                            confirmType={true}
                        />
                    )}
                    <SmallButton
                        variant="text"
                        onClick={() => {
                            setModal3(true);
                        }}
                    >
                        컨펌 + 설명글 x
                    </SmallButton>
                    {isModal3 && (
                        <Modal
                            title="회원이 탈퇴되었습니다"
                            onConfirm={handleConfirm}
                            confirmText="확인"
                            confirmType={true}
                            Isdescription={false}
                        />
                    )}
                </div>
            </section>

            <section className="mt-10">
                <Heading tag="h2">CloseModal Component</Heading>

                <div className="flex gap-3 flex-col mt-10">
                    <SmallButton
                        variant="text"
                        onClick={() => {
                            setModal4(true);
                        }}
                    >
                        모달 오픈(닫기버튼있는)
                    </SmallButton>
                    {isModal4 && (
                        <CloseModal
                            title="'따봉맨'님의 감정분석"
                            onClose={handleCancel}
                        >
                            팝업내용
                        </CloseModal>
                    )}
                </div>
            </section>

            <section className="mt-10">
                <Heading tag="h2">Select Component</Heading>

                <div className="mt-10">
                    <Select
                        options={options}
                        onChange={handleSelectChange}
                        value={value}
                    />
                </div>
            </section>

            <section className="mt-10">
                <Heading tag="h2">SearchInput Component</Heading>

                <div className="mt-10">
                    <SearchInput placeholder="제목으로 검색해 보세요" />
                </div>
            </section>

            <section className="mt-10">
                <Heading tag="h2">LoadingSpinner Component</Heading>

                <div className="mt-10">
                    <LoadingSpinner />
                </div>
            </section>
        </>
    );
};

export default ExamplePage;
