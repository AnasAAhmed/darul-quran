import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/user`,
    }),
    tagTypes: ["userApi"],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: ({ page, limit, search, status, role }) => ({
                url: "/getAllUsers",
                method: "GET",
                params: { page, limit, search, status, role }
            }),
            providesTags: ["user"],
        }),
        getAllTeachers: builder.query({
            query: ({ page, limit ,search}) => ({
                url: "/getTeachers",
                method: "GET",
                params: { page, limit,search }
            }),
            providesTags: ["user"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/deleteUser/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"],
        }),
        bulkDeleteUser: builder.mutation({
            query: (ids) => ({
                url: `/bulkDelete`,
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: { ids },
            }),
            invalidatesTags: ["user"],
        })
    })
})

export const {
    useGetAllUsersQuery,
    useGetAllTeachersQuery,
    useDeleteUserMutation,
    useBulkDeleteUserMutation
} = userAPI;