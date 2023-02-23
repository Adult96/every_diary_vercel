import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CalendarPage from './pages/Calendar';
import App from './App';
import Diary from './pages/Diary';
import { Provider } from 'react-redux';
import store from './utils/redux/config/configStore';
import DiaryDetail from './components/DiaryDetail';
import Login from './pages/Login';
import ROUTER from './constants/router';

const router = createBrowserRouter([
  {
    path: ROUTER.PATH.SLASH,
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: ROUTER.PATH.CALENDAR,
        element: <CalendarPage />,
      },
      {
        path: ROUTER.PATH.DIRAY_DATE,
        element: <Diary />,
      },
      {
        path: ROUTER.PATH.DIRAY_DETAIL,
        element: <DiaryDetail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
