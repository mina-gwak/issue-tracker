import axios from 'axios';
import { useQuery } from 'react-query';

import { API } from '@constants';
import { LabelDataType } from '@type/label';

export const fetchLabels = async (): Promise<LabelDataType> => {
  const accessToken = localStorage.getItem('accessToken')!;

  const response = await axios.get(`${API.LABEL}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  });

  return response.data;
};

export const useLabelsQuery = (trigger: string) =>
  useQuery(['labels'], fetchLabels, {
    select: (data) => data.labelDetails,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (err) => console.log(err),
    enabled: trigger === 'labels',
  });

export const useSelectedLabelsQuery = (selectedLabel: string[]) =>
  useQuery(['labels'], fetchLabels, {
    select: (data) => data.labelDetails.filter(item => selectedLabel.includes(item.name)),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (err) => console.log(err),
  });
