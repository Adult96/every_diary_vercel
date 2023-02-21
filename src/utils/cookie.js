import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 10 * 60 * 1000);
  return cookies.set(name, value, {
    ...option,
    expires,
  });
};

export const getCookie = name => {
  return cookies.get(name);
};

export const removeCookie = (name, option) => {
  return cookies.remove(name, { ...option });
};
