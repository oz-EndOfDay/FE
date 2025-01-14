import {useMutation, useQuery} from "@tanstack/react-query";
import {sendExDiary, fetchExDiaries, fetchExDiaryById, deleteExDiaryById, fetchExFriends} from "@/api/exdiary";

// 교환일기 친구목록 get
export const useExGetFriend = () => {
    return useQuery({
        queryKey: ["exdiaries"],
        queryFn: () => fetchExFriends(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        placeholderData: previousData => previousData,
    });
};

// 교환일기 post
export const useExSendDiary = () => {
    return useMutation({
        mutationFn: sendExDiary,
    });
};

// 교환일기 목록 get
export const useExFetchDiary = (friend_id: number) => {
    return useQuery({
        queryKey: ["exdiaries", friend_id],
        queryFn: () => fetchExDiaries(friend_id),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        enabled: !!friend_id,
        placeholderData: previousData => previousData,
    });
};

// 교환일기상세조회
export const useDiaryById = (friend_id: number, ex_diary_id: number) => {
    return useQuery({
        queryKey: ["diary", friend_id, ex_diary_id],
        queryFn: () => fetchExDiaryById(friend_id, ex_diary_id),
        enabled: !!friend_id && !!ex_diary_id,
        staleTime: 1000 * 60 * 5,
    });
};

// 교환일기 삭제
export const useDeleteDiary = () => {
    return useMutation({
        mutationFn: ({friend_id, ex_diary_id}: {friend_id: number; ex_diary_id: number}) => deleteExDiaryById(friend_id, ex_diary_id),
    });
};
