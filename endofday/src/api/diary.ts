"use server";
import {DiaryQueryParams} from "@/types/diary";
import {DiaryDetailEntry, DiaryResponse, EmotionAnalysisResponse} from "@/types/diary";
import {cookies} from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 일기 전송
export const sendDiary = async (formData: FormData): Promise<void> => {
    // 토큰가져오기
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    console.log("전송할때 토큰 잘들어오니?", accessToken);
    if (!accessToken) throw new Error("로그인이 필요합니다.");

    try {
        const response = await fetch(`${API_BASE_URL}/diary`, {
            method: "POST",
            credentials: "omit", // 쿠키 전송 활성화
            headers: {
                Authorization: `Bearer ${accessToken}`, // 공백 확인!
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
    } catch (error) {
        console.error("일기 전송 실패:", error);
        throw new Error("Failed to write diary");
    }
};

// 일기 조회
export const fetchDiaries = async (params: DiaryQueryParams = {}): Promise<DiaryResponse> => {
    // 토큰가져오기
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    try {
        const {word = "", year, month, page = 1, size = 6} = params;

        // page, size 기본으로 쿼리 추가
        const queryParams = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
        });
        // 다른 옵션들 값이 있을때만 추가
        if (word.trim()) queryParams.append("word", word);
        if (year !== undefined) queryParams.append("year", year.toString());
        if (month !== undefined) queryParams.append("month", month.toString());

        const response = await fetch(`${API_BASE_URL}/diary?${queryParams}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`일기 목록 조회 실패: ${error.message}`);
        }
        throw new Error("알 수 없는 에러가 발생했습니다.");
    }
};

// 개별일기조회
export const fetchDiaryById = async (id: number): Promise<DiaryDetailEntry> => {
     // 토큰가져오기
     const cookieStore = cookies();
     const accessToken = cookieStore.get("access_token")?.value;
 

    try {
        const response = await fetch(`${API_BASE_URL}/diary/${id}`, {
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
        console.error("일기 조회 실패:", error);
        throw new Error("일기 조회에 실패했습니다.");
    }
};

// 일기 삭제
export const deleteDiaryById = async (id: number): Promise<void> => {
    // 토큰가져오기
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    try {
        const response = await fetch(`${API_BASE_URL}/diary/${id}`, {
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
        console.error("일기 삭제 실패:", error);
        throw new Error("일기 삭제 실패했습니다.");
    }
};

// 일기 감정분석 및 조언
export const analyzeDiaryById = async (id: number): Promise<EmotionAnalysisResponse> => {
    // 토큰가져오기
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    try {
        const response = await fetch(`${API_BASE_URL}/diary/${id}/analysis`, {
            method: "POST",
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
        console.error("감정 분석 실패:", error);
        throw new Error("감정 분석 요청에 실패했습니다.");
    }
};
