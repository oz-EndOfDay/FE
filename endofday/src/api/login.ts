"use server";

import { LoginFormData } from "@/utils/registrationSchema";
import { cookies } from "next/headers";

export const login = async (data: LoginFormData) => {
  const cookieStore = await cookies();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`등록되지 않은 회원입니다.`);
  }

  const token = await response.json();
  cookieStore.set("accessToken", token.access_token, {
    httpOnly: true,
    secure: true,
  });
  cookieStore.set("refreshToken", token.refresh_token, {
    httpOnly: true,
    secure: true,
  });

  return token;
};
