import { fetchWithToken } from "./fetchUtils";

export const getUserInfo = async (token: string) => {
  return await fetchWithToken("/users", token);
};
