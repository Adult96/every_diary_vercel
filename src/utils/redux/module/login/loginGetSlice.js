import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  getLogin: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getLogin = createAsyncThunk(
  'GET_DIARYS',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${'http://3.38.191.164'}/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload}`,
        },
      });
      console.log(response);

      return thunkAPI.fulfillWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const getLoginSlice = createSlice({
  name: 'getLogin',
  initialState,
  reducers: {},
  extraReducers: bulider => {
    bulider.addCase(__getLogin.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    bulider.addCase(__getLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.diary = action.payload;
    });
    bulider.addCase(__getLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

// export const {} = getDiarySlice.actions;
export default getLoginSlice.reducer;
