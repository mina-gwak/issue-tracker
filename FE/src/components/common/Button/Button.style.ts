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
      color: ${({ theme }) => theme.colors.blue};
      background-color: ${({ theme }) => theme.colors.white};
      border: 2px solid ${({ theme }) => theme.colors.blue};
      
      svg * {
        stroke: ${({ theme }) => theme.colors.blue};
      }

      &:hover {
        color: ${({ theme }) => theme.colors.darkBlue};
        border: 2px solid ${({ theme }) => theme.colors.darkBlue};
        
        svg * {
          stroke: ${({ theme }) => theme.colors.darkBlue};
        }
      }

      &:focus {
        border: 4px solid ${({ theme }) => theme.colors.lightBlue};
      }
    `}

  ${({ outline }) =>
    !outline &&
    css`
      background-color: ${({ theme }) => theme.colors.blue};
      
      svg * {
        stroke: ${({ theme }) => theme.colors.white}
      }

      &:hover:not([disabled]) {
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
      width: 120px;
      height: 40px;
      font-size: ${({ theme }) => theme.fontSizes.xSmall};
      border-radius: 11px;
    `}

  ${({ size }) =>
    size === BUTTON_SIZE.MEDIUM &&
    css`
      width: 240px;
      height: 56px;
      font-size: ${({ theme }) => theme.fontSizes.medium};
      border-radius: 20px;
    `}

  ${({ size }) =>
    size === BUTTON_SIZE.LARGE &&
    css`
      width: 340px;
      height: 64px;
      font-size: ${({ theme }) => theme.fontSizes.medium};
      border-radius: 20px;
    `}
`;

export const Button = styled.button<OutlineStylesType & SizeStylesType>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  transition: all 200ms;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  ${outlineStyles}

  ${sizeStyles}
`;
