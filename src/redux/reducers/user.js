import { createSlice } from "@reduxjs/toolkit";

// export interface User {
//   id: string;
//   email: string;
//   name?: string;
//   image?: string;
//   role: boolean;


const initialState = {
  user: null,
  loading: true,
  shouldFetch: false,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.shouldFetch = false;
    },


    clearUser(state) {
      state.user = null;
      state.loading = false;
      state.shouldFetch = false;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setShouldFetch(state) {
      state.shouldFetch = true;
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setShouldFetch,
} = userReducer.actions;

export default userReducer.reducer;
