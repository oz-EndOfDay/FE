import React from "react";

const SignUp = () => {
  return (
    <div className=" w-[90vw] h-[100vh] flex flex-col justify-center items-center gap-10">
      <form className="flex flex-col gap-6 justify-center items-center bg-white p-24 w-[700px] h-[800px] rounded-xl shadow-lg">
        <p className="font-bold text-4xl">회원가입</p>
        <label className="flex flex-col gap-2 w-full">
          Email
          <input
            className="bg-[#F2F4F8] border-b-[#C1C7CD] border-solid border-b-[1px] flex gap- h-[48px] w-full px-[16px] py-[12px]"
            type="email"
            placeholder="이메일 주소를 입력해주세요"
            required
          />
        </label>
        <label className="flex flex-col gap-2 w-full">
          Name
          <input
            className="bg-[#F2F4F8] border-b-[#C1C7CD] border-solid border-b-[1px] flex gap- h-[48px] w-full px-[16px] py-[12px]"
            type="input"
            placeholder="이름을 입력해주세요"
            required
          />
        </label>
        <label className="flex flex-col gap-2 w-full">
          NickName
          <input
            className="bg-[#F2F4F8] border-b-[#C1C7CD] border-solid border-b-[1px] flex gap- h-[48px] w-full px-[16px] py-[12px]"
            type="input"
            placeholder="별명을 입력해주세요"
            required
          />
        </label>
        <label className="flex flex-col gap-2 w-full">
          Password
          <input
            className="bg-[#F2F4F8] border-b-[#C1C7CD] border-solid border-b-[1px] flex gap- h-[48px] w-full px-[16px] py-[12px]"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </label>
        <label className="flex flex-col gap-2 w-full">
          Password Confirm
          <input
            className="bg-[#F2F4F8] border-b-[#C1C7CD] border-solid border-b-[1px] flex gap- h-[48px] w-full px-[16px] py-[12px]"
            type="password"
            placeholder="비밀번호 확인"
            required
          />
        </label>
        <button className="bg-[#E8CCA9] w-full p-3 rounded-md font-semibold">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
