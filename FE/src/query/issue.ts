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

interface EditLabelsPropsType {
  issueId: number;
  labels: string[];
}

interface EditAssigneesPropsType {
  issueId: number;
  assignees: string[];
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

export const editIssueContent = async (issueId: number, contents: string) => {
  const accessToken = localStorage.getItem('accessToken')!;

  const { status } = await axios.patch(
    `${API.EDIT_ISSUE_CONTENT(issueId)}`,
    { contents },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    },
  );

  if (status === 200) return true;
};

export const editLabels = async ({ issueId, labels }: EditLabelsPropsType) => {
  const accessToken = localStorage.getItem('accessToken')!;

  const { status } = await axios.patch(
    `${API.EDIT_LABELS(issueId)}`,
    { labels },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    },
  );

  if (status === 200) return true;
};

export const editAssignees = async ({ issueId, assignees }: EditAssigneesPropsType) => {
  const accessToken = localStorage.getItem('accessToken')!;

  const { status } = await axios.patch(
    `${API.EDIT_ASSIGNEES(issueId)}`,
    { assignees },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    },
  );

  if (status === 200) return true;
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
