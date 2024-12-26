import {useState} from "react";
import Input from "@/components/ui/Input";
import Button from "./Button";
import Heading from "./Heading";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    return (
        <div className="bg-white py-[3rem] px-[3rem] rounded-lg h-full flex flex-col justify-between shadow-md">
            <form className="flex flex-col h-full space-y-4">
                <Heading
                    type="h2"
                    className="text-center"
                >
                    로그인
                </Heading>
                <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    placeholder="이메일을 입력해주세요"
                />
                <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    placeholder="비밀번호를 입력해주세요"
                />
                <p className="text-sm text-gray mt-1">비밀번호는 최소 8글자 이상이어야 합니다.</p>

                <div className="flex flex-col !mt-[3.25rem] space-y-4">
                    <Button type="submit">로그인</Button>
                    <Button
                        type="submit"
                        variant="sand"
                        className="w-full"
                    >
                        카카오로 로그인
                    </Button>
                    <Button
                        type="submit"
                        variant="text"
                        className="w-full"
                    >
                        비밀번호 찾기
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
