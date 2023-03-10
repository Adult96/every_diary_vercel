import QUERY from '../../../../constants/query';
import Axios from '../../../axios';
import { setCookie } from '../../../cookie';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  postLogin: [],
  isLoading: false,
  isError: false,
  error: null,
};

const axios = new Axios(process.env.REACT_APP_LOGIN_URL_KEY);

export const __postLogin = createAsyncThunk(
  'POST_LOGIN',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(QUERY.AXIOS_PATH.LOGIN, payload);
      const accessToken = response.data.token;

      setCookie(QUERY.COOKIE.COOKIE_NAME, accessToken);

      return thunkAPI.fulfillWithValue();
    } catch (error) {
      const {
        status,
        data: { message },
      } = error.response;

      if (status === 401) {
        alert(message);
      }

      return thunkAPI.rejectWithValue();
    }
  }
);

export const __postSignIn = createAsyncThunk(
  'POST_LOGIN',
  async (payload, thunkAPI) => {
    try {
      const { status } = await axios.post(QUERY.AXIOS_PATH.REGISTER, payload);

      if (status === 201) {
        alert('회원가입 완료');
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

      return thunkAPI.rejectWithValue();
    }
  }
);

const postLoginSlice = createSlice({
  name: 'postLogin',
  initialState,
  reducers: {},
  extraReducers: bulider => {
    bulider.addCase(__postLogin.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    bulider.addCase(__postLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    bulider.addCase(__postLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

// export const {} = getDiarySlice.actions;
export default postLoginSlice.reducer;
