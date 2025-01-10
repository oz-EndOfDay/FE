const BASE_URL = "http://3.38.93.178";

/** 친구 목록 조회 : GET /friends */
export const fetchFriends = async () => {
  const res = await fetch(`${BASE_URL}/friends`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch friends");
  }
  return res.json();
};

/** 친구 신청: POST /friends/{user_id} */
export const addFriend = async (userId: number) => {
  const res = await fetch(`${BASE_URL}/friends/${userId}`, {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Failed to add friend");
  }
  return res.json();
};

/** 받은 친구 요청 리스트 조회: GET /friends/get_request */
export const fetchReceivedRequests = async () => {
  const res = await fetch(`${BASE_URL}/friends/get_request`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch received friend requests");
  }
  return res.json();
};

/** 보낸 친구 요청 리스트 조회: GET /friends/send_request */
export const fetchSentRequests = async () => {
  const res = await fetch(`${BASE_URL}/friends/send_request`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch sent friend requests");
  }
  return res.json();
};

/** 받은 친구 요청 수락: PATCH /friends/{friend_id} */
export const acceptFriendRequest = async (friendId: number) => {
  const res = await fetch(`${BASE_URL}/friends/${friendId}`, {
    method: "PATCH",
  });
  if (!res.ok) {
    throw new Error("Failed to accept friend request");
  }
  return res.json();
};

/** 친구 삭제: DELETE /friends/{friend_id} */
export const deleteFriend = async (friendId: number) => {
  const res = await fetch(`${BASE_URL}/friends/${friendId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete friend");
  }
  return res.json();
};
