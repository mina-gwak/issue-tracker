import { rest } from 'msw';

import { API, BASE_URL } from '@constants';

const GET_ISSUE = rest.get(`${BASE_URL}${API.ISSUE}`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        "labelCoverResponses": [
          {
            "labelName": "제이미",
            "labelColor": "yellow",
            "textColor": "white"
          },
          {
            "labelName": "루시드",
            "labelColor": "red",
            "textColor": "white"
          }
        ],
        "title": "title1",
        "issueId": 1,
        "writer": "guest",
        "writerImage": "http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg",
        "modificationTime": null,
        "milestoneName": "BE course"
      },
      {
        "labelCoverResponses": [
          {
            "labelName": "루시드",
            "labelColor": "red",
            "textColor": "white"
          },
          {
            "labelName": "FE",
            "labelColor": "Red",
            "textColor": "black"
          }
        ],
        "title": "title2",
        "issueId": 2,
        "writer": "lucid",
        "writerImage": "image1",
        "modificationTime": null,
        "milestoneName": "Fe course"
      },
      {
        "labelCoverResponses": [],
        "title": "title3",
        "issueId": 3,
        "writer": "lucid",
        "writerImage": "image1",
        "modificationTime": null,
        "milestoneName": "Android course"
      },
      {
        "labelCoverResponses": [],
        "title": "title4",
        "issueId": 4,
        "writer": "tesla",
        "writerImage": "image2",
        "modificationTime": null,
        "milestoneName": "iOS course"
      },
      {
        "labelCoverResponses": [],
        "title": "title5",
        "issueId": 5,
        "writer": "guest",
        "writerImage": "http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg",
        "modificationTime": null,
        "milestoneName": "Fe course"
      }
    ]),
  );
});

export const handlers = [GET_ISSUE];
