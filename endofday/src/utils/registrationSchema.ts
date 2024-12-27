import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(2, "이름을 입력하세요"),
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

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
