import styled, { css } from 'styled-components';

interface StyledPageButtonProps {
  isActive: boolean;
}

const paginationButtonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  
  &:disabled {
    cursor: initial;
  }

  &:hover:not([disabled]) {
    border: 2px solid ${({ theme }) => theme.colors.grey4};
    background-color: ${({ theme }) => theme.colors.grey5};
  }

  svg path {
    stroke: ${({ theme }) => theme.colors.grey1};
  }
`;

const activeStyles = css<StyledPageButtonProps>`
  ${({ isActive }) =>
  isActive &&
  css`
      color: ${({ theme }) => theme.colors.blue};
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      background-color: ${({ theme }) => theme.colors.lightBlue} !important;
      border: none !important;
    `}
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`;

export const PageChangeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.grey6};
  border: 2px solid ${({ theme }) => theme.colors.grey6};
  transition: 200ms all;

  &:active {
    svg path {
      stroke-width: 3px;
    }
  }

  /* 페이지네이션 버튼 기본 스타일 */
  ${paginationButtonStyles};
`;

export const PageButton = styled.button<StyledPageButtonProps>`
  &:active {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  /* 페이지네이션 버튼 기본 스타일 */
  ${paginationButtonStyles};

  /* 버튼 활성화 여부 */
  ${activeStyles};
`;
