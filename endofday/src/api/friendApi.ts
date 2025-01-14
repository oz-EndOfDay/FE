"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 인터페이스들 (예시)
export interface FriendListResponse {
  friends: {
    id: number;
    is_accept: boolean;
    ex_diary_cnt: number;
    last_ex_date: string | null;
    created_at: string;
    friend_nickname: string | null;
    friend_profile_img: string | null;
  }[];
}

export interface FriendRequestsResponse {
  sent_requests: {
    id: number;
    friend_nickname: string | null;
    friend_profile_img: string | null;
    created_at: string;
  }[];
}

export interface AddFriendResponse {
  success: boolean;
  message: string;
}

// 로그인되어 발급받은 토큰 쿠키가 없으면 에러
function getAccessTokenOrThrow(): string {
  const token = cookies().get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  return token;
}

/**
 * 친구 목록 조회: GET /friends
 * 반환 타입을 제네릭 T로 하거나, FriendListResponse로 지정
 */
export async function fetchFriends(): Promise<FriendListResponse> {
  const accessToken = getAccessTokenOrThrow();

  const res = await fetch(`${BASE_URL}/friends`, {
    method: "GET",
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

  return (await res.json()) as FriendListResponse;
}

/**
 * 친구 신청: POST /friends/{user_id}
 */
export async function addFriend(userId: number): Promise<AddFriendResponse> {
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

  return (await res.json()) as AddFriendResponse;
}

/**
 * 받은 친구 요청 리스트 조회: GET /friends/get_request
 */
export async function fetchReceivedRequests(): Promise<FriendRequestsResponse> {
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

  return (await res.json()) as FriendRequestsResponse;
}

/**
 * 보낸 친구 요청 리스트 조회: GET /friends/send_request
 */
export async function fetchSentRequests(): Promise<FriendRequestsResponse> {
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
  return (await res.json()) as FriendRequestsResponse;
}

/**
 * 받은 친구 요청 수락: PATCH /friends/{friend_id}
 */
export async function acceptFriendRequest(friendId: number): Promise<void> {
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
  // API 스펙 상 별도 json 반환 없으면 생략 가능
  // return res.json();
}

/**
 * 친구 삭제: DELETE /friends/{friend_id}
 */
export async function deleteFriend(friendId: number): Promise<void> {
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
  // return res.json(); if the server returns something
}

/** 유저 검색 결과 타입 */
export interface SearchedUser {
  id: number;
  nickname: string;
  email: string;
}

/**
 * 유저 검색: POST /users/search (x-www-form-urlencoded)
 * 반환: SearchedUser[]
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

  return (await res.json()) as SearchedUser[];
}
