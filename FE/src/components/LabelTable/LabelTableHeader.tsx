import * as S from '@components/LabelTable/LabelTable.style';

interface TableHeaderPropsType {
  labelCount: number;
}

const LabelTableHeader = ({ labelCount }: TableHeaderPropsType) => {
  return <S.LabelTableTitle>{labelCount}개의 레이블</S.LabelTableTitle>;
};

export default LabelTableHeader;
