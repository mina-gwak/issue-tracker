import Icon from '@components/common/Icon';
import { ICON_NAME, ICON_SIZE } from '@components/common/Icon/constants';
import Image from '@components/common/Image';
import { IMAGE_NAME } from '@components/common/Image/constants';
import * as S from '@pages/Login/Login.style';

const Login = () => {
  const url = '';
  return (
    <S.Wrapper>
      <h1>
        <Image imageName={IMAGE_NAME.LARGE_LOGO} />
      </h1>
      <S.LoginContainer>
        <S.GithubLoginButton to={url}>
          <Icon iconName={ICON_NAME.GITHUB} iconSize={ICON_SIZE.SMALL} />
          GitHub 계정으로 로그인
        </S.GithubLoginButton>
      </S.LoginContainer>
    </S.Wrapper>
  );
};

export default Login;
