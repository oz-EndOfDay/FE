import {useMutation, useQuery} from "@tanstack/react-query";
import {sendDiary, fetchDiaries, fetchDiaryById, deleteDiaryById, analyzeDiaryById} from "@/api/diary";
import {DiaryQueryParams, EmotionAnalysisResponse} from "@/types/diary";

// 일기 post
export const useSendDiary = () => {
    return useMutation<void, Error, FormData>({
        mutationFn: sendDiary,
        onSuccess: () => {
            console.log("다이어리 전송 성공");
        },
        onError: (error: Error) => {
            console.error("다이어리 전송 실패:", error.message);
        },
    });
};

// 일기 get
export const useFetchDiary = (params: DiaryQueryParams) => {
    return useQuery({
        queryKey: ["diaries", params], // 고유 키
        queryFn: () => fetchDiaries(params),
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선하게 유지
        gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
        retry: 1, // 실패 시 1회 재시도
        enabled: !!params, // params가 있을 때만 실행
        placeholderData: previousData => previousData, // 이전 데이터 유지
    });
};

// 일기상세
export const useDiaryById = (id: number) => {
    return useQuery({
        queryKey: ["diary", id],
        queryFn: () => fetchDiaryById(id),
        enabled: !!id, // id 있을때만 호출
        staleTime: 1000 * 60 * 5,
    });
};

// 일기 삭제
export const useDeleteDiary = () => {
    return useMutation({
        mutationFn: (id: number) => deleteDiaryById(id),
    });
};

// 일기분석
export const useAnalyzeDiary = () => {
    return useMutation<EmotionAnalysisResponse, Error, number>({
        mutationFn: (id: number) => analyzeDiaryById(id),
    });
};
