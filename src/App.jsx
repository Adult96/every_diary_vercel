import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import GlobalStyle from './styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';

import ThemeMode from './components/ThemeMode';
import { getCookie, removeCookie } from './utils/cookie';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const cookie = getCookie('accessToken');
    if (cookie && pathname === '/') {
      navigate('/calendar');
    } else if (!cookie) {
      navigate('/');
    }
  }, [navigate, pathname]);

  const handleLogOut = () => {
    removeCookie('accessToken');
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ThemeMode theme={theme} darkMode={darkMode} onDarkMode={setDarkMode} />
      {pathname === '/' ? '' : <LogOut onClick={handleLogOut}>로그아웃</LogOut>}

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

const LogOut = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
`;

export default App;
