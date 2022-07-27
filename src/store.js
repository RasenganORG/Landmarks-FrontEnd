import { configureStore } from '@reduxjs/toolkit';
import authSlice from './components/Authenticate/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
