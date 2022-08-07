import { Dispatch, SetStateAction } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import ProgressBar from '@components/common/ProgressBar';
import { milestoneStatus, milestoneTrigger } from '@store/milestone';
import { MilestoneTabType } from '@type/milestone';
import { fetchDeleteMilestone, fetchChangeStateMilestone } from '@utils/api/fetchMilestone';
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
    let state = isOpenMilestone ? 'open' : 'close';
    const isSuccessFetch = await fetchChangeStateMilestone(id, state);
    if (isSuccessFetch) setMilestoneTrigger((prev) => prev + 1);
  };

  const handleDelete = async () => {
    const isSuccessFetch = await fetchDeleteMilestone(id);
    if (isSuccessFetch) setMilestoneTrigger((prev) => prev + 1);
  };

  const handleEdit = () => setEditMode(true);

  return (
    <MilestoneItemBlock>
      <LeftContainer>
        <Title>
          <div>
            <Icon iconName={ICON_NAME.OPEN_MILESTONE} />
            <IconText>{name}</IconText>
          </div>
          <div>
            <Icon iconName={ICON_NAME.CALENDAR} />
            <IconText>{dueDate} </IconText>
          </div>
        </Title>
        <Description>{description}</Description>
      </LeftContainer>

      <RightContainer>
        <EditIcons>
          <IconContainer onClick={handleOpenClose}>
            <Icon iconName={ICON_NAME.CLOSE_MILESTONE} />
            {isOpenMilestone ? <IconText>닫기</IconText> : <IconText>열기</IconText>}
          </IconContainer>
          <IconContainer onClick={handleEdit}>
            <Icon iconName={ICON_NAME.EDIT_ICON} />
            <IconText>편집</IconText>
          </IconContainer>
          <IconContainer onClick={handleDelete}>
            <Icon iconName={ICON_NAME.DELETE_ICON} />
            <DeleteIcon>삭제</DeleteIcon>
          </IconContainer>
        </EditIcons>

        <div>
          <ProgressBar progress={Number(progress(openIssueCount, closeIssueCount))} />
          <State>
            <div>{Number(progress(openIssueCount, closeIssueCount))}%</div>
            <div>
              <IconText> 열린 이슈({openIssueCount}) </IconText>
              <IconText>닫힌 이슈({closeIssueCount})</IconText>
            </div>
          </State>
        </div>
      </RightContainer>
    </MilestoneItemBlock>
  );
};

const MilestoneItemBlock = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.grey2};
  padding: 10px;
`;

const Title = styled.div`
  display: flex;
  div {
    padding-left: 12px;
  }
`;

const LeftContainer = styled.div``;

const Description = styled.div`
  display: flex;
  padding-top: 5px;
  margin-left: 12px;
`;

const RightContainer = styled.div`
  width: 245px;
`;

const EditIcons = styled.div`
  cursor: pointer;
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.xSmall}px;
  justify-content: flex-end;
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;
const IconText = styled.span`
  margin-left: 5px;
`;
const DeleteIcon = styled.div`
  color: ${({ theme }) => theme.colors.red};
`;
const State = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.xSmall}px;
`;

export default MilestoneInfo;
