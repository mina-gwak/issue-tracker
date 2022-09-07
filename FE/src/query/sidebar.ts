import { useQueries } from 'react-query';
import { useRecoilValue } from 'recoil';

import { fetchLabels } from '@query/label';
import { fetchMilestones, MilestoneQueryType } from '@query/milestone';
import { fetchUsers, UserQueryType } from '@query/user';
import { issueOptionsState } from '@store/issueOptions';
import { WriterType } from '@type/detailIssueType';
import { LabelDataType, LabelTabType } from '@type/label';
import { MilestoneTabType } from '@type/milestone';

interface SectionDataType<T, U, V> {
  type: 'assignees' | 'labels' | 'milestone';
  queryFn: Function;
  select: (selected: T) => (data: U) => V[];
}

type UseSideBarQueryReturnType = [WriterType[], LabelTabType[], MilestoneTabType[]];

const section: [
  SectionDataType<string[], UserQueryType, WriterType>,
  SectionDataType<string[], LabelDataType, LabelTabType>,
  SectionDataType<string, MilestoneQueryType, MilestoneTabType>,
] = [
  {
    type: 'assignees',
    queryFn: fetchUsers,
    select: (selected) => (data) =>
      data.usersOutlineResponses.filter((item) => selected.includes(item.optionName)),
  },
  {
    type: 'labels',
    queryFn: fetchLabels,
    select: (selected) => (data) =>
      data.labelDetails.filter((item) => selected.includes(item.name)),
  },
  {
    type: 'milestone',
    queryFn: fetchMilestones,
    select: (selected) => (data) =>
      data.milestoneSingleInfos.filter((item) => item.name === selected),
  },
];

export const useSideBarQuery = (): UseSideBarQueryReturnType => {
  const issueOptions = useRecoilValue(issueOptionsState);

  const [{ data: assignees }, { data: labels }, { data: milestones }] = useQueries(
    section.map(({ type, queryFn, select }) => {
      return {
        queryKey: ['section', type],
        queryFn: () => queryFn(),
        select: select(issueOptions[type] as string[] & string),
      };
    }),
  );

  return [assignees as WriterType[], labels as LabelTabType[], milestones as MilestoneTabType[]];
};
