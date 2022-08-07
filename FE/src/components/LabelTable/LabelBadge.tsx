import * as S from '@components/LabelTable/LabelTable.style';

interface LabelBadgePropsType {
  name: string;
  colorCode: string;
  textColor: string;
}

const LabelBadge = ({ name, colorCode, textColor }: LabelBadgePropsType) => {
  return (
    <S.LabelBadgeWrapper>
      <S.LabelBadgeContainer colorCode={colorCode} textColor={textColor}>
        {name}
      </S.LabelBadgeContainer>
    </S.LabelBadgeWrapper>
  );
};

export default LabelBadge;
