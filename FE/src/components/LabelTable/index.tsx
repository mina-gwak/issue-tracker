import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';

import LabelItem from '@components/LabelTable/LabelItem';
import TableHeader from '@components/LabelTable/TableHeader';
import Loading from '@pages/Loading';
import { getLabelData } from '@store/label';
import { LabelTabType } from '@type/label';

const LabelTable = () => {
  const labelData = useRecoilValueLoadable(getLabelData);

  switch (labelData.state) {
    case 'hasValue':
      return (
        <Wrapper>
          <TableHeader labelCount={labelData.contents.labelCount} />
          {labelData.contents.labelDetails.map((label: LabelTabType) => (
            <LabelItem key={label.id} data={label} />
          ))}
        </Wrapper>
      );
    case 'loading':
      return <Loading />;
    case 'hasError':
      throw labelData.contents;
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

export default LabelTable;
