import { ReactNode, useState } from 'react';

import styled from 'styled-components';

interface InputFormType {
  placeholder?: string;
  inputValue: string;
  onChange?: ({ target }: { target: HTMLInputElement }) => void;
  children?: ReactNode;
}

const InputForm = ({ placeholder, inputValue, onChange, children }: InputFormType) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleOnFocus = () => setIsFocus(true);
  const handleOnBlur = () => setIsFocus(false);
  return (
    <InputFieldBlock isFocus={isFocus}>
      <input
        type='text'
        value={inputValue}
        onChange={onChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        placeholder={placeholder}
      />
      {children}
    </InputFieldBlock>
  );
};

const InputFieldBlock = styled.div<{ isFocus: boolean }>`
  display: flex;
  align-items: center;

  background-color: ${({ isFocus, theme }) => (isFocus ? theme.colors.white : theme.colors.grey5)};
  border: 1px solid ${({ isFocus, theme }) => (isFocus ? theme.colors.grey4 : theme.colors.grey6)};
  border-radius: 11px;
  margin: 20px 0 20px 50px;
  padding: 10px;

  & > input {
    width: 100%;
    height: 40px;
    padding: 14px;
    background-color: ${({ isFocus, theme }) =>
      isFocus ? theme.colors.white : theme.colors.grey5};
    border: 1px solid ${({ isFocus, theme }) => (isFocus ? theme.colors.white : theme.colors.grey6)};
    border-radius: 11px;
    color: ${({ theme }) => theme.colors.grey2};

    &:focus {
      outline: none;
    }
  }
`;

export default InputForm;
