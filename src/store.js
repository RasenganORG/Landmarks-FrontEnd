import { configureStore } from '@reduxjs/toolkit';
import userSlice from './components/Authenticate/userSlice';
import modalSlice from './components/LayoutPage/modalSlice';
import drawerSlice from './components/Rooms/Drawers/drawerSlice';
import roomSlice from './components/Rooms/roomSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    room: roomSlice,
    drawer: drawerSlice,
  },
});

export default store;
