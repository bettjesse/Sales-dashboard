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
    updateInvoice: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/invoices/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    allnvoice: builder.query({
      query: () => ({
        url: "/api/all-invoice",
        method: 'GET',
       
       
      }),
      
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `/api/invoices/${id}`,
        method: 'DELETE',
      }),
    }),
    
})
})
export const {
  useCreateInvoiceMutation,  useUpdateInvoiceMutation, useAllnvoiceQuery, useDeleteInvoiceMutation
 

  } = userApiSlice;