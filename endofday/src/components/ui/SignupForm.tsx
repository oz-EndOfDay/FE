"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegistrationFormData,
  registrationSchema,
} from "@/utils/registrationSchema";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      name: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: RegistrationFormData) => {
    console.log("Form Data", data);
  };
  console.log("에러", errors);

  return (
    <div className="bg-white p-[3rem] rounded-lg shadow-md h-full w-full max-w-[600px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
        <Heading tag="h2" className="text-center">
          회원가입
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
          id="user_name"
          label="Name"
          type="text"
          placeholder="이름을 입력해주세요"
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <Input
          id="user_nickname"
          label="NickName"
          type="text"
          placeholder="별명을 입력해주세요"
          {...register("nickname")}
        />
        {errors.nickname && (
          <p className="text-red-500">{errors.nickname.message}</p>
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
          <p className="text-red-500">{errors.confirmPassword.message} </p>
        )}
        <div className="flex flex-col !mt-[3.25rem] space-y-4 items-center">
          <Button type="submit" variant="sand">
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
