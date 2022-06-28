import { rest } from 'msw';

import { API, BASE_URL } from '@constants';

const GET_ISSUE = rest.get(`${BASE_URL}${API.ISSUE}`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        labelCoverResponses: [
          {
            labelName: '제이미',
            labelColor: 'yellow',
            textColor: 'black',
          },
          {
            labelName: '루시드',
            labelColor: 'red',
            textColor: 'white',
          },
        ],
        title: 'title1',
        issueId: 1,
        isOpen: true,
        writer: 'guest',
        writerImage:
          'http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg',
        modificationTime: '2022-06-18T03:24:00',
        milestoneName: 'BE course',
      },
      {
        labelCoverResponses: [
          {
            labelName: '루시드',
            labelColor: 'red',
            textColor: 'white',
          },
          {
            labelName: 'FE',
            labelColor: 'Red',
            textColor: 'black',
          },
        ],
        title: 'title2',
        issueId: 2,
        isOpen: false,
        writer: 'lucid',
        writerImage:
          'http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg',
        modificationTime: '2022-06-18T03:24:00',
        milestoneName: 'Fe course',
      },
      {
        labelCoverResponses: [],
        title: 'title3',
        issueId: 3,
        isOpen: false,
        writer: 'lucid',
        writerImage:
          'http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg',
        modificationTime: '2022-06-18T03:24:00',
        milestoneName: 'Android course',
      },
      {
        labelCoverResponses: [],
        title: 'title4',
        issueId: 4,
        isOpen: true,
        writer: 'tesla',
        writerImage:
          'http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg',
        modificationTime: '2022-06-18T03:24:00',
        milestoneName: 'iOS course',
      },
      {
        labelCoverResponses: [],
        title: 'title5',
        issueId: 5,
        isOpen: true,
        writer: 'guest',
        writerImage:
          'http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg',
        modificationTime: '2022-06-18T03:24:00',
        milestoneName: 'Fe course',
      },
    ]),
  );
});

const GET_ISSUE_POPOVER_DATA = rest.get(`${BASE_URL}${API.ISSUE_POPOVER}`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      contents:
        '📃 Description 이슈의 제목, 작성자에 마우스를 올리면 나타나는 팝오버 구현 ☑ Todo 팝오버 컴포넌트 생성 제목, 작성자 팝오버 …',
      registerTime: '2022-06-18T03:24:00',
      assignees: [
        { id: 1111, name: 'Khan', imgUrl: 'https://avatars.githubusercontent.com/u/93566353?v=4' },
        { id: 2222, name: 'Jamie', imgUrl: 'https://avatars.githubusercontent.com/u/62706988?v=4' },
      ],
    }),
  );
});

export const handlers = [GET_ISSUE, GET_ISSUE_POPOVER_DATA];
