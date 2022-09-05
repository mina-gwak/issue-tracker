import axios from 'axios';
import { useQuery } from 'react-query';

import { API } from '@constants';
import { DetailIssueType } from '@type/detailIssueType';

export const fetchDetailIssue = async (id: number): Promise<DetailIssueType> => {
  const accessToken = localStorage.getItem('accessToken')!;
  try {
    const response = await axios.get(`${API.SHARE_DETAIL(id)}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    });
    if (response.status === 200) return response.data;
    else throw Error('잘못된 요청입니다.');
  } catch (error) {
    throw error;
  }
};

export const useDetailIssueQuery = (issueId: number) =>
  useQuery(['issues', issueId], () => fetchDetailIssue(issueId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (err) => console.log(err),
    enabled: issueId !== undefined,
  });
