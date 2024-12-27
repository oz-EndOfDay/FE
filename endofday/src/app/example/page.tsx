"use client";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import {useState} from "react";
import SmallTextButton from "@/components/ui/SmallTextButton";

const ExamplePage = () => {
    const [isModal, setModal] = useState(false);
    const [isModal2, setModal2] = useState(false);
    const [isModal3, setModal3] = useState(false);
    const handleCancel = () => {
        setModal(false);
        setModal2(false);
    };

    const handleConfirm = () => {
        setModal(false);
        setModal2(false);
        setModal3(false);
    };
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
                <Heading tag="h2">SmalltextButton Component</Heading>

                <div className="mt-10 space-x-2">
                    <SmallTextButton type="submit">로그인</SmallTextButton>
                    <SmallTextButton
                        type="submit"
                        variant="sand"
                    >
                        카카오로 로그인
                    </SmallTextButton>
                    <SmallTextButton
                        type="submit"
                        variant="text"
                        className="w-full"
                    >
                        비밀번호 찾기
                    </SmallTextButton>
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
                    <SmallTextButton
                        variant="text"
                        onClick={() => {
                            setModal(true);
                        }}
                    >
                        모달 오픈
                    </SmallTextButton>
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
                    <SmallTextButton
                        variant="text"
                        onClick={() => {
                            setModal2(true);
                        }}
                    >
                        컨펌+ 설명글
                    </SmallTextButton>
                    {isModal2 && (
                        <Modal
                            title="회원이 탈퇴되었습니다"
                            description="회원 탈퇴시 7일 후에 모든 데이터가 삭제됩니다."
                            onConfirm={handleConfirm}
                            confirmText="확인"
                            confirmType={true}
                        />
                    )}
                    <SmallTextButton
                        variant="text"
                        onClick={() => {
                            setModal3(true);
                        }}
                    >
                        컨펌 + 설명글 x
                    </SmallTextButton>
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
        </>
    );
};

export default ExamplePage;
