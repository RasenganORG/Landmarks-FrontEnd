import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    visible: false,
    whichModal: '',
  },
  reducers: {
    openModal(state, action) {
      state.visible = true;
      state.whichModal = action.payload;
    },
    closeModal(state) {
      state.visible = false;
      state.whichModal = '';
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
