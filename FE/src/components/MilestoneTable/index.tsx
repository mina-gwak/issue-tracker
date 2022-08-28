import React from 'react';

import { useRecoilValueLoadable } from 'recoil';

import MilestoneItem from '@components/MilestoneTable/MilestoneItem';
import * as S from '@components/MilestoneTable/MilestoneTable.style';
import MilestoneTableHeader from '@components/MilestoneTable/MilestoneTableHeader';
import Error from '@pages/Error';
import Loading from '@pages/Loading';
import { getMilestoneData } from '@store/milestone';

const MilestoneTable = () => {
  const milestoneData = useRecoilValueLoadable(getMilestoneData);

  switch (milestoneData.state) {
    case 'hasValue':
      return (
        <S.Wrapper>
          <MilestoneTableHeader
            milestoneOpenCount={milestoneData.contents.openMilestoneCount}
            milestoneCloseCount={milestoneData.contents.closeMilestoneCount}
          />
          {milestoneData.contents.milestoneSingleInfos.map((data: any) => (
            <MilestoneItem key={data.id} data={data} />
          ))}
        </S.Wrapper>
      );
    case 'loading':
      return <Loading />;
    case 'hasError':
      return <Error />;
  }
};

export default MilestoneTable;
