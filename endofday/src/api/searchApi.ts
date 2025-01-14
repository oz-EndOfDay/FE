const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface SearchedUser {
  id: number;
  nickname: string;
  email: string;
}

export async function searchUsers(word: string): Promise<SearchedUser[]> {
  const res = await fetch(`${BASE_URL}/users/search`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ word }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("searchUsers error body:", errorText);

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error(`Failed to search users. Code=${res.status}, body=${errorText}`);
  }
  return res.json();
}
