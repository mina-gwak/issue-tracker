import axios from 'axios';
import { useQuery } from 'react-query';

import { API } from '@constants';

export interface UserQueryType {
  usersOutlineResponses: {
    optionName: string;
    imageUrl: string;
  }[];
}

export const fetchUsers = async (): Promise<UserQueryType> => {
  const accessToken = localStorage.getItem('accessToken')!;

  const response = await axios.get(`${API.USER}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  });

  return response.data;
};

export const useUsersQuery = (trigger: string) =>
  useQuery(['users'], fetchUsers, {
    select: (data) => data.usersOutlineResponses,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (err) => console.log(err),
    enabled: trigger === 'assignees',
  });
