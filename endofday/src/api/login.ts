import { LoginFormData } from "@/utils/registrationSchema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (data: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
