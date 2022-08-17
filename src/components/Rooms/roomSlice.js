import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import roomService from './roomService';

const initialState = {
  newRoom: null,
  rooms: null,
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

export const getRoom = createAsyncThunk(
  'room/getRoom',
  async (roomID, thunkAPI) => {
    try {
      return await roomService.getRoom(roomID);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateRoom = createAsyncThunk(
  'room/updateRoom',
  async ({ roomID, members }, thunkAPI) => {
    try {
      return await roomService.updateRoom({ roomID, members });
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
    setRooms(state, action) {
      // action.payload is a room object
      state.rooms = [...action.payload];
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
        state.newRoom = { ...action.payload };
      })
      .addCase(addRoomToDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // `action.payload` is a `room` object response from `getRoom API`
        state.newRoom = { ...action.payload };
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // `action.payload` is a `room` object response from `updateRoom API`
        state.newRoom = { ...action.payload };
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const roomActions = roomSlice.actions;
export default roomSlice.reducer;
