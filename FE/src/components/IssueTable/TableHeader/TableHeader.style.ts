import styled from 'styled-components';

interface StyledTabProps {
  isActive?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  width: auto;
  min-width: 1200px;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.grey6};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 16px 16px 0 0;
  padding: 0 32px;
`;

export const IssueTabs = styled.ul`
  display: flex;
  gap: 24px;
`;

export const IssueTab = styled.button<StyledTabProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 26px;

  ${({ isActive, theme }) =>
    isActive &&
    `color: ${theme.colors.black};
     font-weight: ${theme.fontWeights.bold};
     
     svg path {
        stroke: ${theme.colors.black};
     }
    `}
`;

export const FilterList = styled.ul`
  display: flex;
  gap: 32px;
  margin-left: auto;
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FilterListItem = styled.li`
  position: relative;
`;
