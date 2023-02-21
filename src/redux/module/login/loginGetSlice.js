import axios from 'axios';
import { Cookies } from 'react-cookie';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const cookie = new Cookies();

const initialState = {
  getLogin: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getLogin = createAsyncThunk(
  'GET_DIARYS',
  async (payload, thunkAPI) => {
    const accessToken = cookie.get('accessToken');
    console.log(accessToken);
    try {
      const response = await axios.get(`${'http://3.38.191.164'}/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
