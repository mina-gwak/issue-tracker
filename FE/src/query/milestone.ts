import axios from 'axios';
import { useQuery } from 'react-query';

import { API } from '@constants';
import { MilestoneTabType } from '@type/milestone';

interface MilestoneQueryType {
  milestoneSingleInfos: MilestoneTabType[];
}

export const fetchMilestones = async (): Promise<MilestoneQueryType> => {
  const accessToken = localStorage.getItem('accessToken')!;

  const response = await axios.get(`${API.MILESTONE}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
    params: {
      open: true,
    },
  });

  return response.data;
};

export const useMilestonesQuery = (trigger: string) =>
  useQuery(['milestones'], fetchMilestones, {
    select: (data) => data.milestoneSingleInfos,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (err) => console.log(err),
    enabled: trigger === 'milestone',
  });

export const useSelectedMilestoneQuery = (selectedMilestone: string) =>
  useQuery(['milestones'], fetchMilestones, {
    select: (data) => data.milestoneSingleInfos.filter(item => item.name === selectedMilestone),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (err) => console.log(err),
  });
