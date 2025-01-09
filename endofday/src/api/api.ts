import { LoginFormData } from "@/utils/registrationSchema";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (data: LoginFormData) => {
  const response = await axios.post(
    `${API_BASE_URL}/users/login?email=${data.email}&password=${data.password}`,
    data
  );
  return response.data;
};
