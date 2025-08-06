import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const redux = createApi({
  reducerPath: "redux",
  baseQuery: fetchBaseQuery({ baseUrl: "http://37.27.29.18:8001/api/to-dos" }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => "",
    }),
    addData: builder.mutation({
      query: (formData) => ({
        url: "",
        method: "POST",
        body: formData,
      }),
    }),
    deleteData: builder.mutation({
      query: (id) => ({
        url: `?id=${id}`,
        method: "DELETE",
      }),
    }),
    editData: builder.mutation({
      query: (updated) => ({
        url: "",
        method: "PUT",
        body: updated,
      }),
    }),
    addImage: builder.mutation({
      query: ({ id, form }) => ({
        url: `/${id}/images`,
        method: "POST",
        body: form,
      }),
    }),
    deleteImage: builder.mutation({
      query: (id) => ({
        url: `/images/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDataQuery,
  useAddDataMutation,
  useDeleteDataMutation,
  useEditDataMutation,
  useAddImageMutation,
  useDeleteImageMutation,
} = redux;
