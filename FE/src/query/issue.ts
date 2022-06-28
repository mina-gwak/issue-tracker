import axios from 'axios';
import { useQuery } from 'react-query';

import { API } from '@constants';
import { IssueType } from '@type/issueType';
import { ensure } from '@utils/ensure';

export const fetchIssues = async <T>(): Promise<T> => {
  const response = await axios.get(API.ISSUE);
  return response.data;
};

type IssueQueryPropsType<T> = (data: IssueType[]) => T;

const useIssuesQuery = <T>(select?: IssueQueryPropsType<T>) =>
  useQuery(['issues'], fetchIssues, { select });

export const useIssues = () => useIssuesQuery<IssueType[]>();

export const useIssue = (issueId: number) => useIssuesQuery<IssueType>((data) => ensure(data.find((issue) => issue.issueId === issueId)))
