import { configureStore } from '@reduxjs/toolkit';
import drawerSlice from './drawer-slice';
import membersListSlice from './membersList-slice';
import modalSlice from './modal-slice';
import loginSLice from './login-slice';

const store = configureStore({
  reducer: {
    drawer: drawerSlice.reducer,
    modal: modalSlice.reducer,
    membersList: membersListSlice.reducer,
    login: loginSLice.reducer,
  },
});

export default store;
