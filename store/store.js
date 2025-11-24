import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice'; // API slice for queries/mutations
import authReducer from '../features/auth/authSlice'; // example slice
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
