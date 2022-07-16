import { useState } from 'react';

import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import LabelCreateEditForm from '@components/LabelCreateEditForm';
import LabelBadge from '@components/LabelTable/LabelBadge';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { labelTrigger } from '@store/label';
import { LabelTabType } from '@type/label';
import { deleteLabel } from '@utils/api/fetchLabel';

interface LabelItemType {
  key: number;
  data: LabelTabType;
}

const LabelItem = ({ data }: LabelItemType) => {
  const { id, name, description, colorCode, textColor } = data;

  const [isEditLabel, setIsEditLabel] = useState(false);
  const setLabelTrigger = useSetRecoilState(labelTrigger);

  const handleClickEdit = () => setIsEditLabel(true);
  const handelClickCancel = () => setIsEditLabel(false);

  const handleClickDelete = async () => {
    let isSuccessFetch = await deleteLabel(id);
    if (isSuccessFetch) {
      setLabelTrigger((prev) => prev + 1);
    }
  };

  return isEditLabel ? (
    <EditFormWrapper>
      <LabelCreateEditForm title='레이블 편집' data={data} handelClickCancel={handelClickCancel} />
    </EditFormWrapper>
  ) : (
    <Wrapper>
      <LabelBadge name={name} colorCode={colorCode} textColor={textColor} />
      <Description>{description}</Description>
      <IconContainer>
        <EditIcon onClick={handleClickEdit}>
          <Icon iconName={ICON_NAME.EDIT_ICON} />
          <span>편집</span>
        </EditIcon>
        <DeleteIcon onClick={handleClickDelete}>
          <Icon iconName={ICON_NAME.DELETE_ICON} />
          <span>삭제</span>
        </DeleteIcon>
      </IconContainer>
    </Wrapper>
  );
};

const EditFormWrapper = styled.div`
  border-radius: 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.grey4};
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 10% 60% 10%;
  align-items: center;
  gap: 110px;
  width: auto;
  min-width: 1200px;
  height: 90px;
  background: ${({ theme }) => theme.colors.white};
  padding: 16px 63px 16px 32px;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  }
`;

const Description = styled.div`
  display: flex;
  width: 730px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.grey2};
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
`;

const EditIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  cursor: pointer;
`;
const DeleteIcon = styled.div`
  color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
`;
export default LabelItem;
