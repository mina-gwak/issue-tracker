import { atom, selector } from 'recoil';

import { LabelDataType } from '@type/label';
import { getLabelsData } from '@utils/api/fetchLabel';

export const labelTrigger = atom<number>({
  key: 'labelTrigger',
  default: 0,
});

export const getLabelData = selector<LabelDataType>({
  key: 'GET/labelData',
  get: async ({ get }) => {
    get(labelTrigger);
    const labelData = await getLabelsData();
    return labelData;
  },
});
