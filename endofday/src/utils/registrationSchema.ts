import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z.string().min(2, "이름을 입력하세요"),
    email: z.string().email("유효한 이메일 주소를 입력하세요"),
    nickname: z.string().min(1, "별명을 입력해주세요"),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .regex(/[a-z]/, "비밀번호에는 최소 하나의 소문자가 포함되어야 합니다")
      .regex(/[0-9]/, "비밀번호에는 최소 하나의 숫자가 포함되어야 합니다")
      .regex(
        /[!@#$%^?]/,
        "비밀번호에는 최소 하나의 특수문자(!,@,#,$,%,^,?)가 포함되어야 합니다"
      ),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력하세요"),

  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .regex(/[a-z]/, "비밀번호에는 최소 하나의 소문자가 포함되어야 합니다")
    .regex(/[0-9]/, "비밀번호에는 최소 하나의 숫자가 포함되어야 합니다")
    .regex(
      /[!@#$%^?]/,
      "비밀번호에는 최소 하나의 특수문자(!,@,#,$,%,^,?)가 포함되어야 합니다"
    ),
});

export const mypageSchema = z.object({
  nickname: z.string().min(1, "별명을 입력해주세요"),
  introduce: z.string().min(1, "프로필 소개를 입력해주세요"),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .regex(/[a-z]/, "비밀번호에는 최소 하나의 소문자가 포함되어야 합니다")
    .regex(/[0-9]/, "비밀번호에는 최소 하나의 숫자가 포함되어야 합니다")
    .regex(
      /[!@#$%^?]/,
      "비밀번호에는 최소 하나의 특수문자(!,@,#,$,%,^,?)가 포함되어야 합니다"
    ),
});

export type MyPageData = z.infer<typeof mypageSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
