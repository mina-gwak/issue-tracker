import { useEffect, useState } from 'react';

import axios, { AxiosRequestConfig } from 'axios';

export interface AxiosTypes {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
  config?: AxiosRequestConfig;
}

const accessToken = localStorage.getItem('accessToken') || '';

export const instance = axios.create({
  headers: {
    Authorization: `Bearer ${JSON.parse(accessToken)}`,
  },
});

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
