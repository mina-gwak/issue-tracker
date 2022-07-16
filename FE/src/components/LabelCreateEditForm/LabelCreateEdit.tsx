import { useState } from 'react';

import styled from 'styled-components';

import InputForm from '@components/InputForm';
import InputRadio from '@components/InputRadio';
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
    <LabelEditBlock>
      <LabelBadge colorCode={labelBadgeColorCode} textColor={labelBadgeTextColor} name={name} />
      <LabelEdit>
        <InputForm placeholder={name} {...titleInput} />
        <InputForm placeholder={description} {...descriptionInput} />
        <LabelEditColor>
          <InputForm placeholder={colorCode} {...colorInput}>
            <button onClick={handleClickRefreshColor}>
              <Icon iconName={ICON_NAME.REFRESH_ICON} />
            </button>
          </InputForm>
          <RadioButtonContainer>
            <span>텍스트 색상</span>
            {textColorArr.map((item) => (
              <InputRadio
                key={item.id}
                value={item}
                name={name}
                onChange={handleChangeRadioButton}
              />
            ))}
          </RadioButtonContainer>
        </LabelEditColor>
      </LabelEdit>
    </LabelEditBlock>
  );
};

const RadioButton = styled.input``;

const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;

  width: 30%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.grey5};
  border: 1px solid ${({ theme }) => theme.colors.grey6};
  border-radius: 11px;
  margin: 20px 40px;
  padding: 30px 24px;
`;

const LabelEditBlock = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  margin-bottom: 1rem;
`;

const LabelEdit = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    margin-bottom: 1rem;
  }
`;

const LabelEditColor = styled.div`
  display: flex;
  align-items: center;
`;

export default LabelCreateEdit;
