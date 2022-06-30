import { IssueType } from '@type/issueType';

export const issueDummyData: IssueType[] = [
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
    writer: 'guest',
    writerImage: 'http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg',
    modificationTime: '2022-06-18T03:24:00',
    milestoneName: 'BE course',
    opened: true,
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
    writer: 'lucid',
    writerImage: 'http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg',
    modificationTime: '2022-06-18T03:24:00',
    milestoneName: 'Fe course',
    opened: false,
  },
  {
    labelCoverResponses: [],
    title: 'title3',
    issueId: 3,
    writer: 'lucid',
    writerImage: 'http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg',
    modificationTime: '2022-06-18T03:24:00',
    milestoneName: 'Android course',
    opened: true,
  },
  {
    labelCoverResponses: [],
    title: 'title4',
    issueId: 4,
    writer: 'tesla',
    writerImage: 'http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg',
    modificationTime: '2022-06-18T03:24:00',
    milestoneName: 'iOS course',
    opened: true,
  },
  {
    labelCoverResponses: [],
    title: 'title5',
    issueId: 5,
    writer: 'guest',
    writerImage: 'http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg',
    modificationTime: '2022-06-18T03:24:00',
    milestoneName: 'Fe course',
    opened: false,
  },
];
