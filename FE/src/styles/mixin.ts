import { css } from 'styled-components';

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const pageContentCenter = css`
  ${flexCenter};
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export interface StyledIconProps {
  isOpen: boolean;
}

export const iconStyle = css<StyledIconProps>`
  ${({ isOpen }) =>
    isOpen &&
    css`
      path {
        fill: ${({ theme }) => theme.colors.lightBlue};
        stroke: ${({ theme }) => theme.colors.blue};
      }
    `}

  ${({ isOpen }) =>
    !isOpen &&
    css`
      path {
        fill: ${({ theme }) => theme.colors.lightPurple};
        stroke: ${({ theme }) => theme.colors.purple};
      }
    `}
`;
