import { configureStore } from '@reduxjs/toolkit';
import drawerSlice from './drawer-slice';
import membersListSlice from './membersList-slice';
import modalSlice from './modal-slice';

const store = configureStore({
  reducer: {
    drawer: drawerSlice.reducer,
    modal: modalSlice.reducer,
    membersList: membersListSlice.reducer,
  },
});

export default store;
