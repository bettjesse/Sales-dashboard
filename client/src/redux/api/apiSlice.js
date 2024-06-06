import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';


// const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:8080" });
const baseQuery = fetchBaseQuery({ baseUrl: "https://zeraki-dashboard-server.onrender.com" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes:["User"],
  
  endpoints: (builder) => ({}),
});