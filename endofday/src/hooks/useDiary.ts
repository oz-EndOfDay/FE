import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {sendDiary} from "@/api/diary";
import {DiaryFormData} from "@/utils/diarySchema";

export const useSendDiary = (): UseMutationResult<void, Error, DiaryFormData> => {
    return useMutation<void, Error, DiaryFormData>({
        mutationFn: sendDiary,
        onSuccess: () => {
            console.log("다이어리 전송 성공");
        },
        onError: (error: Error) => {
            console.error("다이어리 전송 실패:", error.message);
        },
    });
};
