import { useEffect, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import MilestoneCreateEditForm from '@components/MilestoneCreateEditForm';
import MilestoneTable from '@components/MilestoneTable';
import TabsPageHeader from '@components/TabsPageHeader';
import * as S from '@pages/Milestone/Milestone.style';
import { labelMilestoneActiveState } from '@store/labelMilestoneActive';

const Milestone = () => {
  const [isCreateMilestone, setIsCreateMilestone] = useState(false);
  const setLabelMilestoneActiveValue = useSetRecoilState(labelMilestoneActiveState);

  const handelClickCancel = () => setIsCreateMilestone(false);

  useEffect(() => {
    setLabelMilestoneActiveValue({ label: false, milestone: true });
  }, []);

  return (
    <S.Wrapper>
      <TabsPageHeader isCreateTabs={isCreateMilestone} setIsCreateTabs={setIsCreateMilestone} />
      {isCreateMilestone && (
        <MilestoneCreateEditForm
          title='새로운 마일스톤 생성'
          type='create'
          setEditMode={handelClickCancel}
        />
      )}
      <MilestoneTable />
    </S.Wrapper>
  );
};

export default Milestone;
