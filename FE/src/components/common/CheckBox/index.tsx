import { useMemo } from 'react';

import * as S from '@components/common/CheckBox/CheckBox.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';

export interface CheckBoxPropsType {
  checkBoxId: string;
  isChecked: boolean;
  isAllChecked?: boolean;
  toggleIsChecked: () => void;
}

const CheckBox = ({ checkBoxId, isChecked, toggleIsChecked, isAllChecked = true }: CheckBoxPropsType) => {

  const checkBoxIcon = useMemo(() => {
    if (isChecked && isAllChecked) return ICON_NAME.CHECKBOX_ACTIVE;
    else if (isChecked && !isAllChecked) return ICON_NAME.CHECKBOX_DISABLED;
    else return ICON_NAME.CHECKBOX_INITIAL;
  }, [isChecked, isAllChecked]);

  return (
    <>
      <S.Label htmlFor={checkBoxId} onClick={toggleIsChecked}>
        <Icon iconName={checkBoxIcon} />
      </S.Label>
      <S.CheckBoxInput type='checkbox' id={checkBoxId} />
    </>
  )
}

export default CheckBox;
