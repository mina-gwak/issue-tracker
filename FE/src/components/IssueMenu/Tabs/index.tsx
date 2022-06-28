import * as S from '@components/IssueMenu/Tabs/Tabs.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';

const Tabs = () => {
  return (
    <S.TabContainer>
      <S.Tab to='/레이블'>
        <Icon iconName={ICON_NAME.LABEL} />
        <S.TabTitle>레이블</S.TabTitle>
        <span>({3})</span>
      </S.Tab>
      <S.Tab to='/마일스톤'>
        <Icon iconName={ICON_NAME.MILESTONE} />
        <S.TabTitle>마일스톤</S.TabTitle>
        <span>({2})</span>
      </S.Tab>
    </S.TabContainer>
  );
};

export default Tabs;
