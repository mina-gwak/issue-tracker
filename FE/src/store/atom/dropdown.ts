import { atom } from 'recoil';

export const defaultState = {
  issue: false,
  label: false,
  milestone: false,
  author: false,
  assignee: false,
  stateModify: false,
};

export type ModalStateType = keyof typeof defaultState;

export const modalState = atom<typeof defaultState>({
  key: 'modalState',
  default: defaultState,
});
