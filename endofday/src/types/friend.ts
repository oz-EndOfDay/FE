export interface FriendItem {
    id: number;
    is_accept: boolean;
    ex_diary_cnt: number;
    last_ex_date: string | null;
    created_at: string;
    friend_nickname: string | null;
    friend_profile_img: string | null;
    friend_introduce?: string | null;
}
