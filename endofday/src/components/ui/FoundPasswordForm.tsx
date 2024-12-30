import Button from "./Button";
import Heading from "./Heading";
import Input from "./Input";

export const FoundPasswordForm = () => {
  return (
    <div className="bg-white flex flex-col justify-center py-[3rem] px-[3rem] rounded-lg  w-[25vw] h-[30vh] min-w-[500px] shadow-md">
      <form className="flex flex-col gap-2 ">
        <Heading tag="h1" className="text-center">
          비밀번호 찾기
        </Heading>
        <Input
          id="user_email"
          label="Email"
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        {/* 아이디 찾을때 백엔드에서 유효성 검사 필요(이메일 존재 여부) */}
        <div className="flex flex-col !mt-[3.25rem] space-y-4 items-center">
          <Button type="submit" variant="sand">
            확인
          </Button>
        </div>
      </form>
    </div>
  );
};
