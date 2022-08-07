import { ReactNode, useState } from 'react';

import * as S from '@components/InputForm/InputForm.style';
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
    <S.InputFieldWrapper isFocus={isFocus}>
      <input
        type='text'
        value={inputValue}
        onChange={onChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        placeholder={placeholder}
      />
      {children}
    </S.InputFieldWrapper>
  );
};

export default InputForm;
