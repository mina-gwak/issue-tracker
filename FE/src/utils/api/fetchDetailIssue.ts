import axios from 'axios';

import { API } from '@constants';

export const fetchIssueDetail = async (id: number) => {
  const accessToken = localStorage.getItem('accessToken')!;
  try {
    const response = await axios.get(`${API.SHARE_DETAIL(id)}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    });
    if (response.status === 200) return response.data;
    else throw Error('잘못된 요청입니다.');
  } catch (error) {
    throw error;
  }
};

export async function fetchEditTitle(issueId: number, title: string) {
  const accessToken = localStorage.getItem('accessToken')!;

  try {
    const response = await axios.patch(
      API.SHARE_DETAIL_TITLE(issueId),
      { title: title },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
      },
    );
    if (response.status === 200) return true;
    else throw Error('잘못된 요청입니다.');
  } catch (error) {
    throw error;
  }
}

export const fetchIssueUpdate = async (issueId: number, state: boolean) => {
  const accessToken = localStorage.getItem('accessToken')!;
  try {
    const response = await axios.post(`${API.STATUS_UPDATE}`, null, {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
      params: {
        id: issueId,
        status: !state,
      },
    });
    if (response.status === 200) return true;
    else throw Error('잘못된 요청입니다.');
  } catch (error) {
    throw error;
  }
};
