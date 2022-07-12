import { createSlice } from '@reduxjs/toolkit';

const membersListSlice = createSlice({
  name: 'membersList',
  initialState: {
    members: [],
    count: 0,
    initialLoading: true,
    loading: false,
    howManyToLoad: 3,
  },
  reducers: {
    addMember(state, action) {
      const newMembers = action.payload.results;
      console.log(newMembers);
      state.members.push(...newMembers);
      state.count += state.howManyToLoad;
    },
    changeInitialLoading(state, action) {
      state.initialLoading = action.payload;
    },
    changeLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const membersListActions = membersListSlice.actions;
export default membersListSlice;
