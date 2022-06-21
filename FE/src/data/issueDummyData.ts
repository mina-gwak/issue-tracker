import { IssueListType } from '@type/issueType';

export const issueDummyData: IssueListType[] = [
  {
    id: 1,
    num: 1,
    title: 'FE 이슈트래커 개발',
    labels: [{ id: 11, name: 'FE', backgroundColor: '#000', textColor: '#fff' }],
    milestone: { id: 111, title: '마스터즈 코스' },
    assignees: [
      { id: 1111, name: 'Khan', imgUrl: 'https://avatars.githubusercontent.com/u/93566353?v=4' },
      { id: 2222, name: 'Jamie', imgUrl: 'https://avatars.githubusercontent.com/u/62706988?v=4' },
    ],
    author: {
      id: 11111,
      name: 'Khan',
      imgUrl: 'https://avatars.githubusercontent.com/u/93566353?v=4',
    },
    time: new Date(1655712214955),
  },
  {
    id: 2,
    num: 2,
    title: 'BE OAuth 개발',
    labels: [{ id: 22, name: 'BE', backgroundColor: '#f00', textColor: '#fff' }],
    milestone: { id: 222, title: '마스터즈 코스' },
    assignees: [
      { id: 1111, name: 'Khan', imgUrl: 'https://avatars.githubusercontent.com/u/93566353?v=4' },
      { id: 2222, name: 'Jamie', imgUrl: 'https://avatars.githubusercontent.com/u/62706988?v=4' },
    ],
    author: {
      id: 2222,
      name: 'Jamie',
      imgUrl: 'https://avatars.githubusercontent.com/u/62706988?v=4',
    },
    time: new Date(1655712114955),
  },
];
