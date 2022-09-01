import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

import { API } from '@constants';
import { AddIssueDataType, IssueDataType } from '@type/issueType';

export interface FetchIssuesPropsType {
  filterBarValue: string;
  pageParam?: number;
}

export interface FetchIssuesReturnType {
  issues: IssueDataType;
  previousPage: number;
  nextPage: number;
}

export const fetchIssues = async ({
  filterBarValue,
  pageParam = 0,
}: FetchIssuesPropsType): Promise<FetchIssuesReturnType> => {
  const accessToken = localStorage.getItem('accessToken')!;

  const response = await axios.get(`${API.ISSUE}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
    params: {
      query: filterBarValue,
      page: pageParam,
    },
  });

  return { issues: response.data, nextPage: pageParam + 1, previousPage: pageParam - 1 };
};

export const addIssue = async (newIssue: AddIssueDataType): Promise<AddIssueDataType> => {
  const accessToken = localStorage.getItem('accessToken')!;

  const { data } = await axios.post(`${API.ISSUE}`, newIssue, {
    headers: {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  });

  return data;
};

export const deleteIssue = async (issueId: number): Promise<AddIssueDataType> => {
  const accessToken = localStorage.getItem('accessToken')!;

  const { data } = await axios.delete(`${API.ISSUE_DELETE(issueId)}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  });

  return data;
};

export const useIssuesQuery = (filterBarValue: string) =>
  useInfiniteQuery(
    ['issues', filterBarValue],
    ({ pageParam = 0 }) => fetchIssues({ filterBarValue, pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const totalPage = lastPage.issues.totalPages;
        if (totalPage > lastPage.nextPage) return lastPage.nextPage;
        return undefined;
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onError: (err) => console.log(err),
    },
  );
