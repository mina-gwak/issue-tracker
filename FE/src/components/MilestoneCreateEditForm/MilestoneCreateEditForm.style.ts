import styled, { css } from 'styled-components';

export const MilestoneEditWrapper = styled.form<{ type: string }>`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ type, theme }) =>
    type === 'create' &&
    css`
      margin-bottom: 1.5rem;
      border-radius: 16px;
      border: 1px solid ${theme.colors.grey4};
    `};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-bottom: 24px;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const SubmitButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`;
