"use server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const cookieStore = cookies();
const accessToken = cookieStore.get("access_token")?.value;

export const fetchEmotionData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/diary/mood-stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("데이터를 가져오는 데 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    alert("Error fetching emotion data:" + error);
  }
};
