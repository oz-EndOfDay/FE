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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateUserProfile } from "@/api/updateUserProfile";
import { useRouter } from "next/navigation";
import { setUserInfo } from "@/store/auth/authSlice";
import { getUserInfo } from "@/api/user";

const MyPageForm = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyPageData>({
    resolver: zodResolver(mypageSchema),
    defaultValues: {
      nickname: "",
      password: "",
      introduce: "",
    },
  });
  const onSubmit = async (data: MyPageData) => {
    if (token === null) {
      throw new Error("토큰이 없습니다");
    }
    const formData = new FormData();
    formData.append("nickname", data.nickname);
    formData.append("introduce", data.introduce);
    formData.append("password", data.password);
    await updateUserProfile(formData);
    if (!userInfo) {
      throw new Error("사용자 정보를 받아오지 못했습니다. 다시 시도 해주세요.");
    }
    const updateUserInfo = await getUserInfo();
    dispatch(setUserInfo(updateUserInfo));
    // 사용자 정보 검증: 유저 정보가 없으면 에러 발생
    alert("회원 수정이 완료되었습니다.");
    router.push("/main");
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
        <input
          id="user_name"
          className="relative p-3 rounded-lg bg-lightgray focus:outline-none pointer-events-none"
          value={`${userInfo?.name}`}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
