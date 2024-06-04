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
        query: (schoolId) => ({
          url: `/api/schools/${schoolId}`,
          method: 'GET',
        }),
      }),
})
})
export const {
  useGetSchoolsQuery, useGetSchoolByIdQuery
 
  
  } = userApiSlice;