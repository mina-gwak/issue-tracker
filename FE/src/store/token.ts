import { atom, selector } from 'recoil';

const defaultTokenState = {
  accessToken: '',
  refreshToken: '',
};

const tokenSelector = selector({
  key: 'tokenSelector',
  get: () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return accessToken && refreshToken
      ? {
          accessToken: JSON.parse(accessToken),
          refreshToken: JSON.parse(refreshToken),
        }
      : defaultTokenState;
  },
});

export const tokenState = atom({
  key: 'tokenState',
  default: tokenSelector,
});
