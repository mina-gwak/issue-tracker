import { useRecoilValue } from 'recoil';

import * as S from '@components/DetailIssueHeader/DetailIssueHeader.style';
import DetailIssueStatus from '@components/DetailIssueHeader/DetailIssueStatus';
import HeaderEditMode from '@components/DetailIssueHeader/HeaderEditMode';
import HeaderViewMode from '@components/DetailIssueHeader/HeaderViewMode';
import { titleEditMode } from '@store/detailIssue';
import { commentType, issueContentType } from '@type/detailIssueType';
import { calcTwoTimeDifference } from '@utils/date';
interface DetailIssueHeaderPropsType {
  issueId: number;
  title: string;
  editable: boolean;
  issueOutline: issueContentType;
  commentOutlines: commentType[];
  open: boolean;
}

const DetailIssueHeader = ({
  issueId,
  title,
  editable,
  issueOutline,
  commentOutlines,
  open,
}: DetailIssueHeaderPropsType) => {
  const isTitleEditMode = useRecoilValue(titleEditMode);
  const passedTime = calcTwoTimeDifference(new Date(), issueOutline.writtenTime);
  const author = issueOutline.writerOutline.optionName;
  const headerInfo = `이 이슈가 ${passedTime}에 ${author}님에 의해 작성되었습니다 ∙ 코멘트 ${commentOutlines.length}개`;

  return (
    <S.DetailIssueHeaderWrapper>
      {isTitleEditMode ? (
        <HeaderEditMode issueId={issueId} title={title} />
      ) : (
        <HeaderViewMode issueId={issueId} status={open} title={title} editable={editable} />
      )}
      <S.HeaderDescription>
        <DetailIssueStatus isOpen={open} />
        <S.IssueInfo>{headerInfo}</S.IssueInfo>
      </S.HeaderDescription>
    </S.DetailIssueHeaderWrapper>
  );
};

export default DetailIssueHeader;
