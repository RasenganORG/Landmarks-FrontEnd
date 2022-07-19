import { configureStore } from '@reduxjs/toolkit';
import drawerSlice from './drawer-slice';
import membersListSlice from './membersList-slice';
import modalSlice from './modal-slice';
import authSlice from './auth-slice';

const store = configureStore({
  reducer: {
    drawer: drawerSlice.reducer,
    modal: modalSlice.reducer,
    membersList: membersListSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
