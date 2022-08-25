import styled, { css } from 'styled-components';

const typingStyles = css<{ isValueExist: boolean }>`
  ${({ isValueExist }) =>
    isValueExist &&
    css`
      ${Textarea} {
        padding-top: 44px;
      }

      ${TextareaLabel} {
        color: ${({ theme }) => theme.colors.grey2};
        font-size: ${({ theme }) => theme.fontSizes.xSmall};
      }
    `}
`;

export const Wrapper = styled.div`
  position: relative;
  width: 840px;
  height: 343px;
`;

export const TextareaBox = styled.div<{ isValueExist: boolean }>`
  position: relative;
  width: fit-content;
  height: 343px;
  background-color: ${({ theme }) => theme.colors.grey5};
  border-radius: 16px;

  /* 타이핑 여부 */
  ${typingStyles}
`;

export const Textarea = styled.textarea`
  width: 840px;
  height: 343px;
  background-color: inherit;
  border: none;
  border-radius: 16px;
  padding: 18px 24px;
  word-break: break-all;
  white-space: pre-wrap;
  transition: all 200ms;

  &:focus {
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.black};
    outline: none;
  }
`;

export const TextareaLabel = styled.label`
  position: absolute;
  top: 16px;
  left: 24px;
  color: ${({ theme }) => theme.colors.grey3};
  transition: all 200ms;
`;

export const LetterCount = styled.p`
  position: absolute;
  right: 30px;
  bottom: 72px;
  color: ${({ theme }) => theme.colors.grey2};
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
`;

export const FileBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: inherit;
  height: 52px;
  border-top: 2px dashed ${({ theme }) => theme.colors.grey4};
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.grey2};
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: 18px 24px;
  cursor: pointer;
`;
