import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import roomService from './roomService';

const initialState = {
  newRoom: null,
  rooms: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  userHasRooms: false,
};

export const createRoom = createAsyncThunk(
  'room/createRoom',
  async (data, thunkAPI) => {
    try {
      return await roomService.createRoom(data);
    } catch (error) {
      const message = `${error.message} - ${error.response.data}`;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRoomsForUser = createAsyncThunk(
  'room/getRoomsForUser',
  async (userID, thunkAPI) => {
    try {
      return await roomService.getRoomsForUser(userID);
    } catch (error) {
      const message = `${error.message} - ${error.response.data}`;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addUserToRoomMembership = createAsyncThunk(
  'room/addUserToRoomMembership',
  async ({ roomToken, userID }, thunkAPI) => {
    try {
      return await roomService.addUserToRoomMembership({ roomToken, userID });
    } catch (error) {
      const message = `${error.message} - ${error.response.data}`;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    resetActions(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    resetAll(state) {
      state.newRoom = null;
      state.rooms = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.userHasRooms = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomsForUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoomsForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // `action.payload` is a rooms array - response from `getRoomsForUser API`
        console.log('getRoomsForUser response', action.payload);
        state.rooms = [...action.payload];
        state.userHasRooms = true;
      })
      .addCase(getRoomsForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userHasRooms = false;
      })
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // `action.payload` is data{ room{}, members[], chat[] } - response from `createRoom API`
        const newRoom = {
          ...action.payload.room,
          members: [...action.payload.members],
          chat: [...action.payload.chat],
        };
        state.rooms.push(newRoom);
        state.newRoom = { ...newRoom };
        state.userHasRooms = true;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addUserToRoomMembership.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserToRoomMembership.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // `action.payload` is a `room` object response from `addUserToRoomMembership API`
        state.newRoom = { ...action.payload };
      })
      .addCase(addUserToRoomMembership.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const roomActions = roomSlice.actions;
export default roomSlice.reducer;
