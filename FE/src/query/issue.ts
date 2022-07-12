import axios from 'axios';
import { useQuery } from 'react-query';

import { API } from '@constants';
import { IssueDataType } from '@type/issueType';

type IssueQueryPropsType<T> = (data: IssueDataType) => T;

export const fetchIssues = async <T>(filterBarValue: string): Promise<T> => {
  const accessToken = localStorage.getItem('accessToken')!;

  const response = await axios.get(`${API.ISSUE}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
    params: {
      query: filterBarValue,
    },
  });

  return response.data;
};

export const useIssuesQuery = <T>(filterBarValue: string, select?: IssueQueryPropsType<T>) =>
  useQuery(['issues', filterBarValue], () => fetchIssues<IssueDataType>(filterBarValue), {
    select,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (err) => console.log(err),
  });
