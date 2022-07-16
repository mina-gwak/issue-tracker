import { atom } from 'recoil';

interface labelMilestoneActiveStateType {
  label: boolean;
  milestone: boolean;
}
export const labelMilestoneActiveState = atom<labelMilestoneActiveStateType>({
  key: 'labelMilestoneActiveState',
  default: { label: false, milestone: false },
});
