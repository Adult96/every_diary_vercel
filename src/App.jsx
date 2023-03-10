import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import GlobalStyle from './styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';

import ThemeMode from './components/ThemeMode';
import LogOut from './components/LogOut';

import { getCookie } from './utils/cookie';
import QUERY from './constants/query';
import ROUTER from './constants/router';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    if (cookie && pathname === ROUTER.PATH.SLASH) {
      navigate(ROUTER.PATH.CALENDAR);
    } else if (!cookie) {
      navigate(ROUTER.PATH.SLASH);
    }
  }, [navigate, pathname]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ThemeMode theme={theme} darkMode={darkMode} onDarkMode={setDarkMode} />
      {pathname === ROUTER.PATH.SLASH ? '' : <LogOut />}

      <Main>
        <Banner>
          <Img src='/img/diaryBanner.png' alt='' />
        </Banner>
        <Outlet />
      </Main>
    </ThemeProvider>
  );
}

const Main = styled.main`
  width: 70vw;
  height: 100%;
  margin: auto;
  /* transition: all 300ms ease-in-out; */
`;

const Banner = styled.div`
  width: 100%;
  height: 20vh;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 1rem 1rem 0 0;
`;

export default App;
