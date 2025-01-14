"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchWithToken = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(
      `로그인에 실패했습니다. Error: ${response.status} - ${response.statusText}`
    );
  }

  return await response.json();
};
