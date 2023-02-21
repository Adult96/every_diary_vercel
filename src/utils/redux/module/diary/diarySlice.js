import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  diary: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const addDiary = async (payload, callback) => {
  await axios.post(`${process.env.REACT_APP_DIARY_API_KEY}/diary`, payload);
  callback();
};

export const editDiary = async (payload, callback) => {
  const { id, title, content } = payload;
  await axios.patch(
    `${process.env.REACT_APP_DIARY_API_KEY}/diary/${id}
  `,
    {
      title,
      content,
    }
  );
  callback();
};

export const deleteDiary = async (payload, callback) => {
  await axios.delete(`${process.env.REACT_APP_DIARY_API_KEY}/diary/${payload}`);
  callback();
};

export const __getDiary = createAsyncThunk(
  'GET_DIARYS',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DIARY_API_KEY}/diary`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getDiarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {},
  extraReducers: bulider => {
    bulider.addCase(__getDiary.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    bulider.addCase(__getDiary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.diary = action.payload;
    });
    bulider.addCase(__getDiary.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

// export const {} = getDiarySlice.actions;
export default getDiarySlice.reducer;
