import {useMutation} from "@tanstack/react-query";
import {sendDiary} from "@/api/diary";

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
