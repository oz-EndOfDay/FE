import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { useForm } from "react-hook-form";
import {
  RegistrationFormData,
  registrationSchema,
} from "@/utils/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import SmallButton from "@/components/ui/SmallButton";
import Link from "next/link";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      loginpassword: "",
    },
  });
  const onSubmit = (data: RegistrationFormData) => {
    console.log("Form Data", data);
  };
  console.log(errors);
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
          {...register("loginpassword")}
        />
        {errors.loginpassword && (
          <p className="text-red-500">{errors.loginpassword.message}</p>
        )}
        <div className="flex flex-col !mt-[3.25rem] space-y-4 items-center">
          <Button type="submit">로그인</Button>
          <Button variant="sand">카카오로 로그인</Button>
          <Link href={"/foundpassword"}>
            <SmallButton variant="text">비밀번호 찾기</SmallButton>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
