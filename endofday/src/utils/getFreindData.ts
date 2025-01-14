type FriendItem = {
    id: number;
    is_accept: boolean;
    ex_diary_cnt: number;
    last_ex_date: string | null;
    created_at: string;
    friend_nickname: string | null;
    friend_profile_img: string | null;
};

export const getFriendData = (friendList: FriendItem[], friendId: number) => {
    const friendData = friendList.find(friend => friend.id === friendId);

    return friendData;
};
