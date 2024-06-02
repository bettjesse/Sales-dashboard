import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSchools: builder.query({
      query: () => ({
        url: "/api/schools",
        method: 'GET',
     
       
      }),
    }),
    getSchoolById: builder.query({
        query: (id) => ({
          url: `/api/schools/${id}`,
          method: 'GET',
        }),
      }),
})
})
export const {
  useGetSchoolsQuery, useGetSchoolByIdQuery
 
  
  } = userApiSlice;