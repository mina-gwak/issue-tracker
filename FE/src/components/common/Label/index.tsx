import * as S from '@components/common/Label/Label.style';

export interface LabelPropsType {
  labelName: string;
  labelColor: string;
  textColor: string;
}

const Label = ({ labelName, labelColor, textColor }: LabelPropsType) => {
  return (
    <S.LabelTag backgroundColor={labelColor} textColor={textColor}>
      {labelName}
    </S.LabelTag>
  );
};

export default Label;
