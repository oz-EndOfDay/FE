"use client";

import { userDeleteInfo } from "@/api/user";
import SmallButton from "./SmallButton";
import { useRouter } from "next/navigation";

export const UserDeleteButton = () => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await userDeleteInfo();
      if (!response) {
        throw new Error(
          "사용자 정보를 받아오지 못했습니다. 다시 시도 해주세요."
        );
      }
      alert("회원 탈퇴가 완료되었습니다.");
      router.push("/");
    } catch (Error) {
      console.error(Error);
    }
  };

  return (
    <SmallButton variant="text" onClick={handleDelete}>
      회원탈퇴
    </SmallButton>
  );
};
