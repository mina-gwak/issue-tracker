import { useRecoilValue } from 'recoil';

import SideBar from '@components/SideBar';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import TextInput from '@components/common/TextInput';
import { INPUT_SIZE } from '@components/common/TextInput/constants';
import Textarea from '@components/common/Textarea';
import * as S from '@pages/AddIssue/AddIssue.style';
import { userState } from '@store/user';

const AddIssue = () => {
  const { name, image } = useRecoilValue(userState);

  return (
    <S.Wrapper>
      <S.PageTitle>새로운 이슈 작성</S.PageTitle>
      <S.Divider />
      <S.Form>
        <S.FormContainer>
          <S.FormWrapper>
            <Image url={image} alt={name} size={IMAGE_SIZE.MEDIUM} />
            <S.FormElements>
              <TextInput size={INPUT_SIZE.MEDIUM} name='title' placeholder='제목'  />
              <Textarea />
            </S.FormElements>
          </S.FormWrapper>
          <SideBar />
        </S.FormContainer>
        <S.Divider />
        <Button size={BUTTON_SIZE.MEDIUM} onClick={() => {}}>
          완료
        </Button>
      </S.Form>
    </S.Wrapper>
  );
};

export default AddIssue;
