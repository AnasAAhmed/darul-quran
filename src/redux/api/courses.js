import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_PUBLIC_SERVER_URL + "/api/course",
        credentials: "include",
    }),
    tagTypes: ["course", "reviews", "categories"],
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: ({ page, limit, categoryId, search, status }) => ({
                url: "/getAllCourses",
                method: "GET",
                params: { page, limit, categoryId, search, status }
            }),
            providesTags: ["course"],
        }),
        getEnrolledCourses: builder.query({
            query: ({ page = 1, limit, categoryId, search = '' }) => ({
                url: "/my-courses",
                method: "GET",
                params: { page, limit, categoryId, search }
            }),
            providesTags: ["course"],
        }),
        getCourseFiles: builder.query({
            query: ({ courseId, page, limit, search, includeCourse }) => ({
                url: "/course-files/" + courseId,
                method: "GET",
                params: { page, limit, search, includeCourse }
            }),
            providesTags: ["course"],
        }),
        getCourseById: builder.query({
            query: (id) => `/getCourseById/${id}`,
            providesTags: ["course"],
        }),
        getCourseByIdView: builder.query({
            query: ({ courseId, includeCourse }) => `/getCourseByIdView/${courseId}?includeCourse=${includeCourse}`,
            providesTags: ["course"],
        }),
        addCourse: builder.mutation({
            query: (data) => ({
                url: "/addCourse",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
            }),
            invalidatesTags: ["course"],

        }),
        updateCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `/updateCourse/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["course"],
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/deleteCourse`,
                method: "DELETE",
                credentials: "include",
                body: { id },
            }),
            invalidatesTags: ["course"],
        }),
        getAllCategories: builder.query({
            query: () => "/getAllCategories",
            providesTags: ["categories"],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/deleteCategory`,
                method: "DELETE",
                body: { category_id: id },
            }),
            invalidatesTags: ["categories"],
        }),
        addCategory: builder.mutation({
            query: (category_name) => ({
                url: "/addCategory",
                method: "POST",
                body: { category_name: category_name },
            }),
            invalidatesTags: ["categories"],
        }),
        getReviews: builder.query({
            query: ({ courseId, page, limit, search }) => ({
                url: "/get-reviews/" + courseId,
                method: "GET",
                params: { page, limit, search },
            }),
            providesTags: ["reviews"],
        }),
        addRevieworUpdate: builder.mutation({
            query: ({ courseId, data }) => ({
                url: "/add-review/" + courseId,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
            }),
            invalidatesTags: ["reviews", "course"],
        }),
        deleteReview: builder.mutation({
            query: (reviewId) => ({
                url: "/delete-review/" + reviewId,
                method: "DELETE",
            }),
            invalidatesTags: ["reviews", "course"],
        }),
    }),
});


export const {
    useGetAllCoursesQuery,
    useGetEnrolledCoursesQuery,
    useGetCourseFilesQuery,
    useGetCourseByIdQuery,
    useGetCourseByIdViewQuery,
    useAddCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useGetAllCategoriesQuery,
    useDeleteCategoryMutation,
    useAddCategoryMutation,
    useGetReviewsQuery,
    useAddRevieworUpdateMutation,
    useDeleteReviewMutation
} = courseApi;