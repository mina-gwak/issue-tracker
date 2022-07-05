import { atom } from 'recoil';

export const defaultState = {
  issues: false,
  labels: false,
  milestones: false,
  writers: false,
  assignees: false,
  stateModify: false,
};

export type ModalStateType = keyof typeof defaultState;

export const modalState = atom<typeof defaultState>({
  key: 'modalState',
  default: defaultState,
});
