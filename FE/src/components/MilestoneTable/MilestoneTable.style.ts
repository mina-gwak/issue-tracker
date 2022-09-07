import styled, { css } from 'styled-components';

//index.ts

interface StyledTabProps {
  isActive: boolean;
}

interface StyledIconProps {
  isOpened?: boolean;
}

const activeStyles = css<StyledTabProps>`
  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.colors.black};
      font-weight: ${({ theme }) => theme.fontWeights.bold};

      svg path {
        stroke: ${({ theme }) => theme.colors.black};
      }
    `}
`;

const openStyles = css<StyledIconProps>`
  ${({ isOpened, theme }) => isOpened && css`
    svg path {
      stroke: ${theme.colors.blue};
      fill: ${theme.colors.lightBlue};
    }
  `}

  ${({ isOpened, theme }) => !isOpened && css`
    svg path {
      stroke: ${theme.colors.purple};
      fill: ${theme.colors.lightPurple};
    }
  `}
`;

export const Wrapper = styled.div`
  width: 1280px;
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 11px;
  overflow: hidden;

  & > *:last-child {
    border-radius: 0 0 11px 11px;
  }
  
  & > *:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  }
`;

// MilestoneTableHeader

export const MilestoneTableHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.grey6};
  border-radius: 16px 16px 0 0;
  padding: 0 32px;
`;

export const MilestoneTab = styled.div<StyledTabProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  /* 활성화 여부 */
  ${activeStyles};
`;

// MilestoneInfo

export const MilestoneItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 16px 32px;
`;

export const LeftContainer = styled.div``;

export const MilestoneInfoTitle = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

export const NameDateContainer = styled.div<StyledIconProps>`
  display: flex;
  align-items: center;
  gap: 8px;

  &:first-of-type {
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    
    /* 마일스톤 열림 여부 */
    ${openStyles};
  }
  
  svg {
    position: relative;
    top: 1px;
  }
`;

export const IconText = styled.span`
`;

export const Description = styled.div`
  display: flex;
`;

export const RightContainer = styled.div`
  width: 245px;
`;

export const EditIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DeleteIcon = styled.div`
  color: ${({ theme }) => theme.colors.red};
`;

export const StateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
`;

export const IssueCounts = styled.div`
  display: flex;
  gap: 8px;
`;
