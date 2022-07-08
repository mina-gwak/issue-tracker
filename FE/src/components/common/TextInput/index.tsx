import { useState } from 'react';

import * as S from '@components/common/TextInput/TextInput.style';
import {
  INPUT_SIZE,
  INPUT_STATUS,
  InputSizeValues,
  InputStatusValues,
} from '@components/common/TextInput/constants';

export interface TextInputPropsType {
  size: InputSizeValues;
  name: string;
  placeholder: string;
  disabled: boolean;
  status: InputStatusValues;
  message: string;
}

const TextInput = ({
  size = INPUT_SIZE.SMALL,
  name,
  placeholder,
  disabled,
  status = INPUT_STATUS.NORMAL,
  message,
}: TextInputPropsType) => {
  const [value, setValue] = useState('');
  const isValueExist = value.length > 0;

  return (
    <S.Wrapper status={status}>
      <S.InputBox size={size} isValueExist={isValueExist} disabled={disabled}>
        <S.TextInput
          id={name}
          name={name}
          disabled={disabled}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <S.Label htmlFor={name}>{placeholder}</S.Label>
      </S.InputBox>
      {message && <S.Message>{message}</S.Message>}
    </S.Wrapper>
  );
};

export default TextInput;
