import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import getDiary from '../module/diary/diarySlice';
import getLogin from '../module/login/loginGetSlice';
import postLogin from '../module/login/loginPostSlice';

const store = configureStore({
  reducer: {
    getDiary,
    getLogin,
    postLogin,
  },
});

export default store;
