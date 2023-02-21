import { configureStore } from '@reduxjs/toolkit';
import getDiary from '../module/diary/diarySlice';
import getLogin from '../module/login/loginGetSlice';
const store = configureStore({
  reducer: {
    getDiary,
    getLogin,
  },
});

export default store;
