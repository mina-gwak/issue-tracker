import { useEffect, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import LabelCreateEditForm from '@components/LabelCreateEditForm';
import LabelTable from '@components/LabelTable';
import TabsPageHeader from '@components/TabsPageHeader';
import * as S from '@pages/Label/Label.style';
import { labelMilestoneActiveState } from '@store/labelMilestoneActive';
const Label = () => {
  const [isCreateLabel, setIsCreateLabel] = useState(false);
  const setLabelMilestoneActiveValue = useSetRecoilState(labelMilestoneActiveState);

  const handelClickCancel = () => setIsCreateLabel(false);

  useEffect(() => {
    setLabelMilestoneActiveValue({ label: true, milestone: false });
  }, []);

  return (
    <S.Wrapper>
      <TabsPageHeader isCreateTabs={isCreateLabel} setIsCreateTabs={setIsCreateLabel} />
      {isCreateLabel && (
        <LabelCreateEditForm title='새로운 레이블 추가' handelClickCancel={handelClickCancel} />
      )}
      <LabelTable />
    </S.Wrapper>
  );
};

export default Label;
