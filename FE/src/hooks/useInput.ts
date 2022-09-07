import { useState, Dispatch, SetStateAction } from 'react';

export interface UseInputReturnType {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const useInput = (defaultInputValue: string = ''): UseInputReturnType => {
  const [value, setValue] = useState(defaultInputValue);

  return { value, setValue };
};

export default useInput;
