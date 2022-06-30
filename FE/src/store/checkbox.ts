import { atom } from 'recoil';

export const isCheckedState = atom({
  key: 'isCheckedState',
  default: new Set(),
});

export const isAllCheckedState = atom({
  key: 'isAllCheckedState',
  default: false,
});
