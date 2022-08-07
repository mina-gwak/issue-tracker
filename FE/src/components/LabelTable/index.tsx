import { useRecoilValueLoadable } from 'recoil';

import LabelItem from '@components/LabelTable/LabelItem';
import * as S from '@components/LabelTable/LabelTable.style';
import LabelTableHeader from '@components/LabelTable/LabelTableHeader';
import Error from '@pages/Error';
import Loading from '@pages/Loading';
import { getLabelData } from '@store/label';
import { LabelTabType } from '@type/label';
const LabelTable = () => {
  const labelData = useRecoilValueLoadable(getLabelData);

  switch (labelData.state) {
    case 'hasValue':
      return (
        <S.Wrapper>
          <LabelTableHeader labelCount={labelData.contents.labelCount} />
          {labelData.contents.labelDetails.map((label: LabelTabType) => (
            <LabelItem key={label.id} data={label} />
          ))}
        </S.Wrapper>
      );
    case 'loading':
      return <Loading />;
    case 'hasError':
      return <Error />;
  }
};

export default LabelTable;
