import React from 'react';

import styled from 'styled-components';

import Tabs from '@components/IssueMenu/Tabs';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';

interface LabelPageHeaderType {
  isCreateLabel: boolean;
  setIsCreateLabel: React.Dispatch<React.SetStateAction<boolean>>;
}

const LabelPageHeader = ({ isCreateLabel, setIsCreateLabel }: LabelPageHeaderType) => {
  const handleClickToggle = () => setIsCreateLabel(!isCreateLabel);

  return (
    <LabelPageHeaderBlock>
      <Tabs />
      {!isCreateLabel ? (
        <Button size={BUTTON_SIZE.SMALL} onClick={handleClickToggle}>
          <span> + 추가</span>
        </Button>
      ) : (
        <Button size={BUTTON_SIZE.SMALL} onClick={handleClickToggle}>
          <span> X 닫기</span>
        </Button>
      )}
    </LabelPageHeaderBlock>
  );
};

const LabelPageHeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export default LabelPageHeader;
