"use server";
import { cookies } from "next/headers";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const cookieStore = cookies();
const accessToken = cookieStore.get("access_token")?.value;
export const fetchDeletedDiaries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/diary/deleted`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 응답 데이터를 반환
    const data = await response.json();
    return data.diaries; // 일기 배열을 반환
  } catch (error) {
    console.error("삭제된 일기 가져오기 실패:", error);
    throw new Error("삭제된 일기를 가져오지 못했습니다.");
  }
};

export const handleRestore = async (diary_id: number) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(`${API_BASE_URL}/diary/${diary_id}/restore`, {
      method: "PATCH", // 복구 요청은 PATCH로 보냄
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`복구 실패: ${response.status}`);
    }
    await response.json();
  } catch (error) {
    console.error("복구 실패:", error);
    throw new Error("삭제된 일기를 가져오지 못했습니다.");
  }
};
