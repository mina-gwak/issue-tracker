import { useQuery } from 'react-query';

import { instance } from '@api';
import { API } from '@constants';
import { IssueDataType, IssueType } from '@type/issueType';
import { ensure } from '@utils/ensure';

type IssueQueryPropsType<T> = (data: IssueDataType) => T;

export const fetchIssues = async <T>(): Promise<T> => {
  const response = await instance.get(`${API.ISSUE}`, {
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
