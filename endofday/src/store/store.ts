import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage, // 로컬 스토리지 사용
  whitelist: ["auth"], // 'auth' 슬라이스만 저장하려면 whitelist 사용
};
const rootReducer = combineReducers({
  auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
