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
    createCollection: builder.mutation({
      query: (data) => ({
        url: `/api/create-collection`,
        method: 'Post',
        body: data, 
      }),
    }),
  }),
});

export const { useAllCollectionsQuery, useUpdateCollectionStatusMutation, useCreateCollectionMutation } = userApiSlice;
