import React, { useState } from 'react';

import styled from 'styled-components';

import { TextColorArrType } from '@type/label';

interface InputRadioPropsType {
  value: TextColorArrType;
  onChange: (color: string) => () => void;
  name: string;
}

const InputRadio = ({ value, onChange, name }: InputRadioPropsType) => {
  const [isCheckedRadioButton, setIsCheckedRadioButton] = useState<string>('#000');

  const handleOnChangeRadioButton = () => {
    onChange(value.colorCode);
    setIsCheckedRadioButton((prev) => (prev === '#000' ? '#fff' : '#000'));
  };
  return (
    <div>
      <RadioButton
        type='radio'
        id={value.id}
        value={value.colorCode}
        name={name}
        onChange={handleOnChangeRadioButton}
        checked={value.colorCode === isCheckedRadioButton}
      />
      <label htmlFor={value.id}>{value.title}</label>
    </div>
  );
};

const RadioButton = styled.input``;

export default InputRadio;
