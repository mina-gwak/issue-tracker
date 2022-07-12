import { useRecoilValue } from 'recoil';

import * as S from '@components/IssueMenu/Tabs/Tabs.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { useIssuesQuery } from '@query/issue';
import { filterBarQueryString } from '@store/filterBar';
import { IssueDataType } from '@type/issueType';

const Tabs = () => {
  const filterBarValue = useRecoilValue(filterBarQueryString);

  const { data } = useIssuesQuery<IssueDataType>(filterBarValue);

  return (
    <S.TabContainer>
      <S.Tab to='../label'>
        <Icon iconName={ICON_NAME.LABEL} />
        <S.TabTitle>레이블</S.TabTitle>
        <span>({data?.labelCount && data?.labelCount})</span>
      </S.Tab>
      <S.Tab to='../milestone'>
        <Icon iconName={ICON_NAME.MILESTONE} />
        <S.TabTitle>마일스톤</S.TabTitle>
        <span>({data?.milestoneCount && data?.milestoneCount})</span>
      </S.Tab>
    </S.TabContainer>
  );
};

export default Tabs;
