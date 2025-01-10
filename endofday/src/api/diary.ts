import {DiaryQueryParams} from "@/types/diary";
import {DiaryResponse} from "@/types/diary";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 일기 전송
export const sendDiary = async (formData: FormData): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/diary`, {
            method: "POST",
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
        });

        if (!response.ok) {
            const error = await response.json().catch(() => response.text());
            throw new Error(typeof error === "string" ? error : error.message || "일기 목록을 가져오는데 실패했습니다.");
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`일기 목록 조회 실패: ${error.message}`);
        }
        throw new Error("알 수 없는 에러가 발생했습니다.");
    }
};
