import axios from "axios";
import {DiaryEntry} from "@/types/diary";
// 임시 로그인구현
export const login = async () => {
    try {
        const response = await axios.post("http://3.38.93.178/users/login?email=hj19941221%40gmail.com&password=mokasarang", {});
        localStorage.setItem("token2", response.data.access_token); // 로컬 스토리지에 저장
        console.log(response.data.access_token);
    } catch (error) {
        console.error("로그인 실패:", error);
    }
};
// 일기 전송
export const sendDiary = async (formData: FormData): Promise<DiaryEntry> => {
    const token = localStorage.getItem("token2");

    if (!token) {
        throw new Error("로그인 토큰이 없습니다.");
    }
    try {
        const response = await axios.post<DiaryEntry>("http://3.38.93.178/diary", formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "서버 요청 중 문제가 발생했습니다.");
        } else {
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
    }
};

// 일기 조회
