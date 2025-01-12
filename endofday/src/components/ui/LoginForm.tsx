"use client";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/utils/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SmallButton from "@/components/ui/SmallButton";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "@/api/login";
import { setToken, setUserInfo } from "@/store/auth/authSlice";
import { getUserInfo } from "@/api/user";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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
    try {
      const signin = await login(data);
      dispatch(setToken(signin.access_token));
      console.log(signin.access_token);
      const userInfo = await getUserInfo(signin.access_token);

      dispatch(setUserInfo(userInfo));
      if (!signin?.access_token) {
        throw new Error("서버와 통신이 원할하지 않습니다.");
      }
      // 사용자 정보 검증: 유저 정보가 없으면 에러 발생
      if (!userInfo) {
        throw new Error(
          "사용자 정보를 받아오지 못했습니다. 다시 시도 해주세요."
        );
      }
      alert("로그인 성공");
      router.push("/main");
    } catch (Error) {
      alert("로그인 실패: " + Error);
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
      </form>
    </div>
  );
};

export default LoginForm;
