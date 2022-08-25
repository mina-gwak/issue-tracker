import styled from 'styled-components';

//index.tsx
export const DetailIssueHeaderWrapper = styled.div`
  width: 100%;
  padding-bottom: 3rem;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.grey5}`};
`;

export const HeaderDescription = styled.div`
  display: flex;
  align-items: center;
`;

export const IssueInfo = styled.span`
  font-size: 1.2rem;
  margin-left: 8px;
`;

//HeaderEditMode.tsx
export const HeaderEditWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TitleInput = styled.input`
  min-width: 700px;
  font-size: ${({ theme }) => theme.fontSizes.display}px;
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
`;

export const HeaderTitleContainer = styled.div`
  font-size: 2rem;
  display: flex;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.display}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const IssueNumber = styled.span`
  color: ${({ theme }) => theme.colors.grey2};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-left: 1rem;
`;

export const ViewButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

//DetailIssueStatus.tsx
export const IconContainer = styled.div`
  svg {
    width: 100px;
    height: 40px;
  }
`;
