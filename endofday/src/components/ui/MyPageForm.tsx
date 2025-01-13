"use client";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { useForm } from "react-hook-form";
import { MyPageData, mypageSchema } from "@/utils/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import SmallButton from "@/components/ui/SmallButton";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchWithToken } from "@/api/fetchUtils";

const MyPageForm = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const token = useSelector((state: RootState) => state.auth.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyPageData>({
    resolver: zodResolver(mypageSchema),
    defaultValues: {
      name: "",
      nickname: "",
      password: "",
      introduce: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: MyPageData) => {
    if (token === null) {
      throw new Error("토큰이 없습니다");
    }
    try {
      console.log(data);
      const response = await fetchWithToken("/users", token, {
        method: "PUT",
        body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환
      });
      console.log("생성된 게시물:", data);
      if (!response.ok) {
        throw new Error(`잘못 된 접근입니다.`);
      }
      alert("회원 정보가 수정되었습니다.");
    } catch {
      alert("서버경로가 올바르지 않습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className=" p-[3rem] rounded-lg h-full w-full max-w-[600px] flex flex-col gap-10 ">
      <Heading tag="h1" className="text-center">
        내정보
      </Heading>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="bg-white w-[250px] h-[250px] rounded-[50%] flex justify-center items-center border">
          <Image
            src="/icons/ProfileExample.png"
            alt="프로필이미지"
            width={230}
            height={230}
          />
        </div>
        <button
          type="button"
          className="font-bold px-6 py-3 rounded-2xl transition duration-300 ease-in-out bg-sand text-brown hover:shadow-lg"
        >
          프로필 수정
        </button>
      </div>

      <div className="flex flex-col">
        <label className="text-black mb-2 ">Mail</label>
        <input
          id="user_email"
          className="relative p-3 rounded-lg bg-lightgray focus:outline-none pointer-events-none"
          value={`${userInfo?.email}`}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-black mb-2 ">Name</label>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          id="user_name"
          className="relative p-3 rounded-lg bg-lightgray focus:outline-none pointer-events-none"
          value={`${userInfo?.name}`}
          {...register("name")}
        />
        <Input
          id="user_nickname"
          label="NickName"
          type="text"
          placeholder={`별명을 입력해주세요.`}
          {...register("nickname")}
        />
        {errors.nickname && (
          <p className="text-red-500">{errors.nickname.message}</p>
        )}
        <Input
          id="user_Profile"
          label="Profile intro"
          type="text"
          placeholder="프로필 소개를 입력해주세요"
          {...register("introduce")}
        />
        {errors.introduce && (
          <p className="text-red-500">{errors.introduce.message}</p>
        )}
        <Input
          id="user_password"
          label="Password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <Input
          id="user_password_confirm"
          label="Password Confirm"
          type="password"
          placeholder="비밀번호 확인"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
        <div className="flex flex-col !mt-[3.25rem] space-y-4 items-center">
          <Button variant="sand" type="submit">
            수정
          </Button>
          <SmallButton variant="text">회원탈퇴</SmallButton>
        </div>
      </form>
    </div>
  );
};

export default MyPageForm;
