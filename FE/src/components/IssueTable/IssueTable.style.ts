import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 1280px;
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 11px;

  & > *:last-child {
    border-radius: 0 0 11px 11px;
  }
`;

export const NoIssue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  min-width: 1200px;
  height: 90px;
  background: ${({ theme }) => theme.colors.white};
`;
