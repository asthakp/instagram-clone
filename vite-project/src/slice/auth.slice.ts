import { createSlice } from "@reduxjs/toolkit";

interface authInterface {
  jwt: string;
  isLoggedIn: boolean;
  isLiked: boolean;
}

const initialState: authInterface = {
  jwt: "",
  isLoggedIn: false,
  isLiked: false,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, data) => {
      state.isLoggedIn = true;
      state.jwt = data.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.jwt = "";
    },
    like: (state) => {
      state.isLiked = true;
    },
    unlike: (state) => {
      state.isLiked = false;
    },
  },
});

export default authSlice.reducer;
export const { login, logout, like, unlike } = authSlice.actions;
