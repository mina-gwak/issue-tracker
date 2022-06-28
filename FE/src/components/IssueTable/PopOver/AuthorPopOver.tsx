import * as S from '@components/IssueTable/PopOver/PopOver.style';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';

const AuthorPopOver = () => {
  return (
    <S.Wrapper>
      <S.ContentsWrapper>
        <Image
          url='https://avatars.githubusercontent.com/u/62706988?v=4'
          alt='Jamie'
          size={IMAGE_SIZE.LARGE}
        />
        <S.UserInformation>
          <S.UserId>mina-gwak</S.UserId>
          <S.UserName>Jamie</S.UserName>
        </S.UserInformation>
      </S.ContentsWrapper>
    </S.Wrapper>
  )
}

export default AuthorPopOver;
