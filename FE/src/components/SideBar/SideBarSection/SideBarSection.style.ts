import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 32px;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  }
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.grey2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
