import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserInfo {
  id: string;
  nickname: string;
  name: string;
  email: string;
  introduce: string;
  img_url: string;
}

interface AuthState {
  userInfo: UserInfo | null;
}

const initialState: AuthState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
