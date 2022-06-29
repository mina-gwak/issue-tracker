import { atom, selector } from 'recoil';

export const filterBarState = atom({
  key: 'filterBarState',
  default: {
    is: ['issue', 'open'],
  },
});

export const filterBarInputValueState = selector({
  key: 'filterBarInputValueState',
  get: ({ get }) => {
    const filterBarValue = get(filterBarState);
    const filterBarValueArr = Object.entries(filterBarValue);
    let returnValue = '';
    for (const [key, value] of filterBarValueArr) {
      if (Array.isArray(value)) {
        value.forEach((vl: string) => (returnValue += `${key}:${vl} `));
      }
    }
    return returnValue;
  },
});
