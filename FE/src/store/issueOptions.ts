import { atom } from 'recoil';

interface issueOptionsStateType {
  assignees: string[];
  labels: string[];
  milestone: string | null;
}

const defaultState: issueOptionsStateType = {
  assignees: [],
  labels: [],
  milestone: '',
};

export const issueOptionsState = atom({
  key: 'issueOptions',
  default: defaultState,
});
