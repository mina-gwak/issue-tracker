import { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import * as S from '@components/DetailIssueHeader/DetailIssueHeader.style';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import TextInput from '@components/common/TextInput';
import { queryClient } from '@src';
import { detailIssueTrigger, titleEditMode } from '@store/detailIssue';
import { fetchEditTitle } from '@utils/api/fetchDetailIssue';

interface HeaderEditModePropsType {
  issueId: number;
  title: string;
}

const HeaderEditMode = ({ issueId, title }: HeaderEditModePropsType) => {
  const setDetailRender = useSetRecoilState(detailIssueTrigger);
  const setTitleEditMode = useSetRecoilState(titleEditMode);
  const [editTitle, setEditTitle] = useState(title);

  const handleCancel = () => setTitleEditMode(false);
  const handleSubmit = async () => {
    const fetchResult = await fetchEditTitle(issueId, editTitle);
    if (fetchResult) {
      setTitleEditMode(false);
      setDetailRender((prev) => prev + 1);
      queryClient.invalidateQueries(['issues', issueId]);
    }
  };

  return (
    <S.HeaderEditWrapper>
      <S.TitleInputContainer>
        <TextInput name='issueTitle' placeholder='제목' value={editTitle} setValue={setEditTitle} />
      </S.TitleInputContainer>
      <S.EditButtonContainer>
        <Button size={BUTTON_SIZE.SMALL} outline={true} onClick={handleCancel}>
          <span> X 편집 취소</span>
        </Button>
        <Button size={BUTTON_SIZE.SMALL} outline={true} onClick={handleSubmit}>
          <span> 편집 완료</span>
        </Button>
      </S.EditButtonContainer>
    </S.HeaderEditWrapper>
  );
};

export default HeaderEditMode;
