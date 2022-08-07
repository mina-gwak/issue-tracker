import axios, { AxiosResponse } from 'axios';

import { API } from '@constants';

export const getImageUrl = async (file: File): Promise<AxiosResponse<{ fileUrl: string }>> => {
  const accessToken = localStorage.getItem('accessToken')!;

  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API.FILE_UPLOAD}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  });

  return response.data.fileUrl;
};
