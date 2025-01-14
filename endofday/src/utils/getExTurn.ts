import {ExDiaryListResponse} from "@/types/diary";

export const getExTurn = (diaryListResponse: ExDiaryListResponse = {diaries: []}, ex_diary_cnt: number) => {
    // 일기 데이터가 없거나 교환일기 수가 0이면 내 차례
    if (!diaryListResponse || diaryListResponse.diaries.length === 0 || ex_diary_cnt === 0) {
        return "내 차례";
    }
    // 가장 최근 작성된 일기를 가져옴
    const lastDiary = diaryListResponse.diaries[diaryListResponse.diaries.length - 1];
    console.log(lastDiary, "라스트다이어리");
    // 최근 작성자가 "Me"면 친구 차례, 아니면 내 차례
    return lastDiary.author === "Me" ? "친구 차례" : "내 차례";
};
