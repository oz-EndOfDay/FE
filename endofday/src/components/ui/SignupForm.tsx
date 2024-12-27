import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegistrationFormData,
  registrationSchema,
} from "@/utils/registrationSchema";
import Input from "@/components/ui/Input";
import Button from "./Button";
import Heading from "./Heading";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });
  const onSubmit = (data: RegistrationFormData) => {
    console.log("Form Data", data);
  };
  return (
    <div className="bg-white py-[3rem] px-[3rem] rounded-lg h-full flex flex-col justify-between shadow-md">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Heading tag="h2" className="text-center">
          회원가입
        </Heading>
        <Input
          id="user_email"
          label="Email"
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
          required
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <Input
          id="user_name"
          label="Name"
          type="text"
          placeholder="이름을 입력해주세요"
          {...register("name")}
          required
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <Input
          id="user_nickname"
          label="NickName"
          type="text"
          placeholder="별명을 입력해주세요"
          {...register("nickname")}
          required
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
          required
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
          <Button type="submit" variant="sand">
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
