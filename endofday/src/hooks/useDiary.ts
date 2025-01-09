import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {sendDiary} from "@/api/diary";
import {DiaryEntry} from "@/types/diary";

export const useSendDiary = (): UseMutationResult<DiaryEntry, Error, FormData> => {
    return useMutation<DiaryEntry, Error, FormData>({
      mutationFn: sendDiary,
      onSuccess: (data) => {
        console.log("다이어리 전송 성공:", data);
      },
      onError: (error: Error) => {
        console.error("다이어리 전송 실패:", error.message);
      },
    });
  };
