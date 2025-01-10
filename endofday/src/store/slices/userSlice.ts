import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  name: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: null,
  name: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ id: number; name: string }>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.id = null;
      state.name = "";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
