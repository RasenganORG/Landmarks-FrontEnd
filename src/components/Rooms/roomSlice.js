import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import roomService from './roomService';

// Get user from localStorage

const initialState = {
  user: null,
  room: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const addRoomToDB = createAsyncThunk(
  'room/addRoomToDB',
  async (room, thunkAPI) => {
    try {
      return await roomService.addRoomToDB(room);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    setRoom(state, action) {
      // action.payload is a room object
      state.room = { ...action.payload };
    },
    reset(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRoomToDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRoomToDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // `action.payload` is a `room` object response from `addRoomToDB API`
        state.room = { ...action.payload };
      })
      .addCase(addRoomToDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const roomActions = roomSlice.actions;
export default roomSlice.reducer;
