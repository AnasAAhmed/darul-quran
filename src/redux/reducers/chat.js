import { createSlice } from "@reduxjs/toolkit";

// export interface User {
//   id: string;
//   email: string;
//   name?: string;
//   image?: string;
//   role: boolean;


const initialState = {
    onlineUsers: [],
    messages: [],
    loading: true,
};

const chatReducer = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload;
        },

        setMessages(state, action) {
            state.messages = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const {
    setOnlineUsers,
    setMessages,
    setLoading,
} = chatReducer.actions;

export default chatReducer.reducer;
