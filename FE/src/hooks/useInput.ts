import { useState } from 'react';

export interface UseInputReturnType {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: ({ target }: { target: HTMLInputElement }) => void;
}

const useInput = (defaultInputValue: string = ''): UseInputReturnType => {
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const onChange = ({ target }: { target: HTMLInputElement }) => setInputValue(target.value);

  return { inputValue, setInputValue, onChange };
};

export default useInput;
