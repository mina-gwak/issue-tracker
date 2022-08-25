import { useRecoilValue } from 'recoil';

import * as S from '@components/DetailIssueHeader/DetailIssueHeader.style';
import DetailIssueStatus from '@components/DetailIssueHeader/DetailIssueStatus';
import HeaderEditMode from '@components/DetailIssueHeader/HeaderEditMode';
import HeaderViewMode from '@components/DetailIssueHeader/HeaderViewMode';
import { titleEditMode } from '@store/detailIssue';
import { DetailIssueType } from '@type/detailIssueType';
import { calcTwoTimeDifference } from '@utils/date';
interface DetailIssueHeaderPropsType {
  detailData: DetailIssueType;
}

const DetailIssueHeader = ({ detailData }: DetailIssueHeaderPropsType) => {
  const isTitleEditMode = useRecoilValue(titleEditMode);
  const currentDate = new Date();
  const passedTime = calcTwoTimeDifference(currentDate, detailData.writtenTime);
  const author = detailData.writerOutline.optionName;
  const headerInfo = `이 이슈가 ${passedTime}에 ${author}님에 의해 열렸습니다 ∙ 코멘트 ${detailData.commentOutlines.length}개`;

  return (
    <S.DetailIssueHeaderWrapper>
      {isTitleEditMode ? (
        <HeaderEditMode issueId={detailData.issueId} title={detailData.title} />
      ) : (
        <HeaderViewMode
          issueId={detailData.issueId}
          status={detailData.open}
          title={detailData.title}
        />
      )}
      <S.HeaderDescription>
        <DetailIssueStatus isOpen={detailData.open} />
        <S.IssueInfo>{headerInfo}</S.IssueInfo>
      </S.HeaderDescription>
    </S.DetailIssueHeaderWrapper>
  );
};

export default DetailIssueHeader;
