import styled from 'styled-components';

import { flexCenter } from '@styles/mixin';

interface LabelBadgePropsType {
  name: string;
  colorCode: string;
  textColor: string;
}

const LabelBadge = ({ name, colorCode, textColor }: LabelBadgePropsType) => {
  return (
    <Wrapper>
      <LabelBadgeContainer colorCode={colorCode} textColor={textColor}>
        {name}
      </LabelBadgeContainer>
    </Wrapper>
  );
};

interface StyledProps {
  colorCode: string;
  textColor: string;
}

const Wrapper = styled.div`
  margin-left: 10px;
`;

const LabelBadgeContainer = styled.div<StyledProps>`
  ${flexCenter}
  display: inline-block;

  padding: 6px 16px;
  border-radius: 30px;
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
  background-color: ${({ colorCode, theme }) =>
    colorCode === '배경색상' ? theme.colors.grey3 : colorCode};
  color: ${({ textColor }) => textColor};
`;

export default LabelBadge;
