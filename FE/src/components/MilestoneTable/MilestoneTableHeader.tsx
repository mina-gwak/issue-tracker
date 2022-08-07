import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { milestoneStatus, milestoneTrigger } from '@store/milestone';

interface TableHeaderPropsType {
  milestoneOpenCount: number;
  milestoneCloseCount: number;
}

const MilestoneTableHeader = ({
  milestoneOpenCount,
  milestoneCloseCount,
}: TableHeaderPropsType) => {
  const setMilestoneTrigger = useSetRecoilState(milestoneTrigger);
  const [milestoneStatusValue, setMilestoneStatus] = useRecoilState(milestoneStatus);

  const handleClickChange = (n: number) => {
    setMilestoneStatus(Boolean(n));
    setMilestoneTrigger((trigger) => trigger + 1);
  };

  return (
    <Title>
      <MilestoneTab onClick={() => handleClickChange(1)} focus={milestoneStatusValue}>
        <Icon iconName={ICON_NAME.OPEN_MILESTONE} />
        열린 마일스톤({milestoneOpenCount})
      </MilestoneTab>
      <MilestoneTab onClick={() => handleClickChange(0)} focus={!milestoneStatusValue}>
        <Icon iconName={ICON_NAME.CLOSE_MILESTONE} />
        닫힌 마일스톤({milestoneCloseCount})
      </MilestoneTab>
    </Title>
  );
};

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.grey6};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 16px 16px 0 0;
  padding: 0 32px;
`;

const MilestoneTab = styled.div<{ focus: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  color: ${({ focus, theme }) => focus && theme.colors.black};
  font-weight: ${({ focus, theme }) => focus && theme.fontWeights.bold};
`;

export default MilestoneTableHeader;
