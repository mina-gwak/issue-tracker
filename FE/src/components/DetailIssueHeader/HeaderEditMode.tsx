import { ChangeEvent, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import * as S from '@components/DetailIssueHeader/DetailIssueHeader.style';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value);
  const handleSubmit = async () => {
    const fetchResult = await fetchEditTitle(issueId, editTitle);
    if (fetchResult) {
      setTitleEditMode(false);
      setDetailRender((prev) => prev + 1);
    }
  };

  return (
    <S.HeaderEditWrapper>
      <div>
        <S.TitleInput value={editTitle} onChange={handleChange} />
      </div>
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
