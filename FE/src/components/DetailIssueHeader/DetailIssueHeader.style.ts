import styled from 'styled-components';

//index.tsx
export const DetailIssueHeaderWrapper = styled.div`
  width: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.grey5}`};
  padding-bottom: 32px;
  margin-bottom: 32px;
`;

export const HeaderDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IssueInfo = styled.span`
  color: ${({ theme }) => theme.colors.grey1};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

//HeaderEditMode.tsx
export const HeaderEditWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TitleInput = styled.input`
  min-width: 700px;
  font-size: ${({ theme }) => theme.fontSizes.display};
  height: 46px;
  border: none;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.colors.grey5};
  margin-bottom: 1rem;
  &:focus {
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const EditButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

//HeaderViewMode.tsx
export const HeaderViewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const HeaderTitleContainer = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.display};
  display: flex;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const IssueNumber = styled.span`
  color: ${({ theme }) => theme.colors.grey2};
  margin-left: 1rem;
`;

export const ViewButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

//DetailIssueStatus.tsx
export const IconContainer = styled.div<{ isOpen: boolean }>`
  border: 1px solid ${({ isOpen, theme }) => isOpen ? theme.colors.blue : theme.colors.purple};
  border-radius: 30px;
  
  svg {
    width: 100px;
    height: 40px;
  }
`;
