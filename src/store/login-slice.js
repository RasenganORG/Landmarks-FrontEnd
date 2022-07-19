import { createSlice } from '@reduxjs/toolkit';

const INITIAL_LOGIN_STATE = {
  isAuthenticated: false,
};

const login = createSlice({
  name: 'login',
  initialState: INITIAL_LOGIN_STATE,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const loginActions = login.actions;
export default login;
