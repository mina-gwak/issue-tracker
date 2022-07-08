import styled, { css } from 'styled-components';

import { INPUT_SIZE, INPUT_STATUS } from '@components/common/TextInput/constants';
import { TextInputPropsType } from '@components/common/TextInput/index';

type InputBoxProps = Pick<TextInputPropsType, 'size' | 'isValueExist' | 'disabled'>;

type WrapperProps = Pick<TextInputPropsType, 'status'>;

const sizeStyles = css<InputBoxProps>`
  ${({ size }) =>
    size === INPUT_SIZE.SMALL &&
    css`
      ${TextInput} {
        width: fit-content;
        height: 40px;
        padding-left: 112px;
      }

      ${Label} {
        width: 80px;
      }
    `}

  ${({ size }) =>
    size === INPUT_SIZE.MEDIUM &&
    css`
      ${TextInput} {
        height: 56px;
      }
    `}

  ${({ size }) =>
    size === INPUT_SIZE.LARGE &&
    css`
      ${TextInput} {
        height: 64px;
      }
    `}
`;

const typingStyles = css<InputBoxProps>`
  ${({ isValueExist }) =>
    isValueExist &&
    css`
      ${Label} {
        color: ${({ theme }) => theme.colors.grey2};
        font-size: ${({ theme }) => theme.fontSizes.xSmall};
      }
    `}

  ${({ size, isValueExist }) =>
    size !== INPUT_SIZE.SMALL &&
    isValueExist &&
    css`
      ${TextInput} {
        padding-top: ${size === INPUT_SIZE.MEDIUM ? '15px' : '20px'};
      }

      ${Label} {
        top: ${size === INPUT_SIZE.MEDIUM ? '14px' : '19px'};
      }
    `}
`;

const statusStyles = css<WrapperProps>`
  ${({ status }) =>
    status === INPUT_STATUS.SUCCESS &&
    css`
      ${TextInput} {
        background-color: ${({ theme }) => theme.colors.lightGreen};
        border: 1px solid ${({ theme }) => theme.colors.green};
      }

      ${Label}, ${Message} {
        color: ${({ theme }) => theme.colors.green} !important;
      }
    `}

  ${({ status }) =>
    status === INPUT_STATUS.ERROR &&
    css`
      ${TextInput} {
        background-color: ${({ theme }) => theme.colors.lightRed};
        border: 1px solid ${({ theme }) => theme.colors.red};
      }

      ${Label}, ${Message} {
        color: ${({ theme }) => theme.colors.red} !important;
      }
    `}
`;

export const Wrapper = styled.div<WrapperProps>`
  ${statusStyles}
`;

export const InputBox = styled.div<InputBoxProps>`
  position: relative;
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.grey5};
  border-radius: 16px;

  ${({ disabled }) =>
    disabled &&
    css`
      &,
      * {
        opacity: 0.5;
      }
    `};

  /* 사이즈 */
  ${sizeStyles};

  /* 타이핑 여부 */
  ${typingStyles};
`;

export const TextInput = styled.input`
  min-width: 340px;
  height: 64px;
  background-color: inherit;
  border: none;
  border-radius: 16px;
  padding: 0 24px;
  transition: all 200ms;

  &:focus {
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.black};
    outline: none;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: 49%;
  left: 25px;
  color: ${({ theme }) => theme.colors.grey3};
  transform: translateY(-50%);
  transition: all 200ms;
`;

export const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-top: 8px;
`;
