import QUERY from '../../../../constants/query';
import Axios from '../../../axios';
import { removeCookie } from '../../../cookie';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  getLogin: [],
  isLoading: false,
  isError: false,
  error: null,
};

const axios = new Axios(process.env.REACT_APP_LOGIN_URL_KEY);

export const __getLogin = createAsyncThunk(
  'GET_LOGIN',
  async (payload, thunkAPI) => {
    try {
      const {
        status,
        data: { message },
      } = await axios.get(QUERY.AXIOS_PATH.USER, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload}`,
        },
      });

      if (status === 200) {
        console.log(message);
      }

      return thunkAPI.fulfillWithValue();
    } catch (error) {
      const {
        status,
        data: { message },
      } = error.response;

      if (status === 401) {
        alert(message);
      }

      removeCookie(QUERY.COOKIE.COOKIE_NAME);

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
    });
    bulider.addCase(__getLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = getLoginSlice.actions;
export default getLoginSlice.reducer;
