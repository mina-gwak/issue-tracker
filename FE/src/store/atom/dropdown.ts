import { atom } from "recoil";

export const modalState = atom({
  key: 'modalState',
  default: {
    "issue": true, "label": true, "milestone": false, "author": false, "assignee": false, "stateModify": false
  },
});
