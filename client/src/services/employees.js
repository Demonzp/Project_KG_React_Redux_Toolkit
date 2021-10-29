import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiEmployees = createApi({
  reducerPath: 'apiEmployees',
  tagTypes: ['Employees'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState()).auth.token;
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEmployee: builder.query({
      query: (_id) => `/employees/${_id}`,
      providesTags: ['Employee'],
    }),
    getEmployees: builder.query({
      transformResponse: (response) => { return { employees: response.docs, pages: response.pages } },
      query: ({ page = 1, limit = 10 }) => `/employees?limit=${limit}&page=${page}`,
      providesTags: ['Employees'],
    }),

    editEmployee: builder.mutation({
      query: ({ data }) => ({
        url: `/employees/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted({ data: { _id }, overData }, { dispatch, queryFulfilled }) {
        try {
          const { data: editedEmployee } = await queryFulfilled
          dispatch(
            apiEmployees.util.updateQueryData('getEmployees', overData, (draft) => {
              const idx = draft.employees.findIndex(empl => empl._id === _id);
              draft.employees.splice(idx, 1, editedEmployee);
            })
          )
        } catch { }
      },
    }),
    addEmployee: builder.mutation({
      query: (data)=>({
        url: '/employees/',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Employees'],
    }),
  }),
});

export const { useGetEmployeesQuery, useEditEmployeeMutation, useAddEmployeeMutation } = apiEmployees;
