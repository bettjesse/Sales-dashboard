import { configureStore } from "@reduxjs/toolkit";
import collectionsReducer from "./redux/api/collections";
import { apiSlice } from "./redux/api/apiSlice";

const store = configureStore({
  reducer: {
    collections:collectionsReducer,
   
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
 
});

export default store;