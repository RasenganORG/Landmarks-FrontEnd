import { configureStore } from '@reduxjs/toolkit';
import drawerSlice from './drawer-slice';
import modalSlice from './modal-slice';

const store = configureStore({
  reducer: { drawer: drawerSlice.reducer, modal: modalSlice.reducer },
});

export default store;
