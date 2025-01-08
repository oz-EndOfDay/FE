"use client";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/utils/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import SmallButton from "@/components/ui/SmallButton";
import Link from "next/link";

const LoginForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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
  const onSubmit = async (data: LoginFormData) => {
    setSuccessMessage(null);
    console.log("API 요청 URL:", `${API_BASE_URL}/users/login`);
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/login?email=${data.email}&password=${data.password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        document.cookie = `token=${result.token}; path=/; secure; HttpOnly`;
        setSuccessMessage("로그인 성공! 메인 페이지로 이동합니다.");
        // setTimeout(() => (window.location.href = "/main"), 1000);
      } else {
        const error = await response.json();
        alert("에러" + error.message);
      }
    } catch (err) {
      console.error("오류발생:", err);
      alert("네트워크 연결이 원활하지 않습니다.");
    }
  };

  return (
    <div className="bg-white py-[3rem] px-[3rem] rounded-lg h-full flex flex-col justify-between shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Heading tag="h2" className="text-center">
          로그인
        </Heading>
        <Input
          id="user_email"
          label="Email"
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input
          id="user_password"
          label="Password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          autoComplete="off"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <div className="flex flex-col !mt-[3.25rem] space-y-4 items-center">
          <Button type="submit">로그인</Button>
          <Button variant="sand">카카오로 로그인</Button>
          <Link href={"/foundpassword"}>
            <SmallButton variant="text">비밀번호 찾기</SmallButton>
          </Link>
        </div>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
