import { atom } from 'recoil';

export const currentPageState = atom({
  key: 'currentPageState',
  default: 0,
});

export const issueTriggerState = atom({
  key: 'issueTriggerState',
  default: 0,
});
