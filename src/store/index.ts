import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import contentReducer from "./slices/contentSlice";

const store = configureStore({
  reducer: {
    authReducer,
    contentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
