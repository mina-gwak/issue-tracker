import axios from 'axios';

import { API } from '@constants';
import { LabelCreateType, LabelDataType } from '@type/label';

export const getLabelsData = async (): Promise<LabelDataType> => {
  const accessToken = localStorage.getItem('accessToken')!;
  try {
    const response = await axios.get(`${API.LABEL()}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createLabel = async (newLabelData: LabelCreateType) => {
  const accessToken = localStorage.getItem('accessToken')!;
  try {
    const response = await axios.post(
      `${API.LABEL_CREATE()}`,
      { ...newLabelData },
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

export const editLabel = async (id: number, newLabelData: LabelCreateType) => {
  const accessToken = localStorage.getItem('accessToken')!;

  try {
    const response = await axios.patch(
      `${API.LABEL_UPDATE(id)}`,
      { ...newLabelData },
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

export const deleteLabel = async (id: number) => {
  const accessToken = localStorage.getItem('accessToken')!;
  try {
    const response = await axios.delete(`${API.LABEL_DELETE(id)}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    });

    if (response.status === 200) return true;
    else throw Error('잘못된 요청입니다.');
  } catch (err) {
    throw err;
  }
};
