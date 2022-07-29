import { configureStore } from '@reduxjs/toolkit';
import authSlice from './components/Authenticate/authSlice';
import modalSlice from './components/LayoutPage/modalSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
  },
});

export default store;
