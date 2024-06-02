import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: (data) => ({
        url: "/api/new-invoice",
        method: 'POST',
        body: data,
       
      }),
    }),
    allnvoice: builder.query({
      query: () => ({
        url: "/api/all-invoice",
        method: 'GET',
       
       
      }),
    }),
})
})
export const {
  useCreateInvoiceMutation, useAllnvoiceQuery
 
  
  } = userApiSlice;