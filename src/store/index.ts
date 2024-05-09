import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import contentReducer from "./slices/contentSlice";
import toastReducer from "./slices/toastSlice"

const store = configureStore({
  reducer: {
    authReducer,
    contentReducer,
    toastReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
