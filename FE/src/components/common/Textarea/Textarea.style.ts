import styled, { css } from 'styled-components';

interface StyledTextareaProps {
  isValueExist: boolean;
  isFocused: boolean;
}

const typingStyles = css<Pick<StyledTextareaProps, 'isValueExist'>>`
  ${({ isValueExist }) =>
    isValueExist &&
    css`
      ${Textarea} {
        padding-top: 0;
        margin-top: 44px;
      }

      ${TextareaLabel} {
        color: ${({ theme }) => theme.colors.grey2};
        font-size: ${({ theme }) => theme.fontSizes.xSmall};
      }
    `}
`;

const focusStyles = css<Pick<StyledTextareaProps, 'isFocused'>>`
  ${({ isFocused }) =>
    isFocused &&
    css`
      background-color: ${({ theme }) => theme.colors.white};
      border: 1px solid ${({ theme }) => theme.colors.black};
      outline: none;

      ${TextareaBox} {
        background-color: ${({ theme }) => theme.colors.white};
      }

      ${Textarea} {
        background-color: ${({ theme }) => theme.colors.white};
      }
    `}
`;

export const Wrapper = styled.div<StyledTextareaProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 880px;
  height: 343px;
  border-radius: 16px;

  /* 타이핑 여부 */
  ${typingStyles}
    
  /* 포커스 여부 */
  ${focusStyles}
`;

export const TextareaBox = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.grey5};
  border-radius: 16px;
`;

export const Textarea = styled.textarea`
  flex-grow: 1;
  width: 100%;
  background-color: inherit;
  border: none;
  border-radius: 16px 16px 0 0;
  padding: 18px 24px;
  word-break: break-all;
  white-space: pre-wrap;
  transition: all 200ms;
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
  bottom: 20px;
  color: ${({ theme }) => theme.colors.grey2};
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
`;

export const FileBox = styled.div`
  width: 100%;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.grey5};
  border-radius: 0 0 16px 16px;
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
