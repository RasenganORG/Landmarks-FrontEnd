import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import roomService from './roomService';

const initialState = {
  newRoom: null,
  rooms: [],
  getRoom: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  createRoom: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  joinRoom: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
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
      console.log(message);
      return thunkAPI.rejectWithValue(error.response.data);
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
      console.log(message);
      return thunkAPI.rejectWithValue(error.response.data);
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
      console.log(message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    resetActions(state, action) {
      if (action.payload === 'getRoom')
        for (let foo in state.getRoom) {
          state.getRoom[foo] = false;
        }
      if (action.payload === 'createRoom')
        for (let foo in state.createRoom) {
          state.createRoom[foo] = false;
        }
      if (action.payload === 'joinRoom')
        for (let foo in state.joinRoom) {
          state.joinRoom[foo] = false;
        }
      state.message = '';
    },
    resetAll(state) {
      state.newRoom = null;
      state.rooms = [];
      for (let foo in state.getRoom) {
        state.getRoom[foo] = false;
      }
      for (let foo in state.createRoom) {
        state.createRoom[foo] = false;
      }
      for (let foo in state.joinRoom) {
        state.joinRoom[foo] = false;
      }
      state.message = '';
      state.userHasRooms = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomsForUser.pending, (state) => {
        state.getRoom.isLoading = true;
      })
      .addCase(getRoomsForUser.fulfilled, (state, action) => {
        state.getRoom.isLoading = false;
        state.getRoom.isSuccess = true;
        // `action.payload` is a rooms array - eturned by `roomService.getRoomsForUser`
        state.rooms = [...action.payload];
        state.userHasRooms = true;
      })
      .addCase(getRoomsForUser.rejected, (state, action) => {
        state.getRoom.isLoading = false;
        state.getRoom.isError = true;
        state.message = action.payload;
        state.userHasRooms = false;
      })
      .addCase(createRoom.pending, (state) => {
        state.createRoom.isLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.createRoom.isLoading = false;
        state.createRoom.isSuccess = true;
        // `action.payload` is data{ room{}, members[], chat[] } - eturned by `roomService.createRoom`
        const newRoom = {
          ...action.payload.room,
          members: [...action.payload.members],
          chat: [...action.payload.chat],
        };
        state.rooms.push(newRoom);
        state.newRoom = { id: newRoom.id };
        state.userHasRooms = true;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.createRoom.isLoading = false;
        state.createRoom.isError = true;
        state.message = action.payload;
      })
      .addCase(addUserToRoomMembership.pending, (state) => {
        state.joinRoom.isLoading = true;
      })
      .addCase(addUserToRoomMembership.fulfilled, (state, action) => {
        state.joinRoom.isLoading = false;
        state.joinRoom.isSuccess = true;
        // `action.payload` is a `room` id returned by `roomService.addUserToRoomMembership`
        state.newRoom = { id: action.payload.id };
      })
      .addCase(addUserToRoomMembership.rejected, (state, action) => {
        state.joinRoom.isLoading = false;
        state.joinRoom.isError = true;
        state.message = action.payload;
      });
  },
});

export const roomActions = roomSlice.actions;
export default roomSlice.reducer;
