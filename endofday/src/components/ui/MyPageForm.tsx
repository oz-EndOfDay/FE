"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { MyPageData, mypageSchema } from "@/utils/registrationSchema";
import { RootState } from "@/store/store";
import { updateUserProfile } from "@/api/updateUserProfile";
import { getUserInfo } from "@/api/user";
import { setUserInfo } from "@/store/auth/authSlice";
import { UserDeleteButton } from "./UserDeleteButton";

const MyPageForm = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyPageData>({
    resolver: zodResolver(mypageSchema),
    defaultValues: {
      nickname: userInfo?.nickname || "",
      password: "",
      introduce: userInfo?.introduce || "",
    },
  });

  // 초기 사용자 정보 로드
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const updatedUserInfo = await getUserInfo();
        dispatch(setUserInfo(updatedUserInfo));
        setProfileImageUrl(
          updatedUserInfo.img_url || "/icons/ProfileExample.png"
        );
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (!userInfo) {
      fetchUserInfo();
    } else {
      setProfileImageUrl(userInfo.img_url || "/icons/ProfileExample.png");
    }
  }, [userInfo, dispatch]);

  // 이미지 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  // 폼 제출 핸들러
  const onSubmit = async (data: MyPageData) => {
    try {
      const formData = new FormData();
      formData.append("nickname", data.nickname);
      formData.append("introduce", data.introduce);
      formData.append("password", data.password);
      if (profileImage) {
        formData.append("image", profileImage);
      }

      // 서버에 프로필 업데이트 요청
      await updateUserProfile(formData);

      // 최신 사용자 정보 가져오기
      const updatedUserInfo = await getUserInfo();
      dispatch(setUserInfo(updatedUserInfo));
      setProfileImageUrl(updatedUserInfo.img_url);

      alert("회원 수정이 완료되었습니다.");
      router.push("/main");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("프로필 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="p-[3rem] rounded-lg h-full w-full max-w-[600px] flex flex-col gap-10">
      <Heading tag="h1" className="text-center">
        내정보
      </Heading>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="bg-white w-[250px] h-[250px] rounded-[50%] flex justify-center items-center border overflow-hidden">
          <Image
            src={
              profileImage
                ? URL.createObjectURL(profileImage) // 선택된 이미지 미리보기
                : profileImageUrl || "/icons/ProfileExample.png" // 서버 이미지 또는 기본 이미지
            }
            alt="프로필 이미지"
            width={250}
            height={250}
            priority
            onError={(e) => {
              e.currentTarget.src = "/icons/ProfileExample.png";
            }}
          />
        </div>
        <label
          htmlFor="profileImage"
          className="font-bold px-6 py-3 rounded-2xl transition duration-300 ease-in-out bg-sand text-brown hover:shadow-lg cursor-pointer"
        >
          프로필 이미지 변경
        </label>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-black mb-2 ">Mail</label>
        <input
          id="user_email"
          className="relative p-3 rounded-lg bg-lightgray focus:outline-none  "
          value={`${userInfo?.email}`}
          readOnly
          //값만 보여줌 폼데이터에 안들어감
        />
      </div>

      <div className="flex flex-col">
        <label className="text-black mb-2 ">Name</label>
        <input
          id="user_name"
          className="relative p-3 rounded-lg bg-lightgray focus:outline-none  "
          value={`${userInfo?.name}`}
          readOnly
          //값만 보여줌 폼데이터에 안들어감
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="user_nickname"
          label="NickName"
          type="text"
          placeholder="별명을 입력해주세요."
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
        </div>
      </form>
      <UserDeleteButton />
    </div>
  );
};

export default MyPageForm;
