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
        queryKey: ["diaries", params],
        queryFn: () => fetchDiaries(params),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        enabled: !!params, // params가 있을 때만 실행
        placeholderData: previousData => previousData, // 이전 데이터 유지
        // ✅ 자동 업데이트 추가 옵션
        refetchOnMount: true, // 컴포넌트 마운트 시 자동 새로고침
        refetchOnWindowFocus: true, // 창이 포커스 될 때 자동 새로고침
        refetchInterval: 1000 * 60, // 1분마다 자동 새로고침
        refetchIntervalInBackground: true, // 창이 백그라운드일 때도 새로고침
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
