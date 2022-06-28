import axios from 'axios';
import { useQuery } from 'react-query';

import { API } from '@constants';
import { IssuePopOverDataType } from '@type/issueType';

export const fetchIssuePopOver = async <T>(): Promise<T> => {
  const response = await axios.get(API.ISSUE_POPOVER);
  return response.data;
};

type IssuePopOverQueryPropsType<T> = (data: IssuePopOverDataType) => T;

const useIssuePopOverQuery = <T>(select?: IssuePopOverQueryPropsType<T>) =>
  useQuery(['issue-pop-over'], fetchIssuePopOver, { select });

export const useIssuePopOver = () => useIssuePopOverQuery<IssuePopOverDataType>();
