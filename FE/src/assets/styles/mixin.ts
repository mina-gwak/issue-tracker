import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const pageContentCenter = css`
  ${flexCenter}
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
