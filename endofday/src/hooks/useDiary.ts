import {useMutation, useQuery} from "@tanstack/react-query";
import {sendDiary, fetchDiaries} from "@/api/diary";
import {DiaryQueryParams} from "@/types/diary";

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
