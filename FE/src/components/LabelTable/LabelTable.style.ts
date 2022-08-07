import styled from 'styled-components';

import { flexCenter } from '@styles/mixin';

//index.tsx
export const Wrapper = styled.div`
  width: 1280px;
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 11px;
  overflow: hidden;

  & > *:last-child {
    border-radius: 0 0 11px 11px;
  }
`;

//LabelTableHeader
export const LabelTableTitle = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.grey6};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 16px 16px 0 0;
  padding: 0 32px;
`;

//LabelItem
export const EditFormWrapper = styled.div`
  border-radius: 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.grey4};
`;

export const EditFormContainer = styled.div`
  display: grid;
  grid-template-columns: 10% 60% 10%;
  align-items: center;
  gap: 110px;
  width: auto;
  min-width: 1200px;
  height: 90px;
  background: ${({ theme }) => theme.colors.white};
  padding: 16px 63px 16px 32px;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  }
`;

export const Description = styled.div`
  display: flex;
  width: 730px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.grey2};
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
`;

export const EditIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  cursor: pointer;
`;

export const DeleteIcon = styled.div`
  color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
`;

//LabelBadge
interface StyledProps {
  colorCode: string;
  textColor: string;
}

export const LabelBadgeWrapper = styled.div`
  margin-left: 10px;
`;

export const LabelBadgeContainer = styled.div<StyledProps>`
  ${flexCenter}
  display: inline-block;

  padding: 6px 16px;
  border-radius: 30px;
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
  background-color: ${({ colorCode, theme }) =>
    colorCode === '배경색상' ? theme.colors.grey3 : colorCode};
  color: ${({ textColor }) => textColor};
`;
