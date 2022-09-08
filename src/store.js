import { configureStore } from '@reduxjs/toolkit';
import userSlice from './components/Authenticate/userSlice';
import modalSlice from './components/Home/modalSlice';
import drawerSlice from './components/Rooms/Drawers/drawerSlice';
import roomSlice from './components/Rooms/roomSlice';
import chatSlice from './components/Chat/chatSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    room: roomSlice,
    drawer: drawerSlice,
    chat: chatSlice,
  },
});

export default store;
