import { Dispatch, SetStateAction, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import InputForm from '@components/InputForm';
import * as S from '@components/MilestoneCreateEditForm/MilestoneCreateEditForm.style';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import { defaultMilestoneData } from '@data/milestoneData';
import useInput from '@hooks/useInput';
import { milestoneTrigger } from '@store/milestone';
import { MilestoneTabType } from '@type/milestone';
import { fetchCreateMilestone, fetchEditMilestone } from '@utils/api/fetchMilestone';
interface MilestoneCreateEditFormPropsType {
  title: string;
  type: string;
  data?: MilestoneTabType;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const MilestoneCreateEditForm = ({
  title,
  type,
  data = defaultMilestoneData,
  setEditMode,
}: MilestoneCreateEditFormPropsType) => {
  const { id, name, description, dueDate } = data;
  const setMilestoneTrigger = useSetRecoilState(milestoneTrigger);
  const [dateInputError, setDateError] = useState(false);

  const titleInput = useInput('');
  const dateInput = useInput('');
  const descriptionInput = useInput('');

  const alertDateTypeError = () => setDateError(true);

  const handleSubmitClick = async () => {
    const timeChecking = (date: string) => {
      const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
      return regex.test(date);
    };

    if (!timeChecking(dateInput.inputValue)) {
      alertDateTypeError();
      return;
    }

    const newMilestoneData = {
      title: titleInput.inputValue,
      dueDate: dateInput.inputValue,
      description: descriptionInput.inputValue,
    };

    let isSuccessFetch;
    if (type === 'create') isSuccessFetch = await fetchCreateMilestone(newMilestoneData);
    else isSuccessFetch = await fetchEditMilestone(id, newMilestoneData);

    if (isSuccessFetch) {
      if (setEditMode) setEditMode(false);
      setMilestoneTrigger((prev) => prev + 1);
    }
  };

  const handelClickCancel = () => setEditMode && setEditMode(false);

  return (
    <S.MilestoneEditWrapper type={type}>
      <S.Title>{title}</S.Title>
      <S.MilestoneInputContainer>
        <div>
          <InputForm placeholder={name} {...titleInput} />
          <InputForm placeholder={dueDate} {...dateInput} />
        </div>

        {dateInputError && (
          <S.ErrorMessage>▮날짜 입력 양식이 잘못되었습니다 'YYYY - MM - DD' </S.ErrorMessage>
        )}
        <InputForm placeholder={description} {...descriptionInput} />
      </S.MilestoneInputContainer>
      <S.SubmitButton>
        {type === 'edit' && (
          <Button size={BUTTON_SIZE.SMALL} outline={true} onClick={handelClickCancel}>
            <span> ❌ 취소</span>
          </Button>
        )}
        <Button size={BUTTON_SIZE.SMALL} onClick={handleSubmitClick}>
          <span> ➕ 완료</span>
        </Button>
      </S.SubmitButton>
    </S.MilestoneEditWrapper>
  );
};

export default MilestoneCreateEditForm;
