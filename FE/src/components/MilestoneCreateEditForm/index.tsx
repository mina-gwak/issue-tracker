import { Dispatch, SetStateAction, useState } from 'react';

import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import InputForm from '@components/InputForm';
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
    <MilestoneEditBlock type={type}>
      <Title>{title}</Title>
      <MilestoneInputBlock>
        <div>
          <InputForm placeholder={name} {...titleInput} />
          <InputForm placeholder={dueDate} {...dateInput} />
        </div>

        {dateInputError && (
          <ErrorMessage>▮날짜 입력 양식이 잘못되었습니다 'YYYY - MM - DD' </ErrorMessage>
        )}
        <InputForm placeholder={description} {...descriptionInput} />
      </MilestoneInputBlock>
      <SubmitButton>
        {type === 'edit' && (
          <Button size={BUTTON_SIZE.SMALL} outline={true} onClick={handelClickCancel}>
            <span> ❌ 취소</span>
          </Button>
        )}
        <Button size={BUTTON_SIZE.SMALL} onClick={handleSubmitClick}>
          <span> ➕ 완료</span>
        </Button>
      </SubmitButton>
    </MilestoneEditBlock>
  );
};

const MilestoneEditBlock = styled.div<{ type: string }>`
  padding: 2rem;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.grey5};
  border-radius: 0px;
  ${({ type, theme }) =>
    type === 'create' &&
    `margin-bottom: 1.5rem; border-radius: 16px;
		border: 1px solid ${theme.colors.grey5};`};
`;

const Title = styled.div`
  font-size: 2rem;
  margin-bottom: 3rem;
`;

const MilestoneInputBlock = styled.div`
  position: relative;
  & > div {
    margin-bottom: 1rem;
    align-items: center;
  }
  & > div:first-child {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fontSizes.xSmall}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  left: 55%;
  top: 0;
`;

const SubmitButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

export default MilestoneCreateEditForm;
