import { atom, selector } from 'recoil';

interface DefaultFilterBarStateType {
  is: string[];
  issues: string[];
  labels: string[];
  milestones: string[];
  writers: string[];
  assignees: string[];
}

export type FilterBarStateKeyType = keyof DefaultFilterBarStateType;

export const defaultFilterBarState: DefaultFilterBarStateType = {
  is: ['issue', 'open'],
  issues: [],
  labels: [],
  milestones: [],
  writers: [],
  assignees: [],
};

export const filterBarState = atom({
  key: 'filterBarState',
  default: defaultFilterBarState,
});

export const filterBarArrState = selector({
  key: 'filterBarArrState',
  get: ({ get }) => {
    const filterBarValue = get(filterBarState);
    return Object.entries(filterBarValue);
  },
});

export const filterBarInputValueState = selector({
  key: 'filterBarInputValueState',
  get: ({ get }) => {
    const filterBarValue = get(filterBarArrState);
    let returnValue = '';
    for (const [key, value] of filterBarValue) {
      if (Array.isArray(value)) {
        value.forEach((vl: string) => (returnValue += `${key}:${vl} `));
      }
    }
    return returnValue;
  },
});

export const filterBarQueryString = selector({
  key: 'filterBarQueryString',
  get: ({ get }) => {
    const filterBarInputValueValue = get(filterBarInputValueState);
    return filterBarInputValueValue
      .split(' ')
      .filter((el) => el !== 'is:issue')
      .join(' ');
  },
});
