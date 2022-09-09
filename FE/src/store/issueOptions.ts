import { atom } from 'recoil';

interface IssueOptionsStateType {
  assignees: string[];
  labels: string[];
  milestone: string;
}

interface IssueOptionsTriggerStateType {
  type: string;
  count: number;
}

const defaultState: IssueOptionsStateType = {
  assignees: [],
  labels: [],
  milestone: '',
};

const defaultTriggerState: IssueOptionsTriggerStateType = {
  type: '',
  count: 0,
};

export const issueOptionsTriggerState = atom({
  key: 'issueOptionsTrigger',
  default: defaultTriggerState,
});

export const issueOptionsState = atom({
  key: 'issueOptions',
  default: defaultState,
});
