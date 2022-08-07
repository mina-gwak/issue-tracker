import React from 'react';

import Tabs from '@components/IssueMenu/Tabs';
import * as S from '@components/TabsPageHeader/TabsPageHeader.style';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
interface LabelMilestonePageHeaderPropsType {
  isCreateTabs: boolean;
  setIsCreateTabs: React.Dispatch<React.SetStateAction<boolean>>;
}

const TabsPageHeader = ({ isCreateTabs, setIsCreateTabs }: LabelMilestonePageHeaderPropsType) => {
  const handleClickToggle = () => setIsCreateTabs(!isCreateTabs);

  return (
    <S.LabelPageHeaderWrapper>
      <Tabs />
      {!isCreateTabs ? (
        <Button size={BUTTON_SIZE.SMALL} onClick={handleClickToggle}>
          <span> + 추가</span>
        </Button>
      ) : (
        <Button size={BUTTON_SIZE.SMALL} onClick={handleClickToggle}>
          <span> X 닫기</span>
        </Button>
      )}
    </S.LabelPageHeaderWrapper>
  );
};

export default TabsPageHeader;
