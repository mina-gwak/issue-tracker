import styled from 'styled-components';

export const MilestoneEditWrapper = styled.div<{ type: string }>`
  padding: 2rem;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.grey5};
  border-radius: 0px;
  ${({ type, theme }) =>
    type === 'create' &&
    `margin-bottom: 1.5rem; border-radius: 16px;
		border: 1px solid ${theme.colors.grey5};`};
`;

export const Title = styled.div`
  font-size: 2rem;
  margin-bottom: 3rem;
`;

export const MilestoneInputContainer = styled.div`
  position: relative;
  & > div {
    margin-bottom: 1rem;
    align-items: center;
  }
  & > div:first-child {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fontSizes.xSmall}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  left: 55%;
  top: 0;
`;

export const SubmitButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;
