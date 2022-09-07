import { useState, Dispatch, SetStateAction } from 'react';

import InputRadio from '@components/InputRadio';
import * as S from '@components/LabelCreateEditForm/LabelCreateEditForm.style';
import LabelBadge from '@components/LabelTable/LabelBadge';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import TextInput from '@components/common/TextInput';
import { textColorArr } from '@data/labelData';
import { UseInputReturnType } from '@hooks/useInput';
import { getRandomLabelColor } from '@utils/randomColor';

interface LabelCreateEditPropsType {
  titleInput: UseInputReturnType;
  descriptionInput: UseInputReturnType;
  colorInput: UseInputReturnType;
  labelTextColor: string;
  setLabelTextColor: Dispatch<SetStateAction<string>>;
}

const LabelCreateEdit = ({
  titleInput,
  descriptionInput,
  colorInput,
  labelTextColor,
  setLabelTextColor,
}: LabelCreateEditPropsType) => {
  const [labelBadgeColorCode, setLabelBadgeColorCode] = useState<string>(colorInput.value || '#EFF0F6');
  const [labelBadgeTextColor, setLabelBadgeTextColor] = useState<string>(labelTextColor || '#000');

  const handleChangeRadioButton = (color: string) => {
    setLabelTextColor(color);
    setLabelBadgeTextColor(color);
  };

  const handleClickRefreshColor = () => {
    const randomLabelBackgroundColor = getRandomLabelColor();
    setLabelBadgeColorCode(randomLabelBackgroundColor);
    colorInput.setValue(randomLabelBackgroundColor);
  };

  return (
    <S.LabelEditWrapper>
      <LabelBadge
        colorCode={labelBadgeColorCode}
        textColor={labelBadgeTextColor}
        name={titleInput.value || '레이블 이름'}
      />
      <S.LabelEdit>
        <TextInput name='labelName' placeholder='레이블 이름' {...titleInput} />
        <TextInput name='description' placeholder='설명(선택)' {...descriptionInput} />
        <S.LabelEditColor>
          <S.BackgroundColorInputContainer>
            <TextInput name='backgroundColor' placeholder='배경 색상' value={colorInput.value || labelBadgeColorCode} setValue={colorInput.setValue} />
            <S.ChangeColorButton type='button' onClick={handleClickRefreshColor}>
              <Icon iconName={ICON_NAME.REFRESH_ICON} />
            </S.ChangeColorButton>
          </S.BackgroundColorInputContainer>
          <S.RadioButtonContainer>
            <S.RadioTitle>텍스트 색상</S.RadioTitle>
            {textColorArr.map((item) => (
              <InputRadio
                key={item.id}
                value={item}
                selectedValue={labelBadgeTextColor}
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
