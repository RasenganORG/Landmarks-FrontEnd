import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import chatService from './chatService';

const initialState = {
  messages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const addMessage = createAsyncThunk(
  'chat/addMessage',
  async (data, thunkAPI) => {
    try {
      return await chatService.addMessage(data);
    } catch (error) {
      const message = `${error.message} - ${error.response.data}`;
      console.log(message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (data, thunkAPI) => {
    try {
      return await chatService.getMessages(data);
    } catch (error) {
      const message = `${error.message} - ${error.response.data}`;
      console.log(message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: 'slice',
  initialState: initialState,
  reducers: {
    reset(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = [...action.payload.messages];
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = [...action.payload];
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
