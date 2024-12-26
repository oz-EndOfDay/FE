"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center gap-40 items-center">
      <div className="flex flex-col gap-6 w-[600px] h-[700px] ">
        <div className="flex-1 flex flex-col gap-5 ">
          <div className="pt-20 flex flex-col gap-2">
            <h2 className="text-4xl font-bold">하루 끝,</h2>
            <h2 className="text-4xl font-bold">
              당신만의 이야기를 채워보세요.
            </h2>
          </div>
          <div>
            <p className="text-xl">아직 회원이 아니시라면,</p>
            <p className="text-xl">오늘의 첫 기록을 남겨보세요.</p>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-end">
          <Link href="/signup" className="w-full">
            <button className="bg-[#545f71] w-full text-white p-4 rounded-lg">
              회원가입하러가기
            </button>
          </Link>
        </div>
      </div>
      <div className=" w-[40vw] h-[100vh] flex flex-col justify-center items-center gap-10">
        <form className="flex flex-col gap-10 justify-center items-center bg-white p-20 w-[700px] h-[700px] rounded-xl shadow-lg">
          <p className="font-bold text-4xl">로그인</p>
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
            Password
            <input
              className="bg-[#F2F4F8] border-b-[#C1C7CD] border-solid border-b-[1px] flex gap- h-[48px] w-full px-[16px] py-[12px]"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              required
            />
          </label>
          <div className="flex flex-col justify-center items-center w-full gap-5 pt-7">
            <button className="bg-[#E8CCA9] w-full p-3 rounded-md font-semibold">
              로그인
            </button>
            <button className="bg-[#E8CCA9] w-full p-3 rounded-md font-semibold">
              카카오로 로그인
            </button>
            <button className="bg-[#E8CCA9] w-full p-3 rounded-md font-semibold">
              비밀번호 찾기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
