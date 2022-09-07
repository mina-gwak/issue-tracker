import { useEffect, useState } from 'react';

import * as S from '@components/LabelCreateEditForm/LabelCreateEditForm.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { TextColorArrType } from '@type/label';

interface InputRadioPropsType {
  value: TextColorArrType;
  selectedValue: string;
  onChange: (color: string) => void;
}

const InputRadio = ({ value, selectedValue, onChange }: InputRadioPropsType) => {
  const [active, setActive] = useState(value.colorCode === selectedValue);

  const checkBoxIcon = active
    ? ICON_NAME.CHECKBOX_CIRCLE_ACTIVE
    : ICON_NAME.CHECKBOX_CIRCLE_INITIAL;

  useEffect(() => {
    setActive(selectedValue === value.colorCode);
  }, [selectedValue]);

  return (
    <div>
      <S.RadioButton
        type='radio'
        id={value.id}
        value={value.colorCode}
        onChange={() => onChange(value.colorCode)}
        checked={value.colorCode === selectedValue}
      />
      <S.RadioLabel htmlFor={value.id}>
        <Icon iconName={checkBoxIcon} />
        {value.title}
      </S.RadioLabel>
    </div>
  );
};

export default InputRadio;
