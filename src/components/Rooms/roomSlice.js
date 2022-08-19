import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import roomService from './roomService';

const initialState = {
  newRoom: null,
  rooms: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createRoom = createAsyncThunk(
  'room/createRoom',
  async (room, thunkAPI) => {
    try {
      return await roomService.createRoom(room);
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

export const addUserToRoomMembership = createAsyncThunk(
  'room/addUserToRoomMembership',
  async ({ roomID, userID }, thunkAPI) => {
    try {
      return await roomService.addUserToRoomMembership({ roomID, userID });
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
    addRoom(state, action) {
      const newRoom = {
        ...action.payload.room,
        members: [...action.payload.members],
        chat: action.payload.chat,
      };
      state.rooms.push(newRoom);
    },
    addMultipleRooms(state, action) {
      state.rooms = [...action.payload];
    },
    addMemberToRoom(state, action) {
      const roomID = action.payload.roomID;
      const newMember = action.payload.user;
      state.rooms = [
        ...state.rooms.map((room) =>
          room.id === roomID
            ? { ...room, members: [...room.members, newMember] }
            : room
        ),
      ];
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
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // `action.payload` is a `room` object response from `createRoom API`
        state.newRoom = { id: action.payload };
      })
      .addCase(createRoom.rejected, (state, action) => {
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
