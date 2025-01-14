"use server";
import {ExDiaryListResponse, ExDiaryDetailEntry, ExFriendListResponse} from "@/types/diary";
import {cookies} from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 교환일기 친구목록 조회
export const fetchExFriends = async (): Promise<ExFriendListResponse> => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    try {
        const response = await fetch(`${API_BASE_URL}/friends`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("교환일기 목록 조회 실패:", error);
        throw new Error("교환일기 목록 조회에 실패했습니다.");
    }
};

// 교환일기 작성
export const sendExDiary = async ({formData, friendId}: {formData: FormData; friendId: number}): Promise<void> => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) throw new Error("로그인이 필요합니다.");

    try {
        const response = await fetch(`${API_BASE_URL}/ex_diary/${friendId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
    } catch (error) {
        console.error("교환일기 전송 실패:", error);
        throw new Error("Failed to write diary");
    }
};

// 교환일기 목록 조회
export const fetchExDiaries = async (friend_id: number): Promise<ExDiaryListResponse> => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    try {
        const response = await fetch(`${API_BASE_URL}/ex_diary/${friend_id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("교환일기 목록 조회 실패:", error);
        throw new Error("교환일기 목록 조회에 실패했습니다.");
    }
};

// 교환일기 상세조회
export const fetchExDiaryById = async (friend_id: number, ex_diary_id: number): Promise<ExDiaryDetailEntry> => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    try {
        const response = await fetch(`${API_BASE_URL}/ex_diary/${friend_id}/${ex_diary_id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("교환일기 상세조회 실패:", error);
        throw new Error("교환일기 상세조회에 실패했습니다.");
    }
};

// 교환일기 삭제
export const deleteExDiaryById = async (friend_id: number, ex_diary_id: number): Promise<void> => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    try {
        const response = await fetch(`${API_BASE_URL}/ex_diary/${friend_id}/${ex_diary_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("교환일기 삭제 실패:", error);
        throw new Error("교환일기 삭제 실패했습니다.");
    }
};
