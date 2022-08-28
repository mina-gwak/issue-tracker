import { useEffect } from 'react';

import { useRecoilValue, useResetRecoilState } from 'recoil';

import * as S from '@components/IssueMenu/Tabs/Tabs.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { useIssuesQuery } from '@query/issue';
import { filterBarQueryString } from '@store/filterBar';
import { labelMilestoneActiveState } from '@store/labelMilestoneActive';
import { IssueDataType } from '@type/issueType';

const Tabs = () => {
  const filterBarValue = useRecoilValue(filterBarQueryString);
  const labelMilestoneActiveValue = useRecoilValue(labelMilestoneActiveState);
  const resetTab = useResetRecoilState(labelMilestoneActiveState);

  const { data } = useIssuesQuery<IssueDataType>(filterBarValue);

  useEffect(() => {
    return () => resetTab();
  }, []);

  return (
    <S.TabContainer>
      <S.Tab to='../label' active={labelMilestoneActiveValue.label.toString()}>
        <Icon iconName={ICON_NAME.LABEL} />
        <S.TabTitle>레이블</S.TabTitle>
        <span>({data?.labelCount && data?.labelCount})</span>
      </S.Tab>
      <S.Tab to='../milestone' active={labelMilestoneActiveValue.milestone.toString()}>
        <Icon iconName={ICON_NAME.MILESTONE} />
        <S.TabTitle>마일스톤</S.TabTitle>
        <span>({data?.milestoneCount && data?.milestoneCount})</span>
      </S.Tab>
    </S.TabContainer>
  );
};

export default Tabs;
