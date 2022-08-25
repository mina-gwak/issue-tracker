import axios from 'axios';

import { API } from '@constants';

export const CreateComment = async (issueId: number, comment: string) => {
  const accessToken = localStorage.getItem('accessToken')!;
  try {
    const response = await axios.post(
      `${API.COMMENT_CREATE(issueId)}`,
      { contents: comment },
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
};
