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
      console.log(payload);
      const response = await axios.post(
        `${process.env.REACT_APP_DIARY_API_KEY}/register`,
        { id: payload.id, pw: payload.pw },
        { withCredentials: true }
      );

      console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const postLoginSlice = createSlice({
  name: 'diary',
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
      state.diary = action.payload;
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
