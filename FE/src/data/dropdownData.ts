import { DropdownType } from "@type/dropdownType";

// 데이터 axios X
export const filter: DropdownType[] = [
  { id: 1, optionName: '열린 이슈', value: 'open', },
  { id: 2, optionName: '내가 작성한 이슈', value: 'author', },
  { id: 3, optionName: '나에게 할당된 이슈', value: 'assignee', },
  { id: 4, optionName: '내가 댓글을 남긴 이슈', value: 'comment', },
  { id: 5, optionName: '닫힌 이슈', value: 'close', },
];

export const stateModify: DropdownType[] = [
  { id: 1, optionName: '선택적 이슈 열기', value: 'selectedOpen' },
  { id: 2, optionName: '선택적 이슈 닫기', value: 'selectedClose' },
]

// 데이터 axios O
export const label: DropdownType[] = [
  { id: 1, optionName: '레이블이 없는 이슈', circleIcon: '' },
  { id: 2, optionName: 'FE', circleIcon: '#000' },
  { id: 3, optionName: 'BE', circleIcon: '#F00' },
]

export const milestone: DropdownType[] = [
  { id: 1, optionName: '마일스톤이 없는 필터', },
  { id: 2, optionName: 'Masters course', },
  { id: 3, optionName: 'Code-Together course' },
]

export const assignee: DropdownType[] = [
  {
    id: 1, optionName: 'Khan',
    circleIcon: 'https://avatars.githubusercontent.com/u/93566353?v=4',
  },
  {
    id: 2, optionName: 'Jamie',
    circleIcon: 'https://avatars.githubusercontent.com/u/62706988?v=4',
  }
]

export const author: DropdownType[] = [
  {
    id: 1, optionName: 'Khan',
    circleIcon: 'https://avatars.githubusercontent.com/u/93566353?v=4',
  }
]