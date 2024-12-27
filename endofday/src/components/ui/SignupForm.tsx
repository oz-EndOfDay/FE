import Input from "@/components/ui/Input";
import Button from "./Button";
import Heading from "./Heading";

const SignupForm = () => {
  return (
    <div className="bg-white py-[3rem] px-[3rem] rounded-lg h-full flex flex-col justify-between shadow-md">
      <form className="space-y-4">
        <Heading tag="h2" className="text-center">
          회원가입
        </Heading>
        <Input
          id="user_email"
          label="Email"
          type="email"
          placeholder="이메일을 입력해주세요"
          required
        />
        <Input
          id="user_name"
          label="Name"
          type="text"
          placeholder="이름을 입력해주세요"
        />
        <Input
          id="user_nickname"
          label="NickName"
          type="text"
          placeholder="별명을 입력해주세요"
        />
        <Input
          id="user_password"
          label="Password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <Input
          id="user_password"
          label="Password"
          type="password"
          placeholder="비밀번호 확인"
        />

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
