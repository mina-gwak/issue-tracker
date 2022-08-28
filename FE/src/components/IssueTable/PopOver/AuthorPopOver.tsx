import * as S from '@components/IssueTable/PopOver/PopOver.style';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';

interface AuthorPopOverPropsType {
  writer: string;
  writerImage: string;
}

const AuthorPopOver = ({ writer, writerImage }: AuthorPopOverPropsType) => {
  return (
    <S.Wrapper>
      <S.ContentsWrapper>
        <Image
          url={writerImage}
          alt={writer}
          size={IMAGE_SIZE.LARGE}
        />
        <S.UserInformation>
          <S.UserId>{writer}</S.UserId>
        </S.UserInformation>
      </S.ContentsWrapper>
    </S.Wrapper>
  )
}

export default AuthorPopOver;
