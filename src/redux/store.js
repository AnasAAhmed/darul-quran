import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import { userAPI } from "./api/user";
import { courseApi } from "./api/courses";
import { notificationApi } from "./api/notifications";
import { dashboardApi } from "./api/dashboard";


export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    user: userReducer,
  },
  middleware: (mid) => [
    ...mid(),
    userAPI.middleware,
    courseApi.middleware,
    notificationApi.middleware,
    dashboardApi.middleware,
  ],
});

export const serverUrl = import.meta.env.VITE_PUBLIC_SERVER_URL;
// export type RootState = ReturnType<typeof store.getState>;