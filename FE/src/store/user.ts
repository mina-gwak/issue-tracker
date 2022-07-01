import { atom, selector } from 'recoil';

const defaultUserState = {
  name: '',
  nickname: '',
  image: '',
};

const userSelector = selector({
  key: 'userSelector',
  get: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(JSON.parse(user)) : defaultUserState;
  },
});

export const userState = atom({
  key: 'userState',
  default: userSelector,
});
