import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import herbReducer from '../features/herbs/herbSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    herbs: herbReducer
  },
});
