import styled, { css } from 'styled-components';

// index.tsx
export const LabelEditFormWrapper = styled.div<{ title: string }>`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ title, theme }) => title === '새로운 레이블 추가' && css`
    border: 1px solid ${theme.colors.grey4};
    border-radius: 16px;
    margin-bottom: 24px;
  `}
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-bottom: 24px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`;

// LabelCreateEdit.tsx
export const LabelEditWrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  margin-bottom: 1rem;
  
  & > div:first-of-type {
    margin-left: 50px;
  }
`;

export const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 350px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.grey5};
  border: 1px solid ${({ theme }) => theme.colors.grey6};
  border-radius: 11px;
  padding: 12px 24px;
`;

export const LabelEdit = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 1rem;
  }
`;

export const LabelEditColor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const BackgroundColorInputContainer = styled.div`
  position: relative;
  width: 260px;
  
  input {
    min-width: 260px;
  }
`;

export const ChangeColorButton = styled.button`
  position: absolute;
  top: 0;
  right: 12px;
  width: 40px;
  height: 40px;
  
  svg {
    margin: auto;
  }
`;

export const RadioTitle = styled.span`
  color: ${({ theme }) => theme.colors.grey2};
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
`;

export const RadioButton = styled.input`
  display: none;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
