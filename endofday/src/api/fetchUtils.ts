const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchWithToken = async (
  endpoint: string,
  token: string,
  options: RequestInit = {}
) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response}`);
  }

  return await response.json();
};
