import { useEffect } from 'react';

import qs from 'qs';
import { Navigate } from 'react-router-dom';

import { API } from '@constants/api';
import { ERROR } from '@constants/errorMessage';
import useAxios from '@hooks/useAxios';
import { useLocalStorage } from '@hooks/useLocalStorage';
import Loading from '@pages/Loading';

interface TokenResponseType {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
}

const LoginCallback = () => {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const [_, setRefreshToken] = useLocalStorage('refreshToken', '');

  const { code } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const [{ response, error }] = useAxios<TokenResponseType>({
    method: 'get',
    url: API.GITHUB_LOGIN_CALLBACK,
    config: {
      params: {
        code,
      },
    },
  });

  useEffect(() => {
    if (response) {
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
    }
  }, [response]);

  if (error) return <Navigate to={'/error'} state={{ message: ERROR.LOGIN_ERROR }} replace />;
  else if (accessToken) return <Navigate to={'/issue-list'} replace />;
  else return <Loading />;
};

export default LoginCallback;
