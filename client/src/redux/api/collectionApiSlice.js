// import { apiSlice } from './apiSlice';

// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
  
//     allCollections: builder.query({
//       query: () => ({
//         url: "/api/collections",
//         method: 'GET',
       
       
//       }),
//     }),
//     updateCollections: builder.query({
//       query: () => ({
//         url: "/api/collections/:id/status",
//         method: 'GET',
       
       
//       }),
//     }),
// })
// })
// export const {
// useAllCollectionsQuery

  
//   } = userApiSlice;

import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allCollections: builder.query({
      query: () => ({
        url: "/api/collections",
        method: 'GET',
      }),
    }),
    updateCollectionStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/collections/${id}/status`,
        method: 'PUT',
        body: { status }, 
      }),
    }),
  }),
});

export const { useAllCollectionsQuery, useUpdateCollectionStatusMutation } = userApiSlice;
