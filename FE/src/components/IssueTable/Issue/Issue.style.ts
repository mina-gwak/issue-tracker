import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  width: 1280px;
  height: 90px;
  background: ${({ theme }) => theme.colors.white};
  padding: 16px 63px 16px 32px;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  }
  
  label {
    position: relative;
    top: -15px;
  }
`;

export const Container = styled.div`
  margin-right: auto;
`;

export const IssueBox = styled.div`
  display: flex;
  width: 100%;
`;

// -----------------------------------

export const IssueTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  svg {
    path {
      fill: #C7EBFF;
      stroke: #007AFF;
    }
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black};
  margin: 0 16px 0 8px;
`;

// -----------------------------------

export const Description = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Text = styled.span`
  color: ${({ theme }) => theme.colors.grey2};
`;

export const Milestone = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  path {
    fill: ${({ theme }) => theme.colors.grey2};
  }
`;
