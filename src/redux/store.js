import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";

export const server = import.meta.env.VITE_PUBLIC_SERVER_URL;

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    //   middleware: (mid) => [
    //     ...mid(),
    //     userAPI.middleware,
    //     productAPI.middleware,
    //     orderApi.middleware,
    //     dashboardApi.middleware,
    //     notificationApi.middleware,
    //   ],
});

// export type RootState = ReturnType<typeof store.getState>;