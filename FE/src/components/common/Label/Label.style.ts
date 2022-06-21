import styled from "styled-components";

interface LabelTagType {
  backgroundColor: string;
  textColor: string;
}

export const LabelTag = styled.span<LabelTagType>`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ textColor }) => textColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 30px;
  padding: 2px 16px;
  cursor: pointer;
`;
