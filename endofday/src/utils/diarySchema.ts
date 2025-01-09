import {z} from "zod";

export const diarySchema = z.object({
    title: z.string().min(1, "제목을 입력해주세요"),
    write_date: z.string().min(1, "날짜를 선택해주세요"),
    weather: z.string().min(1, "날씨를 선택해주세요"),
    mood: z.string().min(1, "기분을 선택해주세요"),
    content: z.string().min(1, "내용을 입력해주세요"),
    image: z.instanceof(File).nullable().optional(), // 이미지 필드는 선택사항
});

export type DiaryFormData = z.infer<typeof diarySchema>;
