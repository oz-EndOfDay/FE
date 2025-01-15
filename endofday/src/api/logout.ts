"use server";

import { cookies } from "next/headers";

export const deleteCookies = () => {
  const cookieStore = cookies();

  // 삭제할 쿠키 이름 목록
  const cookieNames = ["access_token", "refresh_token"];

  cookieNames.forEach((cookieName) => {
    cookieStore.set(cookieName, "", {
      maxAge: -1, // 쿠키를 즉시 만료
      path: "/", // 쿠키의 경로 (기본 경로)
    });
  });
};
