import React, { useEffect, useState } from 'react';

import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import LabelCreateEditForm from '@components/LabelCreateEditForm';
import LabelPageHeader from '@components/LabelPageHeader';
import LabelTable from '@components/LabelTable';
import { labelMilestoneActiveState } from '@store/labelMilestoneActive';

const Label = () => {
  const [isCreateLabel, setIsCreateLabel] = useState(false);
  const setLabelMilestoneActiveValue = useSetRecoilState(labelMilestoneActiveState);

  const handelClickCancel = () => setIsCreateLabel(false);
  useEffect(() => {
    setLabelMilestoneActiveValue({ label: true, milestone: false });
  }, []);

  return (
    <Wrapper>
      <LabelPageHeader isCreateLabel={isCreateLabel} setIsCreateLabel={setIsCreateLabel} />
      {isCreateLabel && (
        <LabelCreateEditForm title='새로운 레이블 추가' handelClickCancel={handelClickCancel} />
      )}
      <LabelTable />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1440px;
  padding: 0 80px;
  margin: 0 auto 120px;
`;
export default Label;
