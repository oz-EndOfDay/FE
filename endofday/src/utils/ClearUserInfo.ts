"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearAuth } from "@/store/auth/authSlice";

export const ClearUserInfo = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // 쿠키에서 'access_token'을 삭제
    document.cookie = "access_token=; max-age=0; path=/;";

    // 로컬스토리지에서 유저 정보 삭제
    dispatch(clearAuth());

    // 페이지 리디렉션
    router.push("/"); // 또는 홈 페이지로 이동
  }, [router, dispatch]);

  return null; // 이 컴포넌트는 화면에 렌더링할 요소를 반환하지 않음
};
