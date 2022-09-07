import { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import LabelCreateEdit from '@components/LabelCreateEditForm/LabelCreateEdit';
import * as S from '@components/LabelCreateEditForm/LabelCreateEditForm.style';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import useInput from '@hooks/useInput';
import { labelTrigger } from '@store/label';
import { LabelTabType } from '@type/label';
import { createLabel, editLabel } from '@utils/api/fetchLabel';

interface LabelCreateEditFormType {
  title: string;
  data?: LabelTabType;
  handelClickCancel: () => void;
}

const LabelCreateEditForm = ({ title, data, handelClickCancel }: LabelCreateEditFormType) => {
  const [labelTextColor, setLabelTextColor] = useState(data?.textColor || '');
  const setLabelTrigger = useSetRecoilState(labelTrigger);

  const labelId = data?.id || 0;
  const titleInput = useInput(data?.name || '');
  const descriptionInput = useInput(data?.description || '');
  const colorInput = useInput(data?.colorCode || '');

  const handleSubmitClick = async () => {
    if (!titleInput.value || !colorInput.value) return false;

    const newLabelData = {
      name: titleInput.value,
      description: descriptionInput.value,
      colorCode: colorInput.value,
      textColor: labelTextColor,
    };

    let isSuccessFetch = false;
    if (labelId === 0) isSuccessFetch = await createLabel(newLabelData);
    else isSuccessFetch = await editLabel(labelId, newLabelData);

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
            labelTextColor,
            setLabelTextColor,
          }}
        />
      </div>
      <S.ButtonContainer>
        <Button size={BUTTON_SIZE.SMALL} outline={true} onClick={handelClickCancel}>
          <span>취소</span>
        </Button>
        <Button size={BUTTON_SIZE.SMALL} onClick={handleSubmitClick}>
          <span>완료</span>
        </Button>
      </S.ButtonContainer>
    </S.LabelEditFormWrapper>
  );
};

export default LabelCreateEditForm;
