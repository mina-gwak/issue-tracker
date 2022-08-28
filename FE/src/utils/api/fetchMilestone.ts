import axios from 'axios';

import { API } from '@constants';

export const getMilestonesData = async (state: string): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken')!;
  try {
    const response = await axios.get(`${API.MILESTONE}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
      params: {
        open: state,
      },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export async function fetchCreateMilestone(newMilestoneData: { [key: string]: string }) {
  const accessToken = localStorage.getItem('accessToken')!;
  try {
    const response = await axios.post(
      `${API.MILESTONE_CREATE}`,
      { ...newMilestoneData },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
      },
    );

    if (response.status === 200) return true;
    else throw Error('잘못된 생성입니다.');
  } catch (error) {
    throw error;
  }
}

export async function fetchEditMilestone(id: number, newMilestoneData: { [key: string]: string }) {
  const accessToken = localStorage.getItem('accessToken')!;
  try {
    const response = await axios.patch(
      `${API.MILESTONE_UPDATE(id)}`,
      { ...newMilestoneData },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
      },
    );

    if (response.status === 200) return true;
    else throw Error('잘못된 생성입니다.');
  } catch (error) {
    throw error;
  }
}

export async function fetchChangeStateMilestone(id: number, state: string) {
  const accessToken = localStorage.getItem('accessToken')!;
  try {
    const response = await axios.patch(API.MILESTONE_OPEN_CLOSE(id), {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
      params: {
        open: state,
      },
    });

    if (response.status === 200) return true;
    else throw Error('잘못된 생성입니다.');
  } catch (err) {
    throw err;
  }
}

export async function fetchDeleteMilestone(id: number) {
  const accessToken = localStorage.getItem('accessToken')!;
  try {
    const response = await axios.delete(API.MILESTONE_DELETE(id), {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    });

    if (response.status === 200) return true;
    else throw Error('잘못된 요청입니다.');
  } catch (err) {
    throw err;
  }
}
