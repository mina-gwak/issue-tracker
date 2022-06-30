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
  height: 100vh;
`;

export interface StyledIconProps {
  isOpened: boolean;
}

export const iconStyle = css<StyledIconProps>`
  ${({ isOpened }) =>
    isOpened &&
    css`
      path {
        fill: ${({ theme }) => theme.colors.lightBlue};
        stroke: ${({ theme }) => theme.colors.blue};
      }
    `}

  ${({ isOpened }) =>
    !isOpened &&
    css`
      path {
        fill: ${({ theme }) => theme.colors.lightPurple};
        stroke: ${({ theme }) => theme.colors.purple};
      }
    `}
`;
