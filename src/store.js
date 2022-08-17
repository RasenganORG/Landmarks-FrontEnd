import { configureStore } from '@reduxjs/toolkit';
import userSlice from './components/Authenticate/userSlice';
import modalSlice from './components/LayoutPage/modalSlice';
import roomSlice from './components/Rooms/roomSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    room: roomSlice,
  },
});

export default store;
