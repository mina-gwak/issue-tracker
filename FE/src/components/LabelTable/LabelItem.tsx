import { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import LabelCreateEditForm from '@components/LabelCreateEditForm';
import LabelBadge from '@components/LabelTable/LabelBadge';
import * as S from '@components/LabelTable/LabelTable.style';
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
    <S.EditFormWrapper>
      <LabelCreateEditForm title='레이블 편집' data={data} handelClickCancel={handelClickCancel} />
    </S.EditFormWrapper>
  ) : (
    <S.EditFormContainer>
      <LabelBadge name={name} colorCode={colorCode} textColor={textColor} />
      <S.Description>{description}</S.Description>
      <S.IconContainer>
        <S.EditIcon onClick={handleClickEdit}>
          <Icon iconName={ICON_NAME.EDIT_ICON} />
          <span>편집</span>
        </S.EditIcon>
        <S.DeleteIcon onClick={handleClickDelete}>
          <Icon iconName={ICON_NAME.DELETE_ICON} />
          <span>삭제</span>
        </S.DeleteIcon>
      </S.IconContainer>
    </S.EditFormContainer>
  );
};

export default LabelItem;
