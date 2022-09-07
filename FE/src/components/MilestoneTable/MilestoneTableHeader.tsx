import { useRecoilState, useSetRecoilState } from 'recoil';

import * as S from '@components/MilestoneTable/MilestoneTable.style';
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
    <S.MilestoneTableHeaderTitle>
      <S.MilestoneTab onClick={() => handleClickChange(1)} isActive={milestoneStatusValue}>
        <Icon iconName={ICON_NAME.MILESTONE} />
        열린 마일스톤({milestoneOpenCount})
      </S.MilestoneTab>
      <S.MilestoneTab onClick={() => handleClickChange(0)} isActive={!milestoneStatusValue}>
        <Icon iconName={ICON_NAME.ARCHIVE} />
        닫힌 마일스톤({milestoneCloseCount})
      </S.MilestoneTab>
    </S.MilestoneTableHeaderTitle>
  );
};

export default MilestoneTableHeader;
