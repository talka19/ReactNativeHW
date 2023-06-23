import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  displayName: null,
  stateChange: false,
  displayImg: null,
  email: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      displayName: payload.displayName,
      displayImg: payload.displayImg,
      email: payload.email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload,
    }),
    authSingOut: () => state,
    authError: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
});