import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const announcementAPI = createApi({
    reducerPath: "announcementAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/announcement`,
        credentials: "include",
    }),
    tagTypes: ["announcement"],
    endpoints: (builder) => ({
        createAnnouncement: builder.mutation({
            query: (data) => ({
                url: "/create",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data
            }),
            invalidatesTags: ["announcement"],
        }),
        getAllAnnouncement: builder.query({
            query: ({ page, limit }) => ({
                url: "/get",
                method: "GET",
                params: { page, limit }
            }),
            providesTags: ["announcement"],
        }),
        updateAnnouncement: builder.mutation({
            query: (id, data) => ({
                url: `/update/${id}`,
                headers: { "Content-Type": "application/json" },
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["announcement"],
        }),
    })
})

export const {
    useCreateAnnouncementMutation,
    useGetAllAnnouncementQuery,
    useUpdateAnnouncementMutation
} = announcementAPI;