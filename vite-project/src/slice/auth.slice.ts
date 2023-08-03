import { createSlice } from "@reduxjs/toolkit";

interface authInterface {
  jwt: string;
  isLoggedIn: boolean;
  isLiked: boolean;
  loggedUser: string;
}

const initialState: authInterface = {
  jwt: "",
  isLoggedIn: false,
  isLiked: false,
  loggedUser: "",
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
    userId: (state, data) => {
      state.loggedUser = data.payload;
    },
  },
});

export default authSlice.reducer;
export const { login, logout, like, unlike, userId } = authSlice.actions;
