import { useState } from 'react';

import { TextColorArrType } from '@type/label';

interface InputRadioPropsType {
  value: TextColorArrType;
  onChange: (color: string) => () => void;
}

const InputRadio = ({ value, onChange }: InputRadioPropsType) => {
  const [isCheckedRadioButton, setIsCheckedRadioButton] = useState<string>('#000');

  const handleOnChangeRadioButton = () => {
    onChange(value.colorCode);
    setIsCheckedRadioButton((prev) => (prev === '#000' ? '#fff' : '#000'));
  };
  return (
    <div>
      <input
        type='radio'
        id={value.id}
        value={value.colorCode}
        onChange={handleOnChangeRadioButton}
        checked={value.colorCode === isCheckedRadioButton}
      />
      <label htmlFor={value.id}>{value.title}</label>
    </div>
  );
};

export default InputRadio;
