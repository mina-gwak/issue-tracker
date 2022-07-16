import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import LabelCreateEdit from '@components/LabelCreateEditForm/LabelCreateEdit';
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
    <LabelEditFormWrapper title={title}>
      <Title>{title}</Title>
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
      <ButtonContainer>
        <Button size={BUTTON_SIZE.SMALL} outline={true} onClick={handelClickCancel}>
          <span> X 취소</span>
        </Button>
        <Button size={BUTTON_SIZE.SMALL} onClick={handleSubmitClick}>
          <span> ★ 편집</span>
        </Button>
      </ButtonContainer>
    </LabelEditFormWrapper>
  );
};

const LabelEditFormWrapper = styled.div<{ title: string }>`
  padding: 2rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey4};

  border-radius: ${({ title }) => (title === '새로운 레이블 추가' ? 16 : '')}px;
`;

const Title = styled.span`
  font-size: 2rem;
  margin-bottom: 3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

export default LabelCreateEditForm;
