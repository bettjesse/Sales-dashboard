// collectionSlice.js

import { createSlice } from '@reduxjs/toolkit';

const collectionSlice = createSlice({
  name: 'collections',
  initialState: {
    collections: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    collectionStatusUpdated(state, action) {
        const { id, status } = action.payload;
        return {
          ...state,
          collections: state.collections.map(collection =>
            collection._id === id ? { ...collection, status } : collection
          ),
        };
      },
      
  },
});

export const { collectionStatusUpdated } = collectionSlice.actions;

export default collectionSlice.reducer;
