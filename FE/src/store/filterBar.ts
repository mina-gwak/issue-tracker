import { atom, selector } from 'recoil';

export const defaultFilterBarState = {
  is: ['issue', 'open'],
};

export const filterBarState = atom({
  key: 'filterBarState',
  default: defaultFilterBarState,
});

export const filterBarArrState = selector({
  key: 'filterBarArrState',
  get: ({ get }) => {
    const filterBarValue = get(filterBarState);
    const filterBarValueArr = Object.entries(filterBarValue);
    return filterBarValueArr;
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
