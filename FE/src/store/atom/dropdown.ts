import { atom } from 'recoil';

type modalStateType = { [key: string]: boolean };

export const modalState = atom<modalStateType>({
  key: 'modalState',
  default: {
    issue: false,
    label: false,
    milestone: false,
    author: false,
    assignee: false,
    stateModify: false,
  },
});
