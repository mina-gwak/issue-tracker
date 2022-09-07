import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import * as S from '@components/MilestoneCreateEditForm/MilestoneCreateEditForm.style';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import TextInput from '@components/common/TextInput';
import { INPUT_STATUS } from '@components/common/TextInput/constants';
import useInput from '@hooks/useInput';
import { milestoneTrigger } from '@store/milestone';
import { MilestoneTabType } from '@type/milestone';
import { fetchCreateMilestone, fetchEditMilestone } from '@utils/api/fetchMilestone';
import { getLocalDate, isCorrectDate } from '@utils/date';

interface MilestoneCreateEditFormPropsType {
  title: string;
  type: string;
  data?: MilestoneTabType;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const MilestoneCreateEditForm = ({
  title,
  type,
  data,
  setEditMode,
}: MilestoneCreateEditFormPropsType) => {
  const setMilestoneTrigger = useSetRecoilState(milestoneTrigger);
  const [dateInputError, setDateError] = useState(false);

  const milestoneId = data?.id || 0;
  const titleInput = useInput(data?.name || '');
  const dateInput = useInput(getLocalDate(data?.dueDate));
  const descriptionInput = useInput(data?.description || '');

  const alertDateTypeError = () => setDateError(true);

  const handleSubmitClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!isCorrectDate(dateInput.value)) {
      alertDateTypeError();
      return;
    }

    const newMilestoneData = {
      name: titleInput.value,
      dueDate: new Date(dateInput.value).toISOString(),
      description: descriptionInput.value,
    };

    let isSuccessFetch;
    if (type === 'create') isSuccessFetch = await fetchCreateMilestone(newMilestoneData);
    if (type === 'edit') isSuccessFetch = await fetchEditMilestone(milestoneId, newMilestoneData);

    if (isSuccessFetch) {
      if (setEditMode) setEditMode(false);
      setMilestoneTrigger((prev) => prev + 1);
    }
  };

  const handelClickCancel = () => setEditMode && setEditMode(false);

  return (
    <S.MilestoneEditWrapper type={type}>
      <S.Title>{title}</S.Title>
      <S.InputContainer>
        <TextInput name='milestoneName' placeholder='마일스톤 이름' {...titleInput} />
        <TextInput
          name='milestoneDate'
          placeholder='완료일(선택)'
          message='날짜 입력 양식이 잘못되었습니다 "YYYY-MM-DD"'
          status={dateInputError ? INPUT_STATUS.ERROR : INPUT_STATUS.NORMAL}
          {...dateInput}
        />
      </S.InputContainer>
      <TextInput name='description' placeholder='설명(선택)' {...descriptionInput} />

      <S.SubmitButton>
        {type === 'edit' && (
          <Button size={BUTTON_SIZE.SMALL} outline={true} onClick={handelClickCancel}>
            <span>취소</span>
          </Button>
        )}
        <Button size={BUTTON_SIZE.SMALL} onClick={handleSubmitClick}>
          <span>완료</span>
        </Button>
      </S.SubmitButton>
    </S.MilestoneEditWrapper>
  );
};

export default MilestoneCreateEditForm;
