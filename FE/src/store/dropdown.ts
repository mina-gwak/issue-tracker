import { atom } from 'recoil';

import { ModalListType } from '@type/modalList';

export const defaultState: ModalListType = {
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
