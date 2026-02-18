import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/dashboard`,
    }),
    tagTypes: ["Dashboard"],
    endpoints: (builder) => ({
        getAdminDashboard: builder.query({
            query: () => "/admin",
            providesTags: ["Dashboard"],
        }),
        getStudentDashboard: builder.query({
            query: () => "/student",
            providesTags: ["Dashboard"],
        }),
        getTeacherDashboard: builder.query({
            query: () => "/teacher",
            providesTags: ["Dashboard"],
        }),
    }),
});

export const {
    useGetAdminDashboardQuery,
    useGetStudentDashboardQuery,
    useGetTeacherDashboardQuery,
} = dashboardApi;
