import { useEffect } from 'react';

import qs from 'qs';
import { Navigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { API } from '@constants/api';
import { ERROR } from '@constants/errorMessage';
import useAxios from '@hooks/useAxios';
import { useLocalStorage } from '@hooks/useLocalStorage';
import Loading from '@pages/Loading';
import { tokenState } from '@store/token';
import { userState } from '@store/user';

interface TokenResponseType {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  userProfileResponse: {
    name: string;
    nickname: string;
    image: string;
  };
}

const LoginCallback = () => {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const [_, setRefreshToken] = useLocalStorage('refreshToken', '');
  const [__, setUser] = useLocalStorage('user', '');
  const setUserState = useSetRecoilState(userState);
  const setTokenState = useSetRecoilState(tokenState);

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
      const { accessToken, refreshToken, userProfileResponse } = response;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(JSON.stringify(userProfileResponse));
      setTokenState({ refreshToken: response.refreshToken, accessToken: response.accessToken });
      setUserState(response.userProfileResponse);
    }
  }, [response]);

  if (error) return <Navigate to={'/error'} state={{ message: ERROR.LOGIN_ERROR }} replace />;
  else if (accessToken) return <Navigate to={'/issue-list'} replace />;
  else return <Loading />;
};

export default LoginCallback;
