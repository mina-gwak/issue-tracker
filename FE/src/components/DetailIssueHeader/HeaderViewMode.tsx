import { useSetRecoilState } from 'recoil';

import * as S from '@components/DetailIssueHeader/DetailIssueHeader.style';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import { detailIssueTrigger, titleEditMode } from '@store/detailIssue';
import { fetchIssueUpdate } from '@utils/api/fetchDetailIssue';

interface HeaderViewModePropsType {
  issueId: number;
  status: boolean;
  title: string;
  editable: boolean;
}

const HeaderViewMode = ({ issueId, status, title, editable }: HeaderViewModePropsType) => {
  const setTitleEditMode = useSetRecoilState(titleEditMode);
  const setIssueOpenClose = useSetRecoilState(detailIssueTrigger);
  const issueStateValue = status ? '이슈닫기' : '이슈열기';

  const handleEditClick = () => setTitleEditMode(true);
  const handleOpenClose = async () => {
    const response = await fetchIssueUpdate(issueId, status);
    if (response) setIssueOpenClose((prev) => prev + 1);
  };

  return (
    <S.HeaderViewWrapper>
      <S.HeaderTitleContainer>
        <S.Title>{title} </S.Title>
        <S.IssueNumber> {' #' + issueId}</S.IssueNumber>
      </S.HeaderTitleContainer>
      <S.ViewButtonContainer>
        {editable && (
          <Button size={BUTTON_SIZE.SMALL} outline={true} onClick={handleEditClick}>
            <span> 제목편집</span>
          </Button>
        )}
        <Button size={BUTTON_SIZE.SMALL} outline={true} onClick={handleOpenClose}>
          <span>{issueStateValue}</span>
        </Button>
      </S.ViewButtonContainer>
    </S.HeaderViewWrapper>
  );
};

export default HeaderViewMode;
