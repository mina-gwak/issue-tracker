import { atom, selector } from 'recoil';

import { getMilestonesData } from '@utils/api/fetchMilestone';

export const milestoneTrigger = atom<number>({
  key: 'milestoneTrigger',
  default: 0,
});

export const milestoneStatus = atom<boolean>({
  key: 'milestoneStatus',
  default: true,
});

export const getMilestoneData = selector({
  key: 'GET/milestoneData',
  get: async ({ get }) => {
    get(milestoneTrigger);
    const isOpenMilestone = get(milestoneStatus);

    const milestoneData = await getMilestonesData(isOpenMilestone);
    return milestoneData;
  },
});
