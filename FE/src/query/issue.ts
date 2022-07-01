import axios from 'axios';
import { useQuery } from 'react-query';

import { API } from '@constants';
import { IssueDataType, IssueType } from '@type/issueType';
import { ensure } from '@utils/ensure';

type IssueQueryPropsType<T> = (data: IssueDataType) => T;

export const fetchIssues = async <T>(): Promise<T> => {
  const accessToken = localStorage.getItem('accessToken')!;

  const response = await axios.get(`${API.ISSUE}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
    params: {
      query: 'is:open',
    },
  });

  return response.data;
};

export const useIssuesQuery = <T>(select?: IssueQueryPropsType<T>) =>
  useQuery(['issues'], fetchIssues, {
    select,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (err) => console.log(err),
  });

export const useIssues = () => useIssuesQuery<IssueType[]>((data) => data.issueCoverResponses);

export const useIssue = (issueId: number) =>
  useIssuesQuery<IssueType>((data) =>
    ensure(data.issueCoverResponses.find((issue) => issue.issueId === issueId)),
  );

export const useIssueIds = () =>
  useIssuesQuery<number[]>((data) =>
    ensure(data.issueCoverResponses.map((issue) => issue.issueId)),
  );
