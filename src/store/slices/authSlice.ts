import { createSlice } from "@reduxjs/toolkit";
import { isAuthorized, isAdmin } from "../../utils/auth";

interface InitialStateType {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const initialState: InitialStateType = {
  isLoggedIn: isAuthorized(),
  isAdmin: isAdmin(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginFromStore: (state)=>{
      state.isLoggedIn = true
    },
    logoutFromStore: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { logoutFromStore,loginFromStore } = authSlice.actions;

export default authSlice.reducer;
