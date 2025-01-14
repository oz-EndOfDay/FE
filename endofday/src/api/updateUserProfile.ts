"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const updateUserProfile = async (formData: FormData) => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  console.log(formData);

  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  console.log("생성된 게시물:", formData);
  console.log(
    `회원 정보를 가져오는데 실패했습니다. Error: ${response.status} - ${response.statusText}`
  );
  if (response.status !== 200) {
    throw new Error(`잘못 된 접근입니다. `);
  }

  console.log(response);

  return response.json();
};
