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
  token: string | null;
  refreshToken: string | null;
  userInfo: UserInfo | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
    },
    clearAuth(state) {
      state.token = null;
      state.refreshToken = null;
      state.userInfo = null;
    },
  },
});

export const { setToken, setRefreshToken, setUserInfo, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
