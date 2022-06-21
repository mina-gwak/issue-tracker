import * as S from '@components/common/Label/Label.style';

export interface LabelPropsType {
  name: string;
  backgroundColor: string;
  textColor: string;
}

const Label = ({ name, backgroundColor, textColor }: LabelPropsType) => {
  return (
    <S.LabelTag backgroundColor={backgroundColor} textColor={textColor}>
      {name}
    </S.LabelTag>
  );
};

export default Label;
