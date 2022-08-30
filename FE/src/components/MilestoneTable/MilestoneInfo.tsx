import { Dispatch, SetStateAction } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import * as S from '@components/MilestoneTable/MilestoneTable.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import ProgressBar from '@components/common/ProgressBar';
import { milestoneStatus, milestoneTrigger } from '@store/milestone';
import { MilestoneTabType } from '@type/milestone';
import { fetchDeleteMilestone, fetchChangeStateMilestone } from '@utils/api/fetchMilestone';
import { getDate } from '@utils/date';
import { progress } from '@utils/ratio';

interface MilestoneInfoPropsType {
  data: MilestoneTabType;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const MilestoneInfo = ({ data, setEditMode }: MilestoneInfoPropsType) => {
  const { id, name, description, dueDate, openIssueCount, closeIssueCount }: MilestoneTabType =
    data;

  const isOpenMilestone = useRecoilValue(milestoneStatus);
  const setMilestoneTrigger = useSetRecoilState(milestoneTrigger);

  const handleOpenClose = async () => {
    const isSuccessFetch = await fetchChangeStateMilestone(id, isOpenMilestone);
    if (isSuccessFetch) setMilestoneTrigger((prev) => prev + 1);
  };

  const handleDelete = async () => {
    const isSuccessFetch = await fetchDeleteMilestone(id);
    if (isSuccessFetch) setMilestoneTrigger((prev) => prev + 1);
  };

  const handleEdit = () => setEditMode(true);

  return (
    <S.MilestoneItemWrapper>
      <S.LeftContainer>
        <S.MilestoneInfoTitle>
          <S.NameDateContainer>
            <Icon iconName={ICON_NAME.OPEN_MILESTONE} />
            <S.IconText>{name}</S.IconText>
          </S.NameDateContainer>
          <S.NameDateContainer>
            <Icon iconName={ICON_NAME.CALENDAR} />
            <S.IconText>{getDate(dueDate)} </S.IconText>
          </S.NameDateContainer>
        </S.MilestoneInfoTitle>
        <S.Description>{description}</S.Description>
      </S.LeftContainer>

      <S.RightContainer>
        <S.EditIcons>
          <S.IconContainer onClick={handleOpenClose}>
            <Icon iconName={ICON_NAME.CLOSE_MILESTONE} />
            {isOpenMilestone ? <S.IconText>닫기</S.IconText> : <S.IconText>열기</S.IconText>}
          </S.IconContainer>
          <S.IconContainer onClick={handleEdit}>
            <Icon iconName={ICON_NAME.EDIT_ICON} />
            <S.IconText>편집</S.IconText>
          </S.IconContainer>
          <S.IconContainer onClick={handleDelete}>
            <Icon iconName={ICON_NAME.DELETE_ICON} />
            <S.DeleteIcon>삭제</S.DeleteIcon>
          </S.IconContainer>
        </S.EditIcons>

        <div>
          <ProgressBar progress={Number(progress(openIssueCount, closeIssueCount))} />
          <S.StateContainer>
            <div>{Number(progress(openIssueCount, closeIssueCount))}%</div>
            <div>
              <S.IconText> 열린 이슈({openIssueCount}) </S.IconText>
              <S.IconText>닫힌 이슈({closeIssueCount})</S.IconText>
            </div>
          </S.StateContainer>
        </div>
      </S.RightContainer>
    </S.MilestoneItemWrapper>
  );
};

export default MilestoneInfo;
