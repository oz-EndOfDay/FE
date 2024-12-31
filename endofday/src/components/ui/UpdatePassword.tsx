"use client";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import {
  RegistrationFormData,
  registrationSchema,
} from "@/utils/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: RegistrationFormData) => {
    console.log("Form Data", data);
  };
  return (
    <div className="bg-white flex flex-col justify-center p-[3rem] rounded-lg  w-[30vw] h-[45vh] min-h-[450px] min-w-[500px] shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
        <Heading tag="h1" className="text-center">
          비밀번호 재설정
        </Heading>
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
            확인
          </Button>
        </div>
      </form>
    </div>
  );
};
