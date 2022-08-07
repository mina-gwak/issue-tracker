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
    let status = isOpenMilestone ? 'open' : 'close';

    const milestoneData = await getMilestonesData(status);
    return milestoneData;
  },
});
