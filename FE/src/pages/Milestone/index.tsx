import { useEffect, useState } from 'react';

import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import MilestoneCreateEditForm from '@components/MilestoneCreateEditForm';
import MilestoneTable from '@components/MilestoneTable';
import TabsPageHeader from '@components/TabsPageHeader';
import { labelMilestoneActiveState } from '@store/labelMilestoneActive';

const Milestone = () => {
  const [isCreateMilestone, setIsCreateMilestone] = useState(false);
  const setLabelMilestoneActiveValue = useSetRecoilState(labelMilestoneActiveState);

  const handelClickCancel = () => setIsCreateMilestone(false);

  useEffect(() => {
    setLabelMilestoneActiveValue({ label: false, milestone: true });
  }, []);

  return (
    <Wrapper>
      <TabsPageHeader isCreateTabs={isCreateMilestone} setIsCreateTabs={setIsCreateMilestone} />
      {isCreateMilestone && (
        <MilestoneCreateEditForm
          title='새로운 마일스톤 생성'
          type='create'
          setEditMode={handelClickCancel}
        />
      )}
      <MilestoneTable />
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
export default Milestone;
