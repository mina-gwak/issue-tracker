import { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import LabelCreateEdit from '@components/LabelCreateEditForm/LabelCreateEdit';
import * as S from '@components/LabelCreateEditForm/LabelCreateEditForm.style';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import { defaultLabelData } from '@data/labelData';
import useInput from '@hooks/useInput';
import { labelTrigger } from '@store/label';
import { LabelTabType } from '@type/label';
import { createLabel, editLabel } from '@utils/api/fetchLabel';
interface LabelCreateEditFormType {
  title: string;
  data?: LabelTabType;
  handelClickCancel: () => void;
}

const LabelCreateEditForm = ({
  title,
  data = defaultLabelData,
  handelClickCancel,
}: LabelCreateEditFormType) => {
  const { id, name, description, colorCode, textColor } = data;

  const [labelTextColor, setLabelTextColor] = useState(textColor);
  const setLabelTrigger = useSetRecoilState(labelTrigger);

  const titleInput = useInput('');
  const descriptionInput = useInput('');
  const colorInput = useInput('');

  const handleSubmitClick = async () => {
    const newLabelData = {
      name: titleInput.inputValue,
      description: descriptionInput.inputValue,
      colorCode: colorInput.inputValue,
      textColor: labelTextColor,
    };

    let isSuccessFetch = false;
    if (id === 0) isSuccessFetch = await createLabel(newLabelData);
    else isSuccessFetch = await editLabel(id, newLabelData);

    if (isSuccessFetch) {
      setLabelTrigger((prev) => prev + 1);
      handelClickCancel();
    }
  };

  return (
    <S.LabelEditFormWrapper title={title}>
      <S.Title>{title}</S.Title>
      <div>
        <LabelCreateEdit
          {...{
            titleInput,
            descriptionInput,
            colorInput,
            name,
            description,
            colorCode,
            textColor,
            setLabelTextColor,
          }}
        />
      </div>
      <S.ButtonContainer>
        <Button size={BUTTON_SIZE.SMALL} outline={true} onClick={handelClickCancel}>
          <span> ❌ 취소</span>
        </Button>
        <Button size={BUTTON_SIZE.SMALL} onClick={handleSubmitClick}>
          <span> ➕ 완료</span>
        </Button>
      </S.ButtonContainer>
    </S.LabelEditFormWrapper>
  );
};

export default LabelCreateEditForm;
