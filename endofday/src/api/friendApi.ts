"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * 쿠키에서 access_token 가져옴. 없으면 Unauthorized
 */
function getAccessTokenOrThrow() {
  const token = cookies().get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  return token;
}

/**
 * 친구 목록 조회: GET /friends
 */
export async function fetchFriends() {
  const accessToken = getAccessTokenOrThrow();

  const res = await fetch(`${BASE_URL}/friends`, {
    method: "GET",
    // 서버끼리 통신이므로 credentials: "include" 크게 의미 X
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("fetchFriends error:", errorBody);

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error(`Failed to fetch friends. status=${res.status}`);
  }

  return res.json(); // { friends: [...] }
}

/**
 * 친구 신청: POST /friends/{user_id}
 */
export async function addFriend(userId: number) {
  const accessToken = getAccessTokenOrThrow();

  const res = await fetch(`${BASE_URL}/friends/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("addFriend error body:", errorText);

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error(
      `Failed to add friend. status=${res.status}, body=${errorText}`
    );
  }

  return res.json(); // { success: true, message: '...' }
}

/**
 * 받은 친구 요청 리스트 조회: GET /friends/get_request
 */
export async function fetchReceivedRequests() {
  const accessToken = getAccessTokenOrThrow();

  const res = await fetch(`${BASE_URL}/friends/get_request`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("fetchReceivedRequests error:", errorBody);

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch received friend requests.");
  }

  return res.json(); // { sent_requests: [...] }
}

/**
 * 보낸 친구 요청 리스트 조회: GET /friends/send_request
 */
export async function fetchSentRequests() {
  const accessToken = getAccessTokenOrThrow();

  const res = await fetch(`${BASE_URL}/friends/send_request`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("fetchSentRequests error:", errorBody);

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch sent friend requests.");
  }
  return res.json();
}

/**
 * 받은 친구 요청 수락: PATCH /friends/{friend_id}
 */
export async function acceptFriendRequest(friendId: number) {
  const accessToken = getAccessTokenOrThrow();

  const res = await fetch(`${BASE_URL}/friends/${friendId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("acceptFriendRequest error body:", errorText);

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error(
      `Failed to accept friend request. status=${res.status}, body=${errorText}`
    );
  }

  return res.json();
}

/**
 * 친구 삭제: DELETE /friends/{friend_id}
 */
export async function deleteFriend(friendId: number) {
  const accessToken = getAccessTokenOrThrow();

  const res = await fetch(`${BASE_URL}/friends/${friendId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("deleteFriend error body:", errorText);

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error(
      `Failed to delete friend. status=${res.status}, body=${errorText}`
    );
  }

  return res.json();
}

/** 유저 검색 결과 타입 */
export interface SearchedUser {
  id: number;
  nickname: string;
  email: string;
}

/**
 * 유저 검색: POST /users/search (x-www-form-urlencoded)
 */
export async function searchUsers(word: string): Promise<SearchedUser[]> {
  const accessToken = getAccessTokenOrThrow();

  const res = await fetch(`${BASE_URL}/users/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${accessToken}`,
    },
    body: new URLSearchParams({ word }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("searchUsers error body:", errorText);

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error(
      `Failed to search users. status=${res.status}, body=${errorText}`
    );
  }

  return res.json();
}
