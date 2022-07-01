import { DropdownType } from '@type/dropdownType';

// 데이터 axios X
export const filter: DropdownType[] = [
  { optionName: '열린 이슈', value: 'open' },
  { optionName: '내가 작성한 이슈', value: 'author' },
  { optionName: '나에게 할당된 이슈', value: 'assignee' },
  { optionName: '내가 댓글을 남긴 이슈', value: 'comment' },
  { optionName: '닫힌 이슈', value: 'close' },
];

export const stateModify: DropdownType[] = [
  { optionName: '선택적 이슈 열기', value: 'selectedOpen' },
  { optionName: '선택적 이슈 닫기', value: 'selectedClose' },
];

// 데이터 axios O
export const label: DropdownType[] = [
  { optionName: '레이블이 없는 이슈', colorCode: '' },
  { optionName: 'FE', colorCode: '#000' },
  { optionName: 'BE', colorCode: '#F00' },
];

export const milestone: DropdownType[] = [
  { optionName: '마일스톤이 없는 이슈', value: 'none' },
  { optionName: 'Masters course' },
  { optionName: 'Code-Together course' },
];

export const assignee: DropdownType[] = [
  {
    optionName: '담당자가 없는 이슈',
    value: 'none',
  },
  {
    optionName: 'Khan',
    imageUrl: 'https://avatars.githubusercontent.com/u/93566353?v=4',
  },
  {
    optionName: 'Jamie',
    imageUrl: 'https://avatars.githubusercontent.com/u/62706988?v=4',
  },
];

export const author: DropdownType[] = [
  {
    optionName: 'Khan',
    imageUrl: 'https://avatars.githubusercontent.com/u/93566353?v=4',
  },
];
