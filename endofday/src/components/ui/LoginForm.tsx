import Input from "@/components/ui/Input";
import Button from "./Button";
import SmallButton from "./SmallButton";
import Heading from "./Heading";

const LoginForm = () => {
    return (
        <div className="bg-white py-[3rem] px-[3rem] rounded-lg h-full flex flex-col justify-between shadow-md">
            <form className="space-y-4">
                <Heading
                    tag="h2"
                    className="text-center"
                >
                    로그인
                </Heading>
                <Input
                    id="user_email"
                    label="Email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                />
                <Input
                    id="user_password"
                    label="Password"
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                />
                <p className="text-sm text-gray mt-1">비밀번호는 최소 8글자 이상이어야 합니다.</p>

                <div className="flex flex-col !mt-[3.25rem] space-y-4 items-center">
                    <Button type="submit">로그인</Button>
                    <Button
                        type="submit"
                        variant="sand"
                    >
                        카카오로 로그인
                    </Button>
                    <SmallButton
                        type="submit"
                        variant="text"
                    >
                        비밀번호 찾기
                    </SmallButton>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
