"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Modal from "@/components/ui/Modal";

export const FoundPasswordForm = () => {
  const [isModal, setIsModal] = useState(false);

  const handleConfirm = () => {
    setIsModal(false);
  };

  return (
    <div className="bg-white flex flex-col justify-center py-[3rem] px-[3rem] rounded-lg  w-[25vw] h-[30vh] min-h-[300px] min-w-[500px] shadow-md">
      <form
        className="flex flex-col gap-2 "
        onSubmit={(event) => {
          event.preventDefault();
          setIsModal(true);
        }}
      >
        <Heading tag="h1" className="text-center">
          비밀번호 찾기
        </Heading>
        <Input
          id="user_email"
          label="Email"
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        {/* 아이디 찾을때 백엔드에서 유효성 검사 필요(이메일 존재 여부) */}
        <div className="flex flex-col !mt-[3.25rem] space-y-4 items-center">
          <Button type="submit" variant="sand">
            확인
          </Button>
          {isModal && (
            <Modal
              title="비밀번호 재설정 이메일이 발송되었습니다."
              description="이메일을 확인해 주세요."
              onConfirm={handleConfirm}
              confirmText="확인"
              confirmType={true}
            />
          )}
        </div>
      </form>
    </div>
  );
};
