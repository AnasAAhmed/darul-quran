import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import { userAPI } from "./api/user";
import { courseApi } from "./api/courses";
import { notificationApi } from "./api/notifications";
import { dashboardApi } from "./api/dashboard";
import { announcementAPI } from "./api/announcements";


export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [announcementAPI.reducerPath]: announcementAPI.reducer,
    user: userReducer,
  },
  middleware: (mid) => [
    ...mid(),
    userAPI.middleware,
    courseApi.middleware,
    notificationApi.middleware,
    dashboardApi.middleware,
    announcementAPI.middleware,
  ],
});

export const serverUrl = import.meta.env.VITE_PUBLIC_SERVER_URL;
// export type RootState = ReturnType<typeof store.getState>;