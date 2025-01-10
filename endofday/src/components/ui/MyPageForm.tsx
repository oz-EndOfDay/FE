"use client";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/utils/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import SmallButton from "@/components/ui/SmallButton";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const MyPageForm = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: LoginFormData) => {
    console.log("Form Data", data);
  };
  //스키마 마이 페이지 폼으로 하나 만들 것
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <input
            id="user_name"
            className="relative p-3 rounded-lg bg-lightgray focus:outline-none pointer-events-none"
            value={`${userInfo?.name}`}
          />
        </div>

        <Input
          id="user_nickname"
          label="NickName"
          type="text"
          placeholder={`별명을 입력해주세요.`}
          // {...register("nickname")}
        />
        <Input
          id="user_Profile"
          label="Profile intro"
          type="text"
          placeholder="프로필 소개를 입력해주세요"
        />
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
          // {...register("confirmPassword")}
        />
        {/* {errors.Password && (
          <p className="text-red-500">{errors.mPassword.message} </p>
        )} */}
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
