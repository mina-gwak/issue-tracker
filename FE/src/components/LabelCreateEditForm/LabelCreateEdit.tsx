import { useState } from 'react';

import InputForm from '@components/InputForm';
import InputRadio from '@components/InputRadio';
import * as S from '@components/LabelCreateEditForm/LabelCreateEditForm.style';
import LabelBadge from '@components/LabelTable/LabelBadge';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { textColorArr } from '@data/labelData';
import { UseInputReturnType } from '@hooks/useInput';
import { getRandomLabelColor } from '@utils/randomColor';

interface LabelCreateEditPropsType {
  titleInput: UseInputReturnType;
  descriptionInput: UseInputReturnType;
  colorInput: UseInputReturnType;
  name: string;
  description: string;
  colorCode: string;
  textColor: string;
  setLabelTextColor: React.Dispatch<React.SetStateAction<string>>;
}

const LabelCreateEdit = ({
  titleInput,
  descriptionInput,
  colorInput,
  name,
  description,
  colorCode,
  textColor,
  setLabelTextColor,
}: LabelCreateEditPropsType) => {
  const [labelBadgeColorCode, setLabelBadgeColorCode] = useState<string>(colorCode);
  const [labelBadgeTextColor, setLabelBadgeTextColor] = useState<string>(textColor);

  const handleChangeRadioButton = (color: string) => () => {
    setLabelTextColor(color);
    setLabelBadgeTextColor(color);
  };

  const handleClickRefreshColor = () => {
    const randomLabelBackgroundColor = getRandomLabelColor();
    setLabelBadgeColorCode(randomLabelBackgroundColor);
    colorInput.setInputValue(randomLabelBackgroundColor);
  };

  return (
    <S.LabelEditWrapper>
      <LabelBadge colorCode={labelBadgeColorCode} textColor={labelBadgeTextColor} name={name} />
      <S.LabelEdit>
        <InputForm placeholder={name} {...titleInput} />
        <InputForm placeholder={description} {...descriptionInput} />
        <S.LabelEditColor>
          <InputForm placeholder={colorCode} {...colorInput}>
            <button onClick={handleClickRefreshColor}>
              <Icon iconName={ICON_NAME.REFRESH_ICON} />
            </button>
          </InputForm>
          <S.RadioButtonContainer>
            <span>텍스트 색상</span>
            {textColorArr.map((item) => (
              <InputRadio
                key={item.id}
                value={item}
                name={name}
                onChange={handleChangeRadioButton}
              />
            ))}
          </S.RadioButtonContainer>
        </S.LabelEditColor>
      </S.LabelEdit>
    </S.LabelEditWrapper>
  );
};

export default LabelCreateEdit;
