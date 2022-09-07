import { Dispatch, SetStateAction } from 'react';

import * as S from '@components/common/TextInput/TextInput.style';
import {
  INPUT_SIZE,
  INPUT_STATUS,
  InputSizeValues,
  InputStatusValues,
} from '@components/common/TextInput/constants';

export interface TextInputPropsType {
  size?: InputSizeValues;
  name: string;
  placeholder: string;
  disabled?: boolean;
  status?: InputStatusValues;
  message?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const TextInput = ({
  size = INPUT_SIZE.SMALL,
  name,
  placeholder,
  disabled = false,
  status = INPUT_STATUS.NORMAL,
  message,
  value,
  setValue,
}: TextInputPropsType) => {
  const isValueExist = value.length > 0;

  return (
    <S.Wrapper status={status}>
      <S.InputBox size={size} isValueExist={isValueExist} disabled={disabled}>
        <S.TextInput
          type='text'
          id={name}
          name={name}
          disabled={disabled}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <S.Label htmlFor={name}>{placeholder}</S.Label>
      </S.InputBox>
      {status === INPUT_STATUS.ERROR && message && <S.Message>{message}</S.Message>}
    </S.Wrapper>
  );
};

export default TextInput;
