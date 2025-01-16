"use server";

import { LoginFormData } from "@/utils/registrationSchema";
import { cookies } from "next/headers";

export const login = async (data: LoginFormData) => {
  const cookieStore = cookies();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `로그인에 실패했습니다. 아이디 혹은 비밀번호를 확인해주세요.`
    );
  }

  const token = await response.json();

  cookieStore.set("access_token", token.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  cookieStore.set("refresh_token", token.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};
