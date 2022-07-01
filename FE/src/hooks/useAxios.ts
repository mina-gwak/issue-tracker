import { useEffect, useMemo, useState } from 'react';

import axios, { AxiosRequestConfig } from 'axios';
import { useRecoilValue } from 'recoil';

import { tokenState } from '@store/token';

export interface AxiosTypes {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
  config?: AxiosRequestConfig;
}

const useAxios = <T>({
  method,
  url,
  config,
}: AxiosTypes): [
  {
    response: T | undefined;
    error: string;
    isLoading: boolean;
  },
  () => void,
] => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useRecoilValue(tokenState);

  const option = useMemo(() => {
    if (!accessToken) return;
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }, [accessToken]);

  const instance = axios.create(option);

  const request = () => {
    setIsLoading(true);

    instance[method](url, config)
      .then((res) => setResponse(res.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => request(), []);

  return [{ response, error, isLoading }, request];
};

export default useAxios;
