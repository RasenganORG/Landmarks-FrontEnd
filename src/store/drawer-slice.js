import { createSlice } from '@reduxjs/toolkit';

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    visible: true,
    currentDrawer: '2',
    title: ['Chat', 'Members'],
  },
  reducers: {
    openDrawer(state) {
      state.visible = true;
    },
    closeDrawer(state) {
      state.visible = false;
      state.currentDrawer = '';
    },
    changeDrawer(state, action) {
      state.currentDrawer = action.payload;
    },
  },
});

export const drawerActions = drawerSlice.actions;
export default drawerSlice;
