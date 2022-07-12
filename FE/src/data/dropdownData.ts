import { DropdownType } from '@type/dropdownType';

export const issues: DropdownType[] = [
  { optionName: '열린 이슈', value: 'open' },
  { optionName: '내가 작성한 이슈', value: 'write_by_me' },
  { optionName: '나에게 할당된 이슈', value: 'assigned_me' },
  { optionName: '내가 댓글을 남긴 이슈', value: 'add_comment_by_me' },
  { optionName: '닫힌 이슈', value: 'close' },
];

export const stateModify: DropdownType[] = [
  { optionName: '선택적 이슈 열기', value: 'true' },
  { optionName: '선택적 이슈 닫기', value: 'false' },
];
