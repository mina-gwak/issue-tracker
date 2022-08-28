import styled from 'styled-components';

export const DetailIssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  margin: 0 auto 32px;
`;

export const DetailMain = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
`;

export const DetailOption = styled.div``;

export const IssueDeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 18px 32px 0 auto;
`;
