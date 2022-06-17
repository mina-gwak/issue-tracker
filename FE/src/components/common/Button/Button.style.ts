import styled, { css } from 'styled-components';

import { BUTTON_SIZE } from '@components/common/Button/constants';

interface OutlineStylesType {
  outline: boolean;
}

interface SizeStylesType {
  size: string;
}

const outlineStyles = css<OutlineStylesType>`
  ${({ outline }) =>
    outline &&
    css`
      background-color: ${({ theme }) => theme.colors.blue};

      &:hover {
        background-color: ${({ theme }) => theme.colors.darkBlue};
      }
    
      &:focus {
        border: 4px solid ${({ theme }) => theme.colors.lightBlue};
      }
    `}

  ${({ outline }) =>
    !outline &&
    css`
      color: ${({ theme }) => theme.colors.blue};
      background-color: ${({ theme }) => theme.colors.white};
      border: 2px solid ${({ theme }) => theme.colors.blue};

      &:hover {
        color: ${({ theme }) => theme.colors.darkBlue};
        background-color: ${({ theme }) => theme.colors.darkBlue};
      }
    
      &:focus {
        border: 4px solid ${({ theme }) => theme.colors.lightBlue};
      }
    `}
`;

const sizeStyles = css<SizeStylesType>`
  ${({ size }) =>
    size === BUTTON_SIZE.SMALL &&
    css`
      width: 80px;
      height: 40px;
      font-size: ${({ theme }) => theme.fontSizes.xSmall};
    `}

  ${({ size }) =>
    size === BUTTON_SIZE.MEDIUM &&
    css`
      width: 100px;
      height: 35px;
      font-size: ${({ theme }) => theme.fontSizes.medium};
    `}

  ${({ size }) =>
    size === BUTTON_SIZE.LARGE &&
    css`
      width: 150px;
      height: 80px;
      font-size: ${({ theme }) => theme.fontSizes.medium};
    `}
`;

export const Button = styled.button<OutlineStylesType & SizeStylesType>`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  transition: all 200ms;

  &:disabled {
    opacity: 0.5;
  }

  /* 아웃라인 */
  ${outlineStyles}

  /* 크기 */
  ${sizeStyles}
`;

