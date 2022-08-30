import { useState } from 'react';

import MilestoneCreateEditForm from '@components/MilestoneCreateEditForm';
import MilestoneInfo from '@components/MilestoneTable/MilestoneInfo';
import { MilestoneTabType } from '@type/milestone';

const MilestoneItem = ({ data }: { data: MilestoneTabType }) => {
  const [isEditMode, setEditMode] = useState(false);

  return !isEditMode ? (
    <MilestoneInfo setEditMode={setEditMode} data={data} />
  ) : (
    <MilestoneCreateEditForm
      title='마일스톤 편집'
      type='edit'
      setEditMode={setEditMode}
      data={data}
    />
  );
};

export default MilestoneItem;
