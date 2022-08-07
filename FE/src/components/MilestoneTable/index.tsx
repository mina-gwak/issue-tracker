import React from 'react';

import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';

import MilestoneItem from '@components/MilestoneTable/MilestoneItem';
import MilestoneTableHeader from '@components/MilestoneTable/MilestoneTableHeader';
import Loading from '@pages/Loading';
import { getMilestoneData } from '@store/milestone';

const MilestoneTable = () => {
  const milestoneData = useRecoilValueLoadable(getMilestoneData);

  switch (milestoneData.state) {
    case 'hasValue':
      return (
        <Wrapper>
          <MilestoneTableHeader
            milestoneOpenCount={milestoneData.contents.openMilestoneCount}
            milestoneCloseCount={milestoneData.contents.closeMilestoneCount}
          />
          {milestoneData.contents.milestoneSingleInfos.map((data: any) => (
            <React.Fragment key={data.id}>
              <MilestoneItem data={data} />
            </React.Fragment>
          ))}
        </Wrapper>
      );
    case 'loading':
      return <Loading />;
    case 'hasError':
      throw milestoneData.contents;
  }
};

const Wrapper = styled.div`
  width: 1280px;
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 11px;
  overflow: hidden;

  & > *:last-child {
    border-radius: 0 0 11px 11px;
  }
`;

export default MilestoneTable;
