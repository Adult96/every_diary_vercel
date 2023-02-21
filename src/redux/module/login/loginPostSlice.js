import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  postLogin: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __postLogin = createAsyncThunk(
  'POST_LOGIN',
  async (payload, thunkAPI) => {
    try {
      const {
        data: { token },
      } = await axios.post(
        `${process.env.REACT_APP_LOGIN_URL_KEY}/login`,
        payload
      );

      console.log(token);
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      const {
        status,
        data: { message },
      } = error.response;

      if (status === 401) {
        alert(message);
      }

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postSignIn = createAsyncThunk(
  'POST_LOGIN',
  async (payload, thunkAPI) => {
    try {
      const { status } = await axios.post(
        `${process.env.REACT_APP_LOGIN_URL_KEY}/register`,
        payload
      );

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

      return thunkAPI.rejectWithValue(error);
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
