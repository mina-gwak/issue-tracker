import { atom, selector } from 'recoil';
import { v1 } from 'uuid';

import { fetchIssueDetail } from '@utils/api/fetchDetailIssue';
export const detailIdState = atom({
  key: `detailIssueId/${v1()}`,
  default: 0,
});

export const detailIssueTrigger = atom({
  key: `detailIssueTrigger/${v1()}`,
  default: 0,
});

export const getDetailIssueData = selector({
  key: `GET/DetailIssueData/${v1()}`,
  get: async ({ get }) => {
    get(detailIssueTrigger);
    const id = get(detailIdState);
    if (!id) return;
    const detailData = await fetchIssueDetail(id);
    return detailData;
  },
});

export const titleEditMode = atom({
  key: `titleEditMode/${v1()}`,
  default: false,
});
